import { useTranslation } from "react-i18next";
import {
  BasicChatListData,
  ChatMessage,
} from "../../../../models/MainInterfaces";
import InputContainer from "../../../containers/InputContainer";
import dayjs from "dayjs";
import {
  checkToMarkMsgAsReadWhileScrolling,
  dateFormatChatBody,
  randomShortKeyLength,
  windowSize,
} from "../../../../utilities/globals";
import ChatBodyMessage from "./ChatBodyMessage";
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import { AddImagesFieldRef } from "../../../common/formFields/AddImagesField";
import { AddDocumentFieldRef } from "../../../common/formFields/AddDocumentField";
import { Flex, Spin } from "antd";
import ChatGallery from "./ChatGallery";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import {
  generateShortId,
  isSameDay,
} from "../../../../utilities/globalFunctions";
import { useChatFunctions } from "../../../../hooks/chatHooks";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { transformToChatMessage } from "../../../../utilities/transform";
import { debounce } from "lodash";
import { useGetBannedWords } from "../../../../hooks/utilHooks";

const loadingSpinner: ReactNode = (
  <Flex justify="center">
    <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
  </Flex>
);

interface ChatBodyProps {
  chatData: BasicChatListData;
  messages: ChatMessage[];
  onCloseChat: () => void;
  getMoreChatMessages: (chatId: string) => void;
  hasMore: boolean;
  loading: boolean | undefined;
  addMessageToChatMessageList: (message: ChatMessage) => void;
  updateMsg: (uid: string, message: ChatMessage) => void;
  markMsgAsError: (messageId: string) => void;
}

