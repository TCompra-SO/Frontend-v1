import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ChatListData,
  ChatMessage,
  ChatSocketData,
} from "../models/MainInterfaces";
import { ChatMessageType, RTNotificationType } from "../utilities/types";
import useShowNotification from "../hooks/utilHooks";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { chatDataFieldName } from "../utilities/globals";
import {
  ChatMessageRead,
  GeneralChatSocketResponse,
  SingleChatSocketResponse,
} from "../models/Interfaces";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";

let chatSocketAPI: Socket | null = null;
let singleChatSocketAPI: Socket | null = null;

export function useChatSocket() {
  const navigate = useNavigate();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { showRealTimeNotification } = useShowNotification();
  const [newMessageAndChatData, setNewMessageAndChatData] = useState<{
    chatMessage: ChatMessage;
    chatListData: ChatListData;
  } | null>(null);
  const [chatMessageRead, setChatMessageRead] = useState<ChatMessageRead>({
    endMessageId: "",
  });
  const [lastChatMessageReceived, setLastChatMessageReceived] =
    useState<ChatMessage | null>(null);

  useEffect(() => {
    return () => {
      disconnectChatSocket();
      disconnectSingleChatSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            console.log("updateGeneralChat:", payload);
            if (payload.type == ChatMessageType.NEW_MESSAGE) {
              setNewMessageAndChatData({
                chatListData: payload.chatData.data,
                chatMessage: payload.messageData,
              });
            }
          } catch (e) {
            console.log(e);
          }
        }
      );

      // setTimeout(() => {
      //   showRealTimeNotification({
      //     type: RTNotificationType.CHAT,
      //     content: chatMessages[0],
      //     onClickCallback: redirectFromNotification,
      //   });
      // }, 3000);
      // setTimeout(() => {
      //   showRealTimeNotification({
      //     type: RTNotificationType.CHAT,
      //     content: chatMessages[1],
      //     onClickCallback: redirectFromNotification,
      //   });
      // }, 6000);
      // setTimeout(() => {
      //   showRealTimeNotification({
      //     type: RTNotificationType.CHAT,
      //     content: chatMessages[2],
      //     onClickCallback: redirectFromNotification,
      //   });
      // }, 9000);
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
            )
              setLastChatMessageReceived(payload.messageData);
            else if (
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

  function redirectFromNotification(chatData: ChatSocketData) {
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
  };
}
