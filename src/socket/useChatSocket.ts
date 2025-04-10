import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ChatListData,
  ChatMessage,
  SocketChatMessage,
} from "../models/MainInterfaces";
import { ChatMessageType, RTNotificationType } from "../utilities/types";
import useShowNotification from "../hooks/utilHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { chatDataFieldName } from "../utilities/globals";
import {
  ChatMessageRead,
  GeneralChatSocketResponse,
  SingleChatSocketResponse,
} from "../models/Interfaces";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { transformToChatListData } from "../utilities/transform";
import { getSectionFromRoute } from "../utilities/globalFunctions";

let chatSocketAPI: Socket | null = null;
let singleChatSocketAPI: Socket | null = null;

export function useChatSocket() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = getSectionFromRoute(location.pathname);
  const currentSectionRef = useRef(currentSection);
  const uid = useSelector((state: MainState) => state.user.uid);
  const { showRealTimeNotification } = useShowNotification();
  const [globalNumUnreadMessages, setGlobalNumUnreadMessages] = useState(0);
  const [newMessageAndChatData, setNewMessageAndChatData] = useState<{
    chatMessage: ChatMessage;
    chatListData: ChatListData;
  } | null>(null);
  const [chatMessageRead, setChatMessageRead] = useState<ChatMessageRead>({
    endMessageId: "",
  });
  const [lastChatMessageReceived, setLastChatMessageReceived] =
    useState<ChatMessage | null>(null);

  /** Desconectar sockets al destruir */

  useEffect(() => {
    return () => {
      disconnectChatSocket();
      disconnectSingleChatSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Actualizar sección actual */

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  /** Funciones */

  function connectChatSocket() {
    if (!chatSocketAPI) {
      chatSocketAPI = io(import.meta.env.VITE_CHAT_SOCKET_URL);

      chatSocketAPI.on("connect", () => {
        console.log("Connected chat");
        chatSocketAPI?.emit("joinRoom", `roomGeneralChat${uid}`);
      });

      chatSocketAPI.on("joinedRoom", (message) => {
        console.log(message);
      });

      chatSocketAPI.on(
        "updateGeneralChat",
        (payload: GeneralChatSocketResponse) => {
          try {
            if (
              payload.type == ChatMessageType.NEW_MESSAGE &&
              payload.chatData.length
            ) {
              if (currentSectionRef.current === pageRoutes.chat) {
                console.log(">>>>>");
                setNewMessageAndChatData({
                  chatListData: transformToChatListData(payload.chatData[0]),
                  chatMessage: payload.messageData,
                });
              } else {
                showRealTimeNotification({
                  type: RTNotificationType.CHAT,
                  content: {
                    userName: payload.chatData[0].userName,
                    userImage: payload.chatData[0].userImage,
                    ...payload.messageData,
                  },
                  onClickCallback: redirectFromNotification,
                });
              }
            } else if (payload.type == ChatMessageType.READ) {
              if (payload.numUnreadMessages > 0)
                setGlobalNumUnreadMessages(payload.numUnreadMessages);
            }
          } catch (e) {
            console.log(e);
          }
        }
      );
    }
  }

  function connectSingleChatSocket(chatId: string) {
    if (!singleChatSocketAPI) {
      singleChatSocketAPI = io(import.meta.env.VITE_CHAT_SOCKET_URL);

      singleChatSocketAPI.on("connect", () => {
        console.log("Connected single chat", chatId);
        singleChatSocketAPI?.emit("joinRoom", `roomChat${chatId}`);
      });

      singleChatSocketAPI.on("joinedRoom", (message) => {
        console.log(message);
      });

      singleChatSocketAPI.on(
        "updateChat",
        (payload: SingleChatSocketResponse) => {
          try {
            console.log("single chat recibido:", payload);
            if (
              payload.type == ChatMessageType.NEW_MESSAGE &&
              payload.messageData.userId != uid
            ) {
              setLastChatMessageReceived(payload.messageData);
            } else if (
              payload.type == ChatMessageType.READ &&
              payload.res?.endMessageId
            ) {
              setChatMessageRead(payload.res);
            }
          } catch (e) {
            console.log(e);
          }
        }
      );
    }
  }

  function redirectFromNotification(chatData: SocketChatMessage) {
    navigate(pageRoutes.chat, { state: { [chatDataFieldName]: chatData } });
  }

  function disconnectChatSocket() {
    cleanDataInChatSocket();
    if (chatSocketAPI) {
      console.log("Disconnected chat");
      chatSocketAPI.removeAllListeners();
      chatSocketAPI.disconnect();
      chatSocketAPI = null;
    }
  }

  function disconnectSingleChatSocket() {
    cleanDataInChatSocket();
    if (singleChatSocketAPI) {
      console.log("Disconnected single chat");
      singleChatSocketAPI.removeAllListeners();
      singleChatSocketAPI.disconnect();
      singleChatSocketAPI = null;
    }
  }

  function cleanDataInChatSocket() {
    setChatMessageRead({ endMessageId: "" });
    setLastChatMessageReceived(null);
  }

  return {
    disconnectChatSocket,
    connectChatSocket,
    connectSingleChatSocket,
    disconnectSingleChatSocket,
    lastChatMessageReceived,
    chatMessageRead,
    newMessageAndChatData,
    globalNumUnreadMessages,
  };
}
