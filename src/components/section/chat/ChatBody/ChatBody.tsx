import { useTranslation } from "react-i18next";
import { ChatListData, ChatMessage } from "../../../../models/MainInterfaces";
import InputContainer from "../../../containers/InputContainer";
import dayjs from "dayjs";
import { dateFormatChatBody, windowSize } from "../../../../utilities/globals";
import ChatBodyMessage from "./ChatBodyMessage";
import { useEffect, useRef } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import AddImagesField from "../../../common/formFields/AddImagesField";

interface ChatBodyProps {
  chatData: ChatListData;
  messages: ChatMessage[];
  onCloseChat: () => void;
}

export default function ChatBody(props: ChatBodyProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [props.chatData]);

  function scrollToBottom() {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="card-white mch-2 t-flex f-column gap-5"
      style={width <= windowSize.sm ? { display: "flex" } : {}}
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
      <div className="t-flex f-column j-items conversacion">
        <div className="fecha-comment">
          {dayjs(props.chatData.lastDate).format(dateFormatChatBody)}
        </div>
        {/* r3v fecha de los mensajes visibles*/}
        <div className="t-flex f-column gap-5 mensajes-contenedor">
          {props.messages.map((msg) => (
            <ChatBodyMessage
              key={msg.uid}
              message={msg}
              userImage={props.chatData.userImage}
              userName={props.chatData.userName}
            />
          ))}
          <div ref={divRef} />
        </div>
      </div>
      <div className="t-flex gap-10 j-items chat-buscar">
        <AddImagesField
          onlyUpload={{
            child: <i className="fa-regular fa-camera mensaje-send"></i>,
          }}
        />
        <InputContainer
          type="text"
          className="form-transparent form-filter"
          placeholder={t("message")}
        />
        <i className="fa-regular fa-paper-plane-top mensaje-send"></i>
      </div>
    </div>
  );
}
