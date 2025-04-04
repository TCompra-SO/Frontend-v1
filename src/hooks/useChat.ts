import { useEffect, useState } from "react";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import { useChatSearch, useGetChatList, useGetChatMessages } from "./chatHooks";
import {
  chatListPageSize,
  chatMessagesPageSize,
  inputSearchAfterMseconds,
} from "../utilities/globals";
import { filterUniqueOrFirstRepeated } from "../utilities/globalFunctions";
import { debounce } from "lodash";

export function useChat() {
  const {
    getChatList,
    loadingGetChatList,
    chatList: currentPageChatList,
  } = useGetChatList();
  const { getChatMessages, loadingGetChatMessages, chatMessages } =
    useGetChatMessages();
  const { loadingSearchChat, searchChat, foundChatList } = useChatSearch();
  const [usingSearch, setUsingSearch] = useState(false);
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [hasMoreChatList, setHasMoreChatList] = useState(true);
  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const [hasMoreChatMessageList, setHasMoreChatMessageList] = useState(true);
  const [prevChatMessageListLength, setPrevChatMessageListLength] = useState(0);
  const [isChatListResetToChangeTabs, setIsChatListResetToChangeTabs] =
    useState(false);
  const [pageData, setPageData] = useState({
    page: 0,
    retrieve: false,
    archived: false,
  });
  const [messagePageAndChatId, setMessagePageAndChatId] = useState({
    page: 0,
    chatId: "",
  });

  /** Obtener más chats */

  useEffect(() => {
    if (pageData.page && pageData.retrieve)
      getChatList(pageData.page, pageData.archived);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

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

  /** Reemplazar lista de chats por chats encontrados */

  useEffect(() => {
    resetChatList();
    setChatList(foundChatList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundChatList]);

  /** Funciones */

  function getMoreChats(archived: boolean) {
    setPageData({ page: pageData.page + 1, retrieve: true, archived });
  }

  function getMoreChatMessages(chatId: string) {
    console.log("gettin more chat msgs");
    setMessagePageAndChatId({ page: messagePageAndChatId.page + 1, chatId });
  }

  function resetChatList(changeTabs?: boolean) {
    setPageData({ page: 0, retrieve: false, archived: false });
    setChatList([]);
    setHasMoreChatList(true);
    resetChatMessageList();
    if (changeTabs) setIsChatListResetToChangeTabs(true);
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
      setPageData({
        page: pageData.page + 1,
        retrieve: false,
        archived: pageData.archived,
      });
      setPrevChatMessageListLength(
        prevChatMessageListLength + chatMessagesPageSize
      );
    }
    setChatMessageList([message, ...chatMessageList]);
  }

  function markMsgAsRead(messageId: string, read: boolean) {
    console.log("markMsgAsRead", messageId);
    setChatMessageList((prevList) =>
      prevList.map((item) =>
        item.uid === messageId ? { ...item, read } : item
      )
    );
  }

  const handleSearch = debounce((val: string) => {
    console.log(val);
    if (val) {
      setUsingSearch(true);
      searchChat(val);
    } else {
      setUsingSearch(false);
      resetChatList();
      getMoreChats(false);
    }
  }, inputSearchAfterMseconds);

  return {
    resetChatList,
    chatList,
    loadingChatList: loadingGetChatList || loadingSearchChat,
    getMoreChats,
    loadingChatMessages: loadingGetChatMessages,
    resetChatMessageList,
    chatMessageList,
    getMoreChatMessages,
    hasMoreChatList,
    hasMoreChatMessageList,
    addMessageToChatMessageList,
    markMsgAsRead,
    isChatListResetToChangeTabs,
    setIsChatListResetToChangeTabs,
    handleSearch,
    usingSearch,
    chatListPageData: pageData,
  };
}
