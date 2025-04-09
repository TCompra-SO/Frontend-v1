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
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";

export function useChat() {
  const {
    getChatList,
    loadingGetChatList,
    chatList: currentPageChatList,
  } = useGetChatList();
  const { getChatMessages, loadingGetChatMessages, chatMessages } =
    useGetChatMessages();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { loadingSearchChat, searchChat, foundChatList } = useChatSearch();
  const [usingSearch, setUsingSearch] = useState(false);
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [hasMoreChatList, setHasMoreChatList] = useState(true);
  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const [hasMoreChatMessageList, setHasMoreChatMessageList] = useState(true);
  const [firstChatMessageToRead, setFirstChatMessageToRead] = useState("");
  const [newMessageAndChatData, setNewMessageAndChatData] = useState<{
    chatMessage: ChatMessage;
    chatListData: ChatListData;
  } | null>(null);
  const [isChatListResetToChangeTabs, setIsChatListResetToChangeTabs] =
    useState(false);
  const [pageData, setPageData] = useState({
    chatId: "",
    retrieve: false,
    archived: false,
  });
  const [messagePageAndChatId, setMessagePageAndChatId] = useState({
    chatId: "",
    messageId: "",
  });

  /** Obtener más chats */

  useEffect(() => {
    if (pageData.retrieve) getChatList(pageData.chatId, pageData.archived);
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
    if (messagePageAndChatId.chatId)
      getChatMessages(
        messagePageAndChatId.chatId,
        chatMessageList.length
          ? chatMessageList[chatMessageList.length - 1].uid
          : ""
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages]);

  /** Reemplazar lista de chats por chats encontrados */

  useEffect(() => {
    resetChatList();
    setChatList(foundChatList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundChatList]);

  /** Actualizar datos de lista de chats según señal de socket */

  useEffect(() => {
    if (newMessageAndChatData) {
      setChatList((prevList) => {
        const index = prevList.findIndex(
          (item) => item.uid === newMessageAndChatData.chatListData.uid
        );
        if (index === -1)
          return [newMessageAndChatData.chatListData, ...prevList];
        const newList = [...prevList];
        newList[index] = newMessageAndChatData.chatListData;
        return newList;
      });
    }
  }, [newMessageAndChatData]);

  /** Funciones */

  function getMoreChats(archived: boolean, chatId?: string) {
    setPageData({
      chatId:
        chatId ?? chatList.length ? chatList[chatList.length - 1].uid : "",
      retrieve: true,
      archived,
    });
  }

  function getMoreChatMessages(chatId: string) {
    console.log("gettin more chat msgs");
    setMessagePageAndChatId({
      chatId,
      messageId: chatMessageList.length
        ? chatMessageList[chatMessageList.length - 1].uid
        : "",
    });
  }

  function resetChatList(changeTabs?: boolean) {
    setPageData({ chatId: "", retrieve: false, archived: false });
    setChatList([]);
    setHasMoreChatList(true);
    resetChatMessageList();
    if (changeTabs) setIsChatListResetToChangeTabs(true);
  }

  function resetChatMessageList() {
    setMessagePageAndChatId({ chatId: "", messageId: "" });
    setChatMessageList([]);
    setHasMoreChatMessageList(true);
  }

  function addMessageToChatMessageList(message: ChatMessage) {
    setChatMessageList([message, ...chatMessageList]);
  }

  function updateMsg(message: ChatMessage) {
    setChatMessageList((prevList) => {
      const ind = prevList.findIndex((msg) => msg.uid == message.uid);
      if (ind == -1) return prevList;
      const newList = [...prevList];
      newList[ind] = { ...message };
      return newList;
    });
  }

  function markMsgAsError(messageId: string) {
    if (messageId)
      setChatMessageList((prevList) => {
        const ind = prevList.findIndex((msg) => msg.uid == messageId);
        if (ind == -1) return prevList;
        const newList = [...prevList];
        newList[ind] = { ...newList[ind], error: true };
        return newList;
      });
  }

  function markMsgAsRead(messageId: string) {
    console.log("markMsgAsRead", messageId);
    setChatMessageList((prevList) => {
      const obj = prevList.find((item) => item.uid == messageId);
      if (obj) {
        const ownerIsCurrentUser = obj.userId == uid;
        // prevList.map((item) =>
        // item.uid === messageId ? { ...item, read: true } : item
        // );
        const updatedList = [...prevList];
        for (let i = 0; i < updatedList.length; i++) {
          if (
            (ownerIsCurrentUser && updatedList[i].userId == uid) ||
            (!ownerIsCurrentUser && updatedList[i].userId != uid)
          )
            if (!updatedList[i].read) updatedList[i].read = true;
            else break;
        }
        return updatedList;
      }
      return prevList;
    });
  }

  function removeChatFromList(chatId: string) {
    setChatList((prevList) => {
      return prevList.filter((chat) => chat.uid !== chatId);
    });
  }

  const handleSearch = debounce((val: string) => {
    console.log(val);
    if (val) {
      setUsingSearch(true);
      searchChat(val);
    } else {
      setUsingSearch(false);
      resetChatList();
      getMoreChats(false, "");
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
    setFirstChatMessageToRead,
    updateMsg,
    markMsgAsError,
    setNewMessageAndChatData,
    removeChatFromList,
  };
}
