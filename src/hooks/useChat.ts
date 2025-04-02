import { useEffect, useState } from "react";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import { useGetChatList, useGetChatMessages } from "./chatHooks";
import { chatListPageSize, chatMessagesPageSize } from "../utilities/globals";
import { filterUniqueOrFirstRepeated } from "../utilities/globalFunctions";

export function useChat() {
  const {
    getChatList,
    loadingGetChatList,
    chatList: currentPageChatList,
  } = useGetChatList();
  const { getChatMessages, loadingGetChatMessages, chatMessages } =
    useGetChatMessages();
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [hasMoreChatList, setHasMoreChatList] = useState(true);
  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const [hasMoreChatMessageList, setHasMoreChatMessageList] = useState(true);
  const [prevChatMessageListLength, setPrevChatMessageListLength] = useState(0);
  const [page, setPage] = useState({ page: 0, retrieve: false });
  const [messagePageAndChatId, setMessagePageAndChatId] = useState({
    page: 0,
    chatId: "",
  });

  /** Obtener más chats */

  useEffect(() => {
    if (page.page && page.retrieve) getChatList(page.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (currentPageChatList.length < chatListPageSize)
      setHasMoreChatList(false);
    setChatList(chatList.concat(currentPageChatList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageChatList]);

  /** Obtener más mensajes de chat */

  useEffect(() => {
    if (messagePageAndChatId.chatId && messagePageAndChatId.page)
      getChatMessages(messagePageAndChatId.chatId, messagePageAndChatId.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagePageAndChatId]);

  useEffect(() => {
    if (chatMessages.length < chatMessagesPageSize)
      setHasMoreChatMessageList(false);
    const newList = filterUniqueOrFirstRepeated([
      ...chatMessageList,
      ...chatMessages,
    ]);
    setChatMessageList(newList);
    setPrevChatMessageListLength(newList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages]);

  /** Funciones */

  function getMoreChats() {
    setPage({ page: page.page + 1, retrieve: true });
  }

  function getMoreChatMessages(chatId: string) {
    console.log("gettin more chat msgs");
    setMessagePageAndChatId({ page: messagePageAndChatId.page + 1, chatId });
  }

  function resetChatList() {
    setPage({ page: 0, retrieve: false });
    setChatList([]);
    setHasMoreChatList(true);
  }

  function resetChatMessageList() {
    setMessagePageAndChatId({ page: 0, chatId: "" });
    setChatMessageList([]);
    setPrevChatMessageListLength(0);
    setHasMoreChatMessageList(true);
  }

  function addMessageToChatMessageList(message: ChatMessage) {
    if (
      chatMessageList.length + 1 ==
      prevChatMessageListLength + chatMessagesPageSize
    ) {
      setPage({ page: page.page + 1, retrieve: false });
      setPrevChatMessageListLength(
        prevChatMessageListLength + chatMessagesPageSize
      );
    }
    setChatMessageList([message, ...chatMessageList]);
  }

  function markMsgAsRead(messageId: string, read: boolean) {
    setChatMessageList((prevList) =>
      prevList.map((item) =>
        item.uid === messageId ? { ...item, read } : item
      )
    );
  }

  return {
    resetChatList,
    chatList,
    loadingChatList: loadingGetChatList,
    getMoreChats,
    loadingChatMessages: loadingGetChatMessages,
    resetChatMessageList,
    chatMessageList,
    getMoreChatMessages,
    hasMoreChatList,
    hasMoreChatMessageList,
    addMessageToChatMessageList,
    markMsgAsRead,
  };
}
