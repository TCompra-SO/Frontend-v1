import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/utils/ContentHeader";
import ChatList from "../components/section/chat/ChatList/ChatList";
import ChatBody from "../components/section/chat/ChatBody/ChatBody";
import {
  BasicChatListData,
  ChatListData,
  SocketChatMessage,
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
import { useChatFunctions } from "../hooks/chatHooks";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import chatImg from "../assets/images/chat.svg";

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
    resetChatList,
    hasMoreChatList,
    hasMoreChatMessageList,
    loadingChatList,
    loadingSearchChat,
    loadingChatMessages,
    addMessageToChatMessageList,
    markMsgAsRead,
    isChatListResetToChangeTabs,
    setIsChatListResetToChangeTabs,
    handleSearch,
    usingSearch,
    markMsgAsError,
    updateMsg,
    setNewMessageAndChatData,
    removeChatFromList,
    chatListIsSet,
    updateChatUnreadMessages,
  } = useChat();
  const {
    connectSingleChatSocket,
    disconnectSingleChatSocket,
    lastChatMessageReceived,
    chatMessageRead,
    newMessageAndChatDataFromSocket,
    currentChatUnreadMessages,
  } = useContext(MainSocketsContext);
  const uid: string = useSelector((state: MainState) => state.user.uid);
  const { verifyIfChatExists } = useChatFunctions(false);
  const hasHandledChatNotification = useRef(false);
  const hasHandledReroutingChat = useRef(false);
  const chatThatHasBeenCreated = useRef("");
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [openingChatFromExternalSource, setOpeningChatFromExternalSource] =
    useState(true);
  const [currentChat, setCurrentChat] = useState<ChatListData | null>(null);
  const [showArchivedChats, setShowArchivedChats] = useState(false);
  const [basicChatDataFromRouting, setBasicChatDataFromRouting] = useState<
    BasicChatListData | undefined
  >(location.state?.[basicChatDataFieldName]);
  const [chatDataFromNotification, setChatDataFromNotification] = useState<
    SocketChatMessage | undefined
  >(location.state?.[chatDataFieldName]);

  /** Obtener lista inicial de chats */

  useEffect(() => {
    if (!usingSearch) {
      handleCloseChat();
      resetChatList(true);
    }
    return () => {
      disconnectSingleChatSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArchivedChats]);

  /** Obtener lista de chats después de resetear lista (al cambiar tabs o al inicio) */

  useEffect(() => {
    if (isChatListResetToChangeTabs) {
      getMoreChats(showArchivedChats);
      setIsChatListResetToChangeTabs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatListResetToChangeTabs]);

  /** Abrir chat desde notificación o desde redireccionamiento */

  useEffect(() => {
    openChatFromNotificationOrRerouting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatListIsSet]);

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

  /** Marcar mensaje como leído */

  useEffect(() => {
    if (chatMessageRead.endMessageId && chatMessageRead.startMessageId) {
      markMsgAsRead(
        chatMessageRead.startMessageId,
        chatMessageRead.endMessageId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessageRead]);

  /** Cambiar según si se usa búsqueda o no */

  useEffect(() => {
    if (usingSearch) setShowArchivedChats(false);
  }, [usingSearch]);

  /** Guardar datos de nuevo mensaje desde señal de socket
   * Si hay datos obtenidos de la url, guardar uid del chat que acaba de ser creado
   */

  useEffect(() => {
    setNewMessageAndChatData(newMessageAndChatDataFromSocket);
    if (
      !chatThatHasBeenCreated.current &&
      newMessageAndChatDataFromSocket &&
      basicChatDataFromRouting
    ) {
      if (
        newMessageAndChatDataFromSocket.chatListData.requirementId ==
          basicChatDataFromRouting.requirementId &&
        newMessageAndChatDataFromSocket.chatListData.userId ==
          basicChatDataFromRouting.userId
      )
        chatThatHasBeenCreated.current =
          newMessageAndChatDataFromSocket.chatListData.uid;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessageAndChatDataFromSocket]);

  /** Conectar al chat que acaba de ser creado al enviar 1er mensaje en chat que no existía */

  useEffect(() => {
    if (chatList.length && chatThatHasBeenCreated.current) {
      const chatToOpen = chatList.find(
        (chat) => chat.uid == chatThatHasBeenCreated.current
      );
      if (chatToOpen) {
        handleClickOnChatItem(chatToOpen);
        chatThatHasBeenCreated.current = "";
        setBasicChatDataFromRouting(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList]);

  /** Actualizar cantidad de mensajes no leídos en chat actual */

  useEffect(() => {
    if (currentChat)
      updateChatUnreadMessages(
        currentChat.uid,
        currentChatUnreadMessages.unreadMessages
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatUnreadMessages]);

  /** Funciones */

  function handleCloseChat() {
    console.log("closing chat");
    disconnectSingleChatSocket();
    setCurrentChat(null);
    setIsChatOpened(false);
    resetChatMessageList();
  }

  function handleClickOnChatItem(item: ChatListData, noReset?: boolean) {
    if (currentChat?.uid != item.uid) {
      if (!noReset) {
        disconnectSingleChatSocket();
        resetChatMessageList();
      }
      setCurrentChat(item);
      setIsChatOpened(true);
      if (item.uid) connectSingleChatSocket(item.uid);
    }
  }

  async function openChatFromNotificationOrRerouting() {
    if (
      chatListIsSet === true &&
      chatDataFromNotification &&
      !hasHandledChatNotification.current
    ) {
      navigate(".", { replace: true, state: null });
      const chatToOpen = chatList.find(
        (chat) => chat.uid === chatDataFromNotification.chatId
      );
      if (chatToOpen) {
        handleClickOnChatItem(chatToOpen);
        hasHandledChatNotification.current = true;
        setOpeningChatFromExternalSource(false);
        setChatDataFromNotification(undefined);
      } else {
        await openChatIfNotFound(
          chatDataFromNotification.userId,
          chatDataFromNotification.requirementId,
          true
        );
      }
    }

    if (!chatDataFromNotification) {
      if (
        chatListIsSet === true &&
        basicChatDataFromRouting &&
        !hasHandledReroutingChat.current
      ) {
        navigate(".", { replace: true, state: null });

        const chatToOpen = basicChatDataFromRouting.uid
          ? chatList.find((chat) => chat.uid === basicChatDataFromRouting.uid)
          : chatList.find(
              (chat) =>
                chat.userId === basicChatDataFromRouting.userId &&
                chat.requirementId === basicChatDataFromRouting.requirementId
            );
        // chat encontrado en lista cargada
        if (chatToOpen) {
          handleClickOnChatItem(chatToOpen);
          hasHandledReroutingChat.current = true;
          setOpeningChatFromExternalSource(false);
        } else {
          await openChatIfNotFound(
            basicChatDataFromRouting.userId,
            basicChatDataFromRouting.requirementId,
            false
          );
        }
      }
    }
    if (!chatDataFromNotification && !basicChatDataFromRouting)
      setOpeningChatFromExternalSource(false);
  }

  async function openChatIfNotFound(
    receiverId: string,
    requirementId: string,
    fromNotification: boolean
  ) {
    // chat no encontrado
    const { chat } = await verifyIfChatExists({
      userId1: uid,
      userId2: receiverId,
      requerimentId: requirementId,
    });
    // chat existe
    if (chat) {
      // chat archivado
      if (chat.archive?.[0]?.state) {
        if (showArchivedChats) {
          handleClickOnChatItem(chat);
          if (fromNotification) {
            hasHandledChatNotification.current = true;
            setChatDataFromNotification(undefined);
          } else hasHandledReroutingChat.current = true;
          setOpeningChatFromExternalSource(false);
        } else setShowArchivedChats(true);
      } else {
        // chat no archivado
        if (!showArchivedChats) {
          handleClickOnChatItem(chat);
          if (fromNotification) {
            hasHandledChatNotification.current = true;
            setChatDataFromNotification(undefined);
          } else hasHandledReroutingChat.current = true;
          setOpeningChatFromExternalSource(false);
        } else setShowArchivedChats(false);
      }
    } else {
      // chat no existe
      setIsChatOpened(true);
      // Caso improbable. En teoría, chat desde una notificación siempre debería existir
      if (fromNotification) hasHandledChatNotification.current = true;
      else {
        hasHandledReroutingChat.current = true;
        chatThatHasBeenCreated.current = "";
      }
      setOpeningChatFromExternalSource(false);
    }
  }

  function closeChatIfOpened() {
    if (isChatOpened) handleCloseChat();
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
            loadingList={loadingChatList}
            loadingSearch={loadingSearchChat}
            showArchivedChats={showArchivedChats}
            setShowArchivedChats={setShowArchivedChats}
            handleSearch={handleSearch}
            usingSearch={usingSearch}
            removeChatFromList={removeChatFromList}
            closeChat={closeChatIfOpened}
            loadingAll={openingChatFromExternalSource}
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
            addMessageToChatMessageList={addMessageToChatMessageList}
            markMsgAsError={markMsgAsError}
            updateMsg={updateMsg}
          />
        ) : isChatOpened && !currentChat && basicChatDataFromRouting ? (
          <ChatBody
            addMessageToChatMessageList={addMessageToChatMessageList}
            chatData={basicChatDataFromRouting}
            onCloseChat={handleCloseChat}
            messages={chatMessageList}
            getMoreChatMessages={getMoreChatMessages}
            hasMore={false}
            loading={loadingChatMessages}
            markMsgAsError={markMsgAsError}
            updateMsg={updateMsg}
          />
        ) : (
          <div className="card-white mch-2 t-flex j-conten j-items f-column">
            <img src={chatImg} alt="" className="chat-pre" />
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
