import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatMessage, ChatSocketData } from "../models/MainInterfaces";
import { ChatMessageType, RTNotificationType } from "../utilities/types";
import useShowNotification from "../hooks/utilHooks";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { chatDataFieldName } from "../utilities/globals";
import { ChatMessageRead, ChatSocketResponse } from "../models/Interfaces";

const chatMessages: ChatSocketData[] = [
  {
    userId: "ru1VLrbCKDR7BPQIGrk2",
    message:
      "¡Claro! Buenos días. Ofrecemos espacios de almacenamiento desde 10 hasta 200 metros cuadrados",
    timestamp: "2024-11-20T15:25:00.000Z",
    read: true,
    uid: "2",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-20T15:27:00.000Z",
    read: true,
    images: [
      "https://dummyimage.com/250/ff3fff/000000",
      "https://dummyimage.com/250/ff3ff1/000000",
      "https://dummyimage.com/250/af3ff1/000000",
    ],
    uid: "4",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
  {
    userId: "EOuyocZiTZVT91ZOo0rW",
    timestamp: "2024-11-20T15:29:00.000Z",
    read: false,
    documents: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    uid: "7",
    userName: "Soluciones Online",
    chatId: "RJ1xrrfe4x",
  },
];

let chatSocketAPI: Socket | null = null;
let singleChatSocketAPI: Socket | null = null;

export function useChatSocket() {
  const navigate = useNavigate();
  const { showRealTimeNotification } = useShowNotification();
  const [chatMessageRead, setChatMessageRead] = useState<ChatMessageRead>({
    messageId: "",
    read: false,
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
        chatSocketAPI?.emit("joinRoom", `TCNotifications`);
      });

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

      singleChatSocketAPI.on("updateChat", (payload: ChatSocketResponse) => {
        console.log("single chat recibido:", payload);
        if (payload.type == ChatMessageType.NEW_MESSAGE)
          setLastChatMessageReceived(payload.messageData as ChatMessage);
        else if (payload.type == ChatMessageType.READ) {
          setChatMessageRead(payload.messageData as ChatMessageRead);
        }
      });
    }
  }

  function redirectFromNotification(chatData: ChatSocketData) {
    navigate(pageRoutes.chat, { state: { [chatDataFieldName]: chatData } });
  }

  function disconnectChatSocket() {
    if (chatSocketAPI) {
      console.log("Disconnected chat");
      chatSocketAPI.removeAllListeners();
      chatSocketAPI.disconnect();
      chatSocketAPI = null;
    }
  }

  function disconnectSingleChatSocket() {
    if (singleChatSocketAPI) {
      console.log("Disconnected single chat");
      singleChatSocketAPI.removeAllListeners();
      singleChatSocketAPI.disconnect();
      singleChatSocketAPI = null;
    }
  }

  return {
    disconnectChatSocket,
    connectChatSocket,
    connectSingleChatSocket,
    disconnectSingleChatSocket,
    lastChatMessageReceived,
    chatMessageRead,
  };
}
