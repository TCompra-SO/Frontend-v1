import { createContext, ReactNode, useEffect } from "react";
import useUserSocket from "../socket/useUserSocket";
import { useTCNotification } from "../socket/useTCNotification";
import { useChatSocket } from "../socket/useChatSocket";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";

type UserType = ReturnType<typeof useUserSocket>;
type NotificationsType = ReturnType<typeof useTCNotification>;
type ChatType = ReturnType<typeof useChatSocket>;

type MainSocketsContextType = NotificationsType & ChatType & UserType;

export const MainSocketsContext = createContext<MainSocketsContextType>({
  notificationList: [],
  getMoreNotifications: () => {},
  resetNotificationList: () => {},
  notificationLoading: false,
  redirectFromNotification: () => {},
  chatList: [],
  getMoreChats: () => {},
  chatMessageList: [],
  getMoreChatMessages: () => {},
  resetChatMessageList: () => {},
  hasMoreChatList: false,
  hasMoreChatMessageList: false,
  loadingChatList: false,
  loadingChatMessages: false,
  sendNotification: () => {},
  disconnectChatSocket: () => {},
  disconnectNotificationSocket: () => {},
  connectUserSocket: () => {},
  disconnectUserSocket: () => {},
  connectNotificationSocket: () => {},
  connectChatSocket: () => {},
} as MainSocketsContextType);

export function MainSocketsProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const userData = useUserSocket();
  const notificationData = useTCNotification();
  const chatData = useChatSocket();

  useEffect(() => {
    return () => {
      disconnectSockets();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      userData.connectUserSocket();
      notificationData.connectNotificationSocket();
      chatData.connectChatSocket();
    } else disconnectSockets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function disconnectSockets() {
    userData.disconnectUserSocket();
    chatData.disconnectChatSocket();
    notificationData.disconnectNotificationSocket();
  }

  return (
    <MainSocketsContext.Provider
      value={{ ...notificationData, ...chatData, ...userData }}
    >
      {children}
    </MainSocketsContext.Provider>
  );
}
