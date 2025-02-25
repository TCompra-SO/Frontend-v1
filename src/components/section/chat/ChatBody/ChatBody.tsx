import { useTranslation } from "react-i18next";
import { ChatListData, ChatMessage } from "../../../../models/MainInterfaces";
import InputContainer from "../../../containers/InputContainer";
import dayjs from "dayjs";
import { dateFormatChatBody, windowSize } from "../../../../utilities/globals";
import ChatBodyMessage from "./ChatBodyMessage";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import { AddImagesFieldRef } from "../../../common/formFields/AddImagesField";
import { AddDocumentFieldRef } from "../../../common/formFields/AddDocumentField";
import { Flex, Spin } from "antd";
import ChatGallery from "./ChatGallery";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { isSameDay } from "../../../../utilities/globalFunctions";

const loadingSpinner: ReactNode = (
  <Flex justify="center">
    <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
  </Flex>
);

interface ChatBodyProps {
  chatData: ChatListData;
  messages: ChatMessage[];
  onCloseChat: () => void;
  getMoreChatMessages: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function ChatBody(props: ChatBodyProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<AddImagesFieldRef>(null);
  const docRef = useRef<AddDocumentFieldRef>(null);
  // const [imgList, setImgList] = useState<UploadFile[]>([]);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [message, setMessage] = useState("");
  const [openGallery, setOpenGallery] = useState<boolean | null>(null);
  const prevChatMessagesLength = useRef(0);
  const [currentDate, setCurrentDate] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerDownRef = useRef<IntersectionObserver | null>(null);

  /** Mostrar fecha de mensaje superior en base a date dividers */

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    let prevScrollTop = chatContainer.scrollTop;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const scrollTop = chatContainer.scrollTop;
        const isScrollingDown = scrollTop > prevScrollTop;
        prevScrollTop = scrollTop;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timestamp = entry.target.getAttribute("data-timestamp");
            if (timestamp && !isScrollingDown) {
              const formattedDate = dayjs(timestamp).format(dateFormatChatBody);
              setCurrentDate(formattedDate);
            }
          }
        });
      },
      {
        root: chatContainer,
        threshold: 0.5,
      }
    );

    observerDownRef.current = new IntersectionObserver(
      (entries) => {
        const scrollTop = chatContainer.scrollTop;
        const isScrollingDown = scrollTop > prevScrollTop;
        entries.forEach((entry) => {
          const isIntersectingAtTop =
            entry.boundingClientRect.top <=
            entry.rootBounds!.top + entry.rootBounds!.height / 2;
          if (isIntersectingAtTop && isScrollingDown) {
            const date = entry.target.textContent;
            if (date) {
              setCurrentDate(date);
            }
          }
        });
      },
      {
        root: chatContainer,
        threshold: 0.9,
      }
    );

    const messages = chatContainer.querySelectorAll(".chat-body-message");
    messages.forEach((msg) => observerRef.current?.observe(msg));

    const dateDividers = chatContainer.querySelectorAll(
      ".fecha-comment-inline"
    );
    dateDividers.forEach((divider) => {
      if (observerDownRef.current) {
        observerDownRef.current.observe(divider);
      }
    });

    return () => {
      observerRef.current?.disconnect();
      observerDownRef.current?.disconnect();
    };
  }, [props.messages]);

  /** Scroll al mensaje más actual */

  useEffect(() => {
    if (props.messages.length > 0) {
      prevChatMessagesLength.current = props.messages.length;
      if (prevChatMessagesLength.current == 0) {
        console.log("jscrolling");
        scrollToBottom();
      }
    } else prevChatMessagesLength.current = 0;
  }, [props.messages]);

  function scrollToBottom() {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  /** Funciones */

  function sendMsg() {
    if (imgRef.current) imgRef.current.reset();
    if (docRef.current) docRef.current.reset();
    if (message.trim()) {
      console.log(message.trim());
      setMessage("");
    }
  }

  return (
    <div
      className="card-white mch-2 t-flex f-column gap-5"
      style={
        width <= windowSize.sm
          ? { display: "flex", position: "relative" }
          : { position: "relative" }
      }
    >
      <div className="chat-info t-flex gap-10 j-items">
        {props.chatData.userImage ? (
          <img src={props.chatData.userImage} className="img-chat-2" />
        ) : (
          <div className="inicial-chat">
            {props.chatData.userName.length > 0
              ? props.chatData.userName[0]
              : null}
          </div>
        )}
        {props.chatData.userOnline && <div className="chat-online-2"></div>}
        <div className="chat-iu">
          <div className="usuario-chat text-truncate">
            {props.chatData.userName}
          </div>
          <div className="requ-chat text-truncate">{props.chatData.title}</div>
        </div>
        <div className="chat-close" onClick={props.onCloseChat}>
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
      </div>
      <div className="t-flex f-column-reverse j-items conversacion">
        {props.loading && prevChatMessagesLength.current == 0 ? (
          loadingSpinner
        ) : (
          <>
            {currentDate && <div className="fecha-comment">{currentDate}</div>}

            <div
              className="t-flex f-column-reverse mensajes-contenedor"
              id="scrollableDivChatBodyList"
              ref={chatContainerRef}
            >
              <InfiniteScroll
                dataLength={props.messages.length}
                next={props.getMoreChatMessages}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                className="gap-5"
                hasMore={props.hasMore}
                loader={loadingSpinner}
                scrollableTarget="scrollableDivChatBodyList"
                inverse={true}
              >
                {props.messages.map((msg, index, array) => {
                  const messageNode = (
                    <ChatBodyMessage
                      message={msg}
                      userImage={props.chatData.userImage}
                      userName={props.chatData.userName}
                    />
                  );
                  const shouldInsertDivider =
                    (index < array.length - 1 &&
                      !isSameDay(msg.timestamp, array[index + 1].timestamp)) ||
                    index == array.length - 1;
                  return (
                    <Fragment key={msg.uid}>
                      {index == 0 && <div ref={divRef} />}
                      {messageNode}
                      {shouldInsertDivider && (
                        <div className="fecha-comment-inline">
                          {dayjs(msg.timestamp).format(dateFormatChatBody)}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>
      <div className="t-flex gap-10 j-items chat-buscar">
        {/* <i
          className="fa-regular fa-camera mensaje-send"
          onClick={() => setOpenGallery(true)}
        ></i>
        <i
          className="fa-regular fa-paperclip mensaje-send"
          onClick={() => setOpenGallery(false)}
        ></i> */}
        {/* <Badge count={imgList.length} size="small" color={primaryColor}>
          <AddImagesField
            ref={imgRef}
            onlyUpload={{
              child: <i className="fa-regular fa-camera mensaje-send"></i>,
              onChange: (files) => setImgList(files),
            }}
          />
        </Badge>
        <Badge count={fileList.length} size="small" color={primaryColor}>
          <AddDocumentField
            ref={docRef}
            onlyUpload={{
              child: <i className="fa-regular fa-paperclip mensaje-send"></i>,
              onChange: (files) => setFileList(files),
            }}
          />
        </Badge> */}
        <InputContainer
          type="text"
          className="form-transparent form-filter"
          placeholder={t("message")}
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
        <i
          className="fa-regular fa-paper-plane-top mensaje-send"
          onClick={sendMsg}
        ></i>
      </div>
      {openGallery !== null && (
        <ChatGallery
          forImages={openGallery}
          onClose={() => setOpenGallery(null)}
        />
      )}
    </div>
  );
}
