import dayjs from "dayjs";
import { hourFormatChatBody } from "../../../../utilities/globals";
import { openDocument } from "../../../../utilities/globalFunctions";
import { ChatMessage } from "../../../../models/MainInterfaces";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../../containers/ImagePreviewGroupContainer";
import { useRef } from "react";

interface ChatBodyMessageProps {
  message: ChatMessage;
  userImage?: string;
  userName?: string;
}

export default function ChatBodyMessage(props: ChatBodyMessageProps) {
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);

  function handleOpenPreview() {
    if (props.message.images && props.message.images.length > 0) {
      if (childRef.current) {
        childRef.current.openPreview();
      }
    }
  }

  return (
    <>
      <ImagePreviewGroupContainer ref={childRef} image={props.message.images} />
      <div
        className={`t-flex ${
          props.message.isInputMsg ? "txt-entrada" : "txt-salida"
        }`}
      >
        {props.message.isInputMsg ? (
          props.userImage ? (
            <img src={props.userImage} className="useri-chat" />
          ) : (
            <div className="inicial-chat-2">
              {props.userName && props.userName.length > 0
                ? props.userName[0]
                : null}
            </div>
          )
        ) : (
          !(props.message.images || props.message.documents) && (
            <div className="space-img"></div>
          )
        )}
        <div
          className={
            props.message.images
              ? `t-flex gap-5 ${
                  props.message.isInputMsg
                    ? "mensaje-entrada-img"
                    : "mensaje-salida-img"
                }`
              : props.message.documents
              ? props.message.isInputMsg
                ? "mensaje-entrada-doc text-right"
                : "mensaje-salida-doc text-right"
              : props.message.isInputMsg
              ? "mensaje-entrada"
              : "mensaje-salida"
          }
        >
          {props.message.images ? (
            props.message.images.map((img) => (
              <img
                src={img}
                alt=""
                className="image-send"
                key={img}
                onClick={handleOpenPreview}
                style={{ cursor: "pointer" }}
              />
            ))
          ) : props.message.documents ? (
            props.message.documents.map((doc) => (
              <div
                className="file-min-2 gap-5"
                onClick={() => openDocument(doc)}
                style={{ cursor: "pointer" }}
                key={doc}
              >
                <i className="fa-regular fa-file-doc"></i>
                <div
                  className="text-truncate"
                  style={{ fontSize: "14px", width: "200px" }}
                >
                  aaaaaaaaaaaaa ghjgjhggj ghghjg jjhg.pdf
                </div>
              </div>
            ))
          ) : (
            <div>{props.message.message}</div>
          )}
          <span
            className={
              props.message.images ? "mensaje-hora-img" : "mensaje-hora"
            }
          >
            {dayjs(props.message.time).format(hourFormatChatBody)}{" "}
            <i
              className={`fa-solid ${
                props.message.read ? "fa-check-double" : "fa-check"
              }`}
            ></i>
          </span>
        </div>
        {props.message.isInputMsg &&
          !(props.message.images || props.message.documents) && (
            <div className="space-img"></div>
          )}
      </div>
    </>
  );
}
