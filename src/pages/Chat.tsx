import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/utils/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody/ChatBody";
import {
  BasicChatListData,
  ChatListData,
  ChatSocketData,
} from "../models/MainInterfaces";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import {
  basicChatDataFieldName,
  chatDataFieldName,
  windowSize,
} from "../utilities/globals";
import { useLocation, useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";

export default function Chat() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const {
    chatList,
    getMoreChats,
    chatMessageList,
    getMoreChatMessages,
    resetChatMessageList,
    hasMoreChatList,
    hasMoreChatMessageList,
    loadingChatList,
    loadingChatMessages,
  } = useChat();
  const hasHandledChatNotification = useRef(false);
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatListData | null>(null);
  const [basicChatDataFromRouting] = useState<BasicChatListData | undefined>(
    location.state?.[basicChatDataFieldName]
  );

  /** Obtener lista inicial de chats */

  useEffect(() => {
    getMoreChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  /** Funciones */

  function handleCloseChat() {
    setCurrentChat(null);
    setIsChatOpened(false);
    resetChatMessageList();
  }

  function handleClickOnChatItem(item: ChatListData) {
    console.log("opening chat...");
    resetChatMessageList();
    setCurrentChat(item);
    setIsChatOpened(true);
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
