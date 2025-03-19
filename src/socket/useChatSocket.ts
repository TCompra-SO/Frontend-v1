import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ChatSocketData } from "../models/MainInterfaces";
import { RTNotificationType } from "../utilities/types";
import useShowNotification from "../hooks/utilHooks";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { chatDataFieldName } from "../utilities/globals";

let chatSocketAPI: Socket | null = null;

export function useChatSocket() {
  const navigate = useNavigate();
  const { showRealTimeNotification } = useShowNotification();

  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function connect() {
    if (!chatSocketAPI) {
      chatSocketAPI = io(import.meta.env.VITE_CHAT_SOCKET_URL);

      chatSocketAPI.on("connect", () => {
        console.log("Connected chat");
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

  function redirectFromNotification(chatData: ChatSocketData) {
    navigate(pageRoutes.chat, { state: { [chatDataFieldName]: chatData } });
  }

  function disconnect() {
    if (chatSocketAPI) {
      console.log("Disconnected chat");
      chatSocketAPI.removeAllListeners();
      chatSocketAPI.disconnect();
      chatSocketAPI = null;
    }
  }

  return { disconnectChatSocket: disconnect, connectChatSocket: connect };
}
