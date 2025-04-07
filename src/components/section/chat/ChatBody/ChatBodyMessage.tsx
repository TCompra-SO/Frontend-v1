import dayjs from "dayjs";
import { hourFormatChatBody } from "../../../../utilities/globals";
import { openDocument } from "../../../../utilities/globalFunctions";
import { ChatMessage } from "../../../../models/MainInterfaces";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../../containers/ImagePreviewGroupContainer";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

interface ChatBodyMessageProps {
  message: ChatMessage;
  userImage?: string;
  userName?: string;
}

export default function ChatBodyMessage(props: ChatBodyMessageProps) {
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  const uid = useSelector((state: MainState) => state.user.uid);
  const isInputMsg = uid != props.message.userId;
  const [emptyImages, setEmptyImages] = useState(true);
  const [emptyDocs, setEmptyDocs] = useState(true);

  useEffect(() => {
    setEmptyImages(
      !props.message.images ||
        (props.message.images && !props.message.images.length)
    );
    setEmptyDocs(
      !props.message.documents ||
        (props.message.documents && !props.message.documents.length)
    );
  }, [props.message]);

  function handleOpenPreview() {
    if (!emptyImages) {
      if (childRef.current) {
        childRef.current.openPreview();
      }
    }
  }

  return (
    <>
      <ImagePreviewGroupContainer ref={childRef} image={props.message.images} />
      <div
        className={`t-flex chat-body-message ${
          isInputMsg ? "txt-entrada" : "txt-salida"
        }`}
        data-timestamp={props.message.timestamp}
      >
        {isInputMsg ? (
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
          emptyImages && emptyDocs && <div className="space-img"></div>
        )}
        <div
          className={
            !emptyImages
              ? `t-flex gap-5 ${
                  isInputMsg ? "mensaje-entrada-img" : "mensaje-salida-img"
                }`
              : !emptyDocs
              ? isInputMsg
                ? "mensaje-entrada-doc text-right"
                : "mensaje-salida-doc text-right"
              : isInputMsg
              ? "mensaje-entrada"
              : "mensaje-salida"
          }
        >
          {!emptyImages && props.message.images ? (
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
          ) : props.message.documents && !emptyDocs ? (
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
          <span className={!emptyImages ? "mensaje-hora-img" : "mensaje-hora"}>
            {dayjs(props.message.timestamp).format(hourFormatChatBody)}{" "}
            <i
              className={`${
                props.message.error
                  ? "fa-regular fa-circle-exclamation"
                  : props.message.read
                  ? "fa-solid fa-check-double"
                  : "fa-solid fa-check"
              }`}
            ></i>
          </span>
        </div>
        {isInputMsg && emptyImages && emptyDocs && (
          <div className="space-img"></div>
        )}
      </div>
    </>
  );
}
