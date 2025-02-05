import { useTranslation } from "react-i18next";
import { ChatListData, ChatMessage } from "../../../../models/MainInterfaces";
import InputContainer from "../../../containers/InputContainer";
import dayjs from "dayjs";
import { dateFormatChatBody, windowSize } from "../../../../utilities/globals";
import ChatBodyMessage from "./ChatBodyMessage";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import AddImagesField, {
  AddImagesFieldRef,
} from "../../../common/formFields/AddImagesField";
import AddDocumentField, {
  AddDocumentFieldRef,
} from "../../../common/formFields/AddDocumentField";
import { Badge, UploadFile } from "antd";
import { primaryColor } from "../../../../utilities/colors";

interface ChatBodyProps {
  chatData: ChatListData;
  messages: ChatMessage[];
  onCloseChat: () => void;
}

export default function ChatBody(props: ChatBodyProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<AddImagesFieldRef>(null);
  const docRef = useRef<AddDocumentFieldRef>(null);
  const [imgList, setImgList] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    scrollToBottom();
  }, [props.chatData]);

  function scrollToBottom() {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

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
        <Badge count={imgList.length} size="small" color={primaryColor}>
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
        </Badge>
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
      <div className="galeria-upload">
        <div className="content-galeria gap-20">
          <div className="text-truncate name-documento">
            Nombre-del-documento.pdf
          </div>
          <div className="archivo-preview">
            {/* <img
              src={defaultRequirementImage}
              alt=""
              className="imagen-preview"
            /> */}
            <i className="fa-regular fa-file-doc fa-8x c-default"></i>
          </div>
          <div className="t-flex galeria-min m-0">
            <div>
              <img src="img/back-01.jpg" className="img-min" />
              <i className="fa-solid fa-circle-xmark img-trash"></i>
            </div>
            <div>
              <img src="img/back-02.jpg" className="img-min" />
              <i className="fa-solid fa-circle-xmark img-trash"></i>
            </div>
            <div>
              <img src="img/back-03.jpg" className="img-min" />
              <i className="fa-solid fa-circle-xmark img-trash"></i>
            </div>
            <div>
              <img src="img/back-04.jpg" className="img-min" />
              <i className="fa-solid fa-circle-xmark img-trash"></i>
            </div>
          </div>
          <div className="t-flex gap-10">
            <button className="btn btn-pm btn-white">Cancelar</button>
            <button className="btn btn-pm btn-default">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
