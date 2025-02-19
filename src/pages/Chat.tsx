import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/utils/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody/ChatBody";
import { ChatListData, ChatSocketData } from "../models/MainInterfaces";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { chatDataFieldName, windowSize } from "../utilities/globals";
import { useChat } from "../hooks/useChat";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const { t } = useTranslation();
  const location = useLocation();
  const { width } = useWindowSize();
  const { chatList, getMoreChats, chatMessageList, getMoreChatMessages } =
    useChat();
  // const [chatList, setChatList] = useState(chatElements.slice(0, 10));
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatListData | null>(null);

  /** Obtener lista inicial de chats */

  useEffect(() => {
    getMoreChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Abrir chat desde notificación */

  useEffect(() => {
    const chatDataFromNotification: ChatSocketData =
      location.state?.[chatDataFieldName];
    if (chatDataFromNotification) {
      console.log(chatDataFromNotification);
    }
  }, [location]);

  useEffect(() => {
    if (isChatOpened && currentChat) {
      getMoreChatMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpened]);

  /** Funciones */

  function handleCloseChat() {
    setCurrentChat(null);
    setIsChatOpened(false);
  }

  function handleClickOnChatItem(item: ChatListData) {
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
          />
        )}
        {isChatOpened && currentChat ? (
          <ChatBody
            chatData={currentChat}
            onCloseChat={handleCloseChat}
            messages={chatMessageList}
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
