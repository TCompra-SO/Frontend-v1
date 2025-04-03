import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/utils/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody/ChatBody";
import {
  BasicChatListData,
  ChatListData,
  ChatSocketData,
} from "../models/MainInterfaces";
import { useContext, useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import {
  basicChatDataFieldName,
  chatDataFieldName,
  windowSize,
} from "../utilities/globals";
import { useLocation, useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { MainSocketsContext } from "../contexts/MainSocketsContext";
import { useCreateChatAndSendMessage } from "../hooks/chatHooks";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";

export default function Chat() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { width } = useWindowSize();
  const {
    chatList,
    getMoreChats,
    chatMessageList,
    getMoreChatMessages,
    resetChatMessageList,
    resetChatList,
    hasMoreChatList,
    hasMoreChatMessageList,
    loadingChatList,
    loadingChatMessages,
    addMessageToChatMessageList,
    markMsgAsRead,
    isChatListReset,
    setIsChatListReset,
  } = useChat();
  const { markAsRead } = useCreateChatAndSendMessage(false);
  const {
    connectSingleChatSocket,
    disconnectSingleChatSocket,
    lastChatMessageReceived,
    chatMessageRead,
  } = useContext(MainSocketsContext);
  const hasHandledChatNotification = useRef(false);
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatListData | null>(null);
  const [showArchivedChats, setShowArchivedChats] = useState(true);
  const [basicChatDataFromRouting] = useState<BasicChatListData | undefined>(
    location.state?.[basicChatDataFieldName]
  );

  /** Obtener lista inicial de chats */

  // useEffect(() => {
  //   getMoreChats(true);
  //   return () => {
  //     disconnectSingleChatSocket();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    handleCloseChat();
    resetChatList();
    return () => {
      disconnectSingleChatSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArchivedChats]);

  /**  */

  useEffect(() => {
    if (isChatListReset) {
      getMoreChats(showArchivedChats);
      setIsChatListReset(false);
    }
  }, [isChatListReset]);

  /** Abrir chat desde redireccionamiento */

  useEffect(() => {
    if (basicChatDataFromRouting) {
      setIsChatOpened(true);
      navigate(".", { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicChatDataFromRouting]);

  /** Abrir chat desde notificación */

  useEffect(() => {
    const chatDataFromNotification: ChatSocketData =
      location.state?.[chatDataFieldName];
    hasHandledChatNotification.current = false;

    if (chatDataFromNotification && !hasHandledChatNotification.current) {
      console.log(chatDataFromNotification);
      navigate(".", { replace: true, state: null });
      const chatToOpen = chatList.find(
        (chat) => chat.uid === chatDataFromNotification.chatId
      );
      if (chatToOpen) {
        handleClickOnChatItem(chatToOpen);
        hasHandledChatNotification.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, chatList]);

  /** Obtener lista inicial de mensajes de chat */

  useEffect(() => {
    if (isChatOpened && currentChat) {
      getMoreChatMessages(currentChat.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpened, currentChat]);

  /** Agregar mensaje recibido de socket a lista de mensajes */

  useEffect(() => {
    if (lastChatMessageReceived)
      addMessageToChatMessageList(lastChatMessageReceived);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastChatMessageReceived]);

  /** Al abrir chat, marcar como leído */

  useEffect(() => {
    if (
      !markedAsRead &&
      chatMessageList.length &&
      !chatMessageList[0].read &&
      chatMessageList[0].userId !== uid
    ) {
      markAsRead({
        messagesIds: [chatMessageList[0].uid],
        chatId: chatMessageList[0].chatId,
      });
      setMarkedAsRead(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessageList]);

  /** Marcar mensaje como leído */

  useEffect(() => {
    if (chatMessageRead.messageId) {
      console.log("????????????", chatMessageRead);
      markMsgAsRead(chatMessageRead.messageId, chatMessageRead.read);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessageRead]);

  /** Funciones */

  function handleCloseChat() {
    disconnectSingleChatSocket();
    setCurrentChat(null);
    setIsChatOpened(false);
    resetChatMessageList();
    setMarkedAsRead(false);
  }

  function handleClickOnChatItem(item: ChatListData) {
    disconnectSingleChatSocket();
    setMarkedAsRead(false);
    resetChatMessageList();
    setCurrentChat(item);
    setIsChatOpened(true);
    if (item.uid) connectSingleChatSocket(item.uid);
  }

  return (
    <>
      <ContentHeader
        title={t("chatSection")}
        icon={<i className="fa-regular fa-comment c-default"></i>}
      />
      <div className="gap-20 modulo-chat">
        {((width <= windowSize.sm && !isChatOpened) ||
          width > windowSize.sm) && (
          <ChatList
            chatList={chatList}
            onClickOnItem={handleClickOnChatItem}
            loadMoreChats={getMoreChats}
            currentChat={currentChat}
            hasMore={hasMoreChatList}
            loading={loadingChatList}
            showArchivedChats={showArchivedChats}
            setShowArchivedChats={setShowArchivedChats}
          />
        )}
        {isChatOpened && currentChat ? (
          <ChatBody
            chatData={currentChat}
            onCloseChat={handleCloseChat}
            messages={chatMessageList}
            getMoreChatMessages={getMoreChatMessages}
            hasMore={hasMoreChatMessageList}
            loading={loadingChatMessages}
          />
        ) : isChatOpened && !currentChat && basicChatDataFromRouting ? (
          <ChatBody
            chatData={basicChatDataFromRouting}
            onCloseChat={handleCloseChat}
            messages={chatMessageList}
            getMoreChatMessages={getMoreChatMessages}
            hasMore={false}
            loading={loadingChatMessages}
          />
        ) : (
          <div className="card-white mch-2 t-flex j-conten j-items f-column">
            <img
              src="/src/assets/images/chat.svg"
              alt=""
              className="chat-pre"
            />
            <div className="pre-chat">
              <div className="info-chat1">{`${t("appName")} ${t(
                "keepsYouConnected"
              )}`}</div>
              <div className="info-chat2">{t("chatText")}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