export default function ChatBody(props: ChatBodyProps) {
  const { censorText } = useGetBannedWords();
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { createChatAndSendMessage, sendMessage, markAsRead } =
    useChatFunctions(false);
  const uid = useSelector((state: MainState) => state.user.uid);
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<AddImagesFieldRef>(null);
  const docRef = useRef<AddDocumentFieldRef>(null);
  // const [imgList, setImgList] = useState<UploadFile[]>([]);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [message, setMessage] = useState("");
  const [openGallery, setOpenGallery] = useState<boolean | null>(null);
  const prevChatMessagesLength = useRef(0);
  const [currentDate, setCurrentDate] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerDownRef = useRef<IntersectionObserver | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const firstMessageRef = useRef<HTMLDivElement | null>(null);
  const [showDivider, setShowDivider] = useState(false);
  const [locked, setLocked] = useState(false);

  /** Para mostrar o no date divider on top */

  const checkVisibilityOfLastMessage = useCallback(() => {
    if (!chatContainerRef.current || !lastMessageRef.current) return;

    const chatRect = chatContainerRef.current.getBoundingClientRect();
    const lastRect = lastMessageRef.current.getBoundingClientRect();

    const fullyVisible =
      lastRect.top >= chatRect.top && lastRect.bottom <= chatRect.bottom;

    setShowDivider(!fullyVisible);
    if (!fullyVisible) {
      setLocked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  /** Verificar si el primer mensaje es parcialmente visible */

  const checkVisibilityOfFirsttMessage = useCallback(
    (chatId: string, messageId: string, messagesLength: number) => {
      const msgRef =
        firstMessageRef.current ?? messagesLength == 1
          ? lastMessageRef.current
          : null;
      if (!chatContainerRef.current || !msgRef) return;

      const chatRect = chatContainerRef.current.getBoundingClientRect();
      const firstRect = msgRef.getBoundingClientRect();

      const visibleTop = Math.max(firstRect.top, chatRect.top);
      const visibleBottom = Math.min(firstRect.bottom, chatRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const elementHeight = firstRect.height;

      const atLeastHalfVisible = visibleHeight >= elementHeight / 2;
      console.log(atLeastHalfVisible, messageId);
      if (atLeastHalfVisible)
        markAsRead({
          messagesIds: [messageId],
          chatId,
          userId: props.chatData.userId,
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (props.chatData.uid) setLocked(false);
  }, [props.chatData]);

  /** Cuando la lista de mensajes cambia... */

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // Cargar más elementos en infinite scroller si no hay scroll y
    if (
      props.messages.length &&
      props.hasMore &&
      props.chatData.uid &&
      chatContainerRef.current &&
      chatContainerRef.current.scrollHeight <=
        chatContainerRef.current.clientHeight
    )
      props.getMoreChatMessages(props.chatData.uid);

    // Mostrar fecha de mensaje superior en base a date dividers
    insertDatedividers();
    checkVisibilityOfLastMessage();

    // Marcar mensajes como leído
    if (
      props.messages.length &&
      !props.messages[0].read &&
      props.messages[0].userId !== uid
      //&& props.messages[0].uid.length > 8
    ) {
      // markAsRead({
      //   messagesIds: [props.messages[0].uid],
      //   chatId: props.messages[0].chatId,
      //   userId: uid,
      // });
      checkVisibilityOfFirsttMessage(
        props.messages[0].chatId,
        props.messages[0].uid,
        props.messages.length
      );
    }

    // Scroll to bottom cuando usuario envia muevo mensaje.
    if (
      props.messages.length &&
      props.messages[0].uid.length <= randomShortKeyLength
    )
      scrollToBottom();

    // Marcar mensajes como leídos al scrollear
    const handleScroll = () => {
      checkLastVisibleMessage();
    };

    const debounceScroll = debounce(
      handleScroll,
      checkToMarkMsgAsReadWhileScrolling
    );

    chatContainer.addEventListener("scroll", debounceScroll);

    return () => {
      observerRef.current?.disconnect();
      observerDownRef.current?.disconnect();
      chatContainer.removeEventListener("scroll", debounceScroll);
      debounceScroll.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages]);

  /** Scroll al mensaje más actual */

  useEffect(() => {
    if (props.messages.length > 0) {
      prevChatMessagesLength.current = props.messages.length;
      if (prevChatMessagesLength.current == 0) {
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

  function insertDatedividers() {
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
  }

  async function sendMsg() {
    if (imgRef.current) imgRef.current.reset();
    if (docRef.current) docRef.current.reset();
    const msg = censorText(message.trim());
    if (msg) {
      setMessage("");
      const msgUid = generateShortId();
      const chatMsg: ChatMessage = {
        chatId: props.chatData.uid ?? "",
        uid: msgUid, // id temporal
        userId: uid,
        timestamp: dayjs(new Date()).toISOString(),
        read: false,
        message: msg,
        waiting: true,
      };
      props.addMessageToChatMessageList(chatMsg);
      if (!props.chatData.uid) {
        // Crear chat primero
        const chatResult = await createChatAndSendMessage(
          {
            userId: uid,
            requerimentId: props.chatData.requirementId,
            title: props.chatData.title,
            type: props.chatData.type,
            recUserId: props.chatData.userId,
          },
          msg
        );
        if (chatResult?.error) {
          props.markMsgAsError(msgUid);
        }
      } else {
        const { messageData, error } = await sendMessage({
          chatId: props.chatData.uid,
          userId: uid,
          message: msg,
        });
        if (messageData) {
          const createdMsg = transformToChatMessage(messageData);
          props.updateMsg(msgUid, createdMsg);
        } else if (error) {
          props.markMsgAsError(msgUid);
        }
      }
    }
  }

  function checkLastVisibleMessage() {
    const container = chatContainerRef.current;
    if (!container || !props.chatData.uid) return;
    const rect = container.getBoundingClientRect();

    const el = document.elementFromPoint(rect.left + 10, rect.bottom - 5);

    if (el) {
      const messageEl = el.closest("[data-message-id]");
      if (messageEl) {
        const messageId = messageEl.getAttribute("data-message-id");
        if (messageId) {
          const ind = props.messages.findIndex((msg) => msg.uid == messageId);
          if (
            ind != -1 &&
            !props.messages[ind].read &&
            props.messages[ind].userId !== uid
          )
            markAsRead({
              messagesIds: [messageId],
              chatId: props.chatData.uid,
              userId: props.chatData.userId,
            });
        }
      }
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
            {props.chatData.userName && props.chatData.userName.length > 0
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
            {showDivider && currentDate && (
              <div className="fecha-comment" style={{ marginRight: "6px" }}>
                {currentDate}
              </div>
            )}

            <div
              className="t-flex f-column-reverse mensajes-contenedor"
              id="scrollableDivChatBodyList"
              ref={chatContainerRef}
              style={{ width: "100%" }}
            >
              <InfiniteScroll
                dataLength={props.messages.length}
                next={() => {
                  if (props.chatData.uid)
                    props.getMoreChatMessages(props.chatData.uid);
                }}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                className="gap-5"
                hasMore={props.hasMore}
                loader={loadingSpinner}
                scrollableTarget="scrollableDivChatBodyList"
                inverse={true}
              >
                <>
                  {props.messages.map((msg, index, array) => {
                    const isLast = index === array.length - 1;
                    const messageNode = (
                      <ChatBodyMessage
                        message={{
                          isChatMessage: true,
                          data: msg,
                        }}
                        userImage={props.chatData.userImage}
                        userName={props.chatData.userName}
                      />
                    );
                    const shouldInsertDivider =
                      (index < array.length - 1 &&
                        !isSameDay(
                          msg.timestamp,
                          array[index + 1].timestamp
                        )) ||
                      index == array.length - 1;
                    return (
                      <Fragment key={msg.uid}>
                        {index == 0 && <div ref={divRef} />}
                        {isLast ? (
                          <div ref={lastMessageRef}>{messageNode}</div>
                        ) : index == 0 ? (
                          <div ref={firstMessageRef}>{messageNode}</div>
                        ) : (
                          messageNode
                        )}
                        {shouldInsertDivider && (
                          <div className="fecha-comment-inline">
                            {dayjs(msg.timestamp).format(dateFormatChatBody)}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </>
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
          onPressEnter={sendMsg}
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
