import { createContext, ReactNode, useEffect, useRef } from "react";
import useUserSocket from "../socket/useUserSocket";
import { useTCNotification } from "../socket/useTCNotification";
import { useChatSocket } from "../socket/useChatSocket";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  expiresInKey,
  loginKey,
  logoutKey,
  navigateToAfterLoggingOut,
  refreshExpiresInKey,
} from "../utilities/globals";
import { useNavigate } from "react-router-dom";
import { useLoadUserInfo, useLogout } from "../hooks/authHooks";
import {
  getCountMessageUnReadS,
  getUnreadNotificationsCounterS,
} from "../services/general/generalServices";

type UserType = ReturnType<typeof useUserSocket>;
type NotificationsType = ReturnType<typeof useTCNotification>;
type ChatType = ReturnType<typeof useChatSocket>;

type MainSocketsContextType = NotificationsType & ChatType & UserType;

export const MainSocketsContext = createContext<MainSocketsContextType>({
  notificationList: [],
  getMoreNotifications: async () => {},
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
  getNotification: () => {},
  connectChatSocket: () => {},
  disconnectChatSocket: () => {},
  connectSingleChatSocket: () => {},
  disconnectSingleChatSocket: () => {},
  disconnectNotificationSocket: () => {},
  connectUserSocket: () => {},
  disconnectUserSocket: () => {},
  connectNotificationSocket: () => {},
  connectGlobalNotificationSocket: () => {},
  disconnectGlobalNotificationSocket: () => {},
  hasMoreNotificationList: false,
  setTokenExpiration: () => {},
  setRefreshTokenExpiration: () => {},
  lastChatMessageReceived: null,
  chatMessageRead: { endMessageId: "" },
  newMessageAndChatData: null,
  globalNumUnreadMessages: 0,
  setGlobalNumUnreadMessages: () => {},
  newMessageAndChatDataFromSocket: null,
  currentChatUnreadMessages: { unreadMessages: 0 },
  newNotificationsExist: false,
  setNewNotificationsExist: () => {},
  globalNumUnreadNotifications: 0,
  setGlobalNumUnreadNotifications: () => {},
  refreshTokenAndHandleResult: async () => {},
} as MainSocketsContextType);

export function MainSocketsProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const loadUserInfo = useLoadUserInfo();
  const logout = useLogout();
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const uid = useSelector((state: MainState) => state.user.uid);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const lastSession = useSelector((state: MainState) => state.user.lastSession);
  const userData = useUserSocket();
  const notificationData = useTCNotification();
  const chatData = useChatSocket();
  const isLoggedInRef = useRef(isLoggedIn);

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      disconnectSockets();
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
    if (isLoggedIn) {
      userData.connectUserSocket();
      notificationData.connectNotificationSocket();
      notificationData.connectGlobalNotificationSocket();
      chatData.connectChatSocket();
      getUnreadChatMessagesCounter();
      getUnreadNotificationsCounter();
    } else {
      disconnectSockets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  async function handleStorageChange(event: StorageEvent) {
    if (
      isLoggedInRef.current &&
      event.key === logoutKey &&
      event.newValue &&
      event.oldValue !== event.newValue
    ) {
      await logout();
      navigate(navigateToAfterLoggingOut);
    }

    if (
      !isLoggedInRef.current &&
      event.key === loginKey &&
      event.newValue &&
      event.oldValue !== event.newValue
    ) {
      await loadUserInfo(false);
      localStorage.removeItem(loginKey);
    }
    // Eliminar tiempo de expiración de tokens
    if (
      event.key == expiresInKey &&
      event.oldValue !== null &&
      event.newValue === null
    )
      userData.setTokenExpiration(null);
    else if (
      event.key == refreshExpiresInKey &&
      event.oldValue !== null &&
      event.newValue === null
    )
      userData.setRefreshTokenExpiration(null);
  }

  function disconnectSockets() {
    userData.disconnectUserSocket();
    chatData.disconnectChatSocket();
    notificationData.disconnectNotificationSocket();
    notificationData.disconnectGlobalNotificationSocket();
  }

  async function getUnreadChatMessagesCounter() {
    const { totalUnread } = await getCountMessageUnReadS(uid);
    if (totalUnread) chatData.setGlobalNumUnreadMessages(totalUnread);
  }

  async function getUnreadNotificationsCounter() {
    const { totalUnread } = await getUnreadNotificationsCounterS({
      entityId: mainUid,
      receiverId: uid,
      lastSession,
    });
    if (totalUnread)
      notificationData.setGlobalNumUnreadNotifications(totalUnread);
  }

  return (
    <MainSocketsContext.Provider
      value={{ ...notificationData, ...chatData, ...userData }}
    >
      {children}
    </MainSocketsContext.Provider>
  );
}
