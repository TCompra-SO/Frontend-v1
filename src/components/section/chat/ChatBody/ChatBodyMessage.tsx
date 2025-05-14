import dayjs from "dayjs";
import { hourFormatChatBody } from "../../../../utilities/globals";
import { openDocument } from "../../../../utilities/globalFunctions";
import {
  BasicChatMessage,
  ChatMessage,
} from "../../../../models/MainInterfaces";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../../containers/ImagePreviewGroupContainer";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";

interface ChatBodyMessageProps {
  message:
    | {
        isChatMessage: true;
        data: ChatMessage;
      }
    | {
        isChatMessage: false;
        data: BasicChatMessage;
      };
  userImage?: string;
  userName?: string;
}

export default function ChatBodyMessage(props: ChatBodyMessageProps) {
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  const uid = useSelector((state: MainState) => state.user.uid);
  const isInputMsg = uid != props.message.data.userId;
  const [emptyImages, setEmptyImages] = useState(true);
  const [emptyDocs, setEmptyDocs] = useState(true);

  useEffect(() => {
    if (props.message.isChatMessage) {
      setEmptyImages(
        !props.message.data.images ||
          (props.message.data.images && !props.message.data.images.length)
      );
      setEmptyDocs(
        !props.message.data.documents ||
          (props.message.data.documents && !props.message.data.documents.length)
      );
    }
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
      {props.message.isChatMessage && (
        <ImagePreviewGroupContainer
          ref={childRef}
          image={props.message.data.images}
        />
      )}
      <div
        className={`t-flex chat-body-message ${
          isInputMsg ? "txt-entrada" : "txt-salida"
        }`}
        data-timestamp={
          props.message.isChatMessage ? props.message.data.timestamp : ""
        }
        data-message-id={props.message.data.uid}
      >
        {props.message.isChatMessage ? (
          isInputMsg ? (
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
          )
        ) : null}
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
          style={!props.message.isChatMessage ? { marginLeft: 0 } : undefined}
        >
          {props.message.isChatMessage ? (
            !emptyImages && props.message.data.images ? (
              props.message.data.images.map((img) => (
                <img
                  src={img}
                  alt=""
                  className="image-send"
                  key={img}
                  onClick={handleOpenPreview}
                  style={{ cursor: "pointer" }}
                />
              ))
            ) : props.message.data.documents && !emptyDocs ? (
              props.message.data.documents.map((doc) => (
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
              <div>{props.message.data.message}</div>
            )
          ) : (
            <div>{props.message.data.message}</div>
          )}
          {props.message.isChatMessage ? (
            <span
              className={!emptyImages ? "mensaje-hora-img" : "mensaje-hora"}
            >
              {dayjs(props.message.data.timestamp).format(hourFormatChatBody)}{" "}
              <i
                className={`${
                  props.message.data.error
                    ? "fa-regular fa-circle-exclamation"
                    : props.message.data.waiting
                    ? "fa-regular fa-clock"
                    : !isInputMsg //
                    ? props.message.data.read
                      ? "fa-solid fa-check-double"
                      : "fa-solid fa-check"
                    : null //
                }`}
              ></i>
            </span>
          ) : (
            <span
              className={!emptyImages ? "mensaje-hora-img" : "mensaje-hora"}
            >
              <i
                className={`${
                  props.message.data.error
                    ? "fa-regular fa-circle-exclamation"
                    : props.message.data.waiting
                    ? "fa-regular fa-clock"
                    : null
                }`}
              ></i>
            </span>
          )}
        </div>
        {props.message.isChatMessage &&
          isInputMsg &&
          emptyImages &&
          emptyDocs && <div className="space-img"></div>}
      </div>
    </>
  );
}
