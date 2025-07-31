import { useEffect, useMemo, useRef, useState } from "react";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import { useChatSearch, useGetChatList, useGetChatMessages } from "./chatHooks";
import {
  chatListPageSize,
  chatMessagesPageSize,
  inputSearchAfterMseconds,
} from "../utilities/globals";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { filterUniqueOrFirstRepeated } from "../utilities/globalFunctions";

export function useChat() {
  const {
    getChatList,
    loadingGetChatList,
    chatList: currentPageChatList,
  } = useGetChatList();
  const {
    getChatMessages,
    loadingGetChatMessages,
    chatMessages: currentChatMessages,
  } = useGetChatMessages();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { loadingSearchChat, searchChat, foundChatList } = useChatSearch();
  const [usingSearch, setUsingSearch] = useState(false);
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [chatListIsSet, setChatListIsSet] = useState<boolean>();
  const [hasMoreChatList, setHasMoreChatList] = useState(true);
  const [chatMessageList, setChatMessageList] = useState<ChatMessage[]>([]);
  const [hasMoreChatMessageList, setHasMoreChatMessageList] = useState(true);
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
  const [dataToGetMoreMsgs, setDataToGetMoreMsgs] = useState({
    chatId: "",
    messageId: "",
  });
  const prevChatId = useRef("");
  const isNewChat = useRef(true);

  /** Cleanup */

  useEffect(() => {
    return () => {
      setChatList([]);
      handleSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Obtener más chats */

  useEffect(() => {
    if (pageData.retrieve) getChatList(pageData.chatId, pageData.archived);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  useEffect(() => {
    if (currentPageChatList.length < chatListPageSize)
      setHasMoreChatList(false);
    setChatList(chatList.concat(currentPageChatList));
    if (chatListIsSet === false) setChatListIsSet(true); // solo actualizar si antes se hizo una solicitud para obtener más chats
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageChatList]);

  /** Obtener más mensajes de chat */

  useEffect(() => {
    if (dataToGetMoreMsgs.chatId)
      getChatMessages(
        dataToGetMoreMsgs.chatId,
        chatMessageList.length
          ? chatMessageList[chatMessageList.length - 1].uid
          : ""
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToGetMoreMsgs]);

  useEffect(() => {
    if (currentChatMessages.length < chatMessagesPageSize)
      setHasMoreChatMessageList(false);
    const newList = isNewChat.current
      ? currentChatMessages
      : filterUniqueOrFirstRepeated([
          ...chatMessageList,
          ...currentChatMessages,
        ]);
    setChatMessageList(newList);
    // setChatMessageList((prevList) => [...prevList, ...currentChatMessages]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatMessages]);

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
          // chat no encontrado, poner en 1er lugar
          return [newMessageAndChatData.chatListData, ...prevList];
        // Chat encontrado, actualizar
        const newList = [...prevList];
        newList[index] = newMessageAndChatData.chatListData;
        if (newList[index].lastDate !== prevList[index].lastDate) {
          // asumiendo que la fecha fue actualizada
          const [item] = newList.splice(index, 1);
          newList.unshift(item);
        }
        return newList;
      });
    }
  }, [newMessageAndChatData]);

  /** Si se hizo una solicitud para obtener más chats, cambiar flag a false */

  useEffect(() => {
    if (loadingGetChatList) setChatListIsSet(false);
  }, [loadingGetChatList]);

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
    isNewChat.current = prevChatId.current != chatId;
    prevChatId.current = chatId;
    setDataToGetMoreMsgs({
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
    prevChatId.current = "";
    isNewChat.current = true;
  }

  function resetChatMessageList() {
    setDataToGetMoreMsgs({ chatId: "", messageId: "" });
    setChatMessageList([]);
    setHasMoreChatMessageList(true);
  }

  function addMessageToChatMessageList(message: ChatMessage) {
    setChatMessageList([message, ...chatMessageList]);
  }

  function updateMsg(uid: string, message: ChatMessage) {
    setChatMessageList((prevList) => {
      const ind = prevList.findIndex((msg) => msg.uid == uid);
      if (ind == -1) return prevList;
      const newList = [...prevList];
      newList[ind] = { ...message };
      return newList;
    });
  }

  function updateChatUnreadMessages(uid: string, unreadMsgs: number) {
    setChatList((prevList) => {
      const ind = prevList.findIndex((chat) => chat.uid == uid);
      if (ind == -1) return prevList;
      const newList = [...prevList];
      newList[ind] = { ...newList[ind], numUnreadMessages: unreadMsgs };
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
    setChatMessageList((prevList) => {
      const objInd = prevList.findIndex((item) => item.uid == messageId);
      if (objInd != -1) {
        const ownerIsCurrentUser = prevList[objInd].userId == uid;
        const updatedList = [...prevList];
        for (let i = objInd; i < updatedList.length; i++) {
          if (
            (ownerIsCurrentUser && updatedList[i].userId == uid) ||
            (!ownerIsCurrentUser && updatedList[i].userId != uid)
          ) {
            if (!updatedList[i].read) updatedList[i].read = true;
            else break;
          }
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

  const handleSearch = useMemo(
    () =>
      debounce((val: string) => {
        if (val) {
          setUsingSearch(true);
          searchChat(val);
        } else {
          setUsingSearch(false);
          resetChatList();
          getMoreChats(false, "");
        }
      }, inputSearchAfterMseconds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    resetChatList,
    chatList,
    loadingChatList: loadingGetChatList,
    loadingSearchChat,
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
    updateMsg,
    markMsgAsError,
    setNewMessageAndChatData,
    removeChatFromList,
    chatListIsSet,
    updateChatUnreadMessages,
  };
}
