import { useTranslation } from "react-i18next";
import {
  ArchiveChatRequest,
  CreateChatRequest,
  CreateMessageRequest,
  GetChatListRequest,
  GetChatMessagesRequest,
  GetChatStateRequest,
  MarkChatMessagesAsReadRequest,
  SearchChatRequest,
} from "../models/Requests";
import {
  archiveChatReq,
  createChat,
  createChatMessage,
  getChatState,
  markChatMessageAsRead,
} from "../services/general/generalServices";
import {
  chatListPageSize,
  chatMessagesPageSize,
  defaultErrorMsg,
} from "../utilities/globals";
import useShowNotification from "./utilHooks";
import { useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import {
  getArchivedChatListService,
  getChatListService,
  getChatMessagesService,
  searchChatService,
} from "../services/requests/chatService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import {
  transformToChatListData,
  transformToChatMessage,
} from "../utilities/transform";

export function useChatFunctions(showNotificationAfterMsgSent: boolean) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [loading, setLoading] = useState(false);

  async function archiveChat(request: ArchiveChatRequest) {
    const { responseData, errorMsg } = await archiveChatReq(request);
    if (responseData) return true;
    else if (errorMsg) {
      showNotification("error", t(errorMsg));
      return false;
    }
    return false;
  }

  async function markAsRead(request: MarkChatMessagesAsReadRequest) {
    return await markChatMessageAsRead(request);
  }

  async function sendMessage(request: CreateMessageRequest) {
    return await createChatMessage(request);
  }

  async function verifyIfChatExists(request: GetChatStateRequest) {
    return await getChatState(request, uid);
  }

  async function createChatAndSendMessage(
    request: CreateChatRequest,
    message: string
  ) {
    try {
      setLoading(true);
      const { chatData, error, errorMsg } = await createChat(request);
      if (
        chatData ||
        (error && error.status == 400 && error.response?.data.error.uid) // chat ya existe
      ) {
        const {
          messageData,
          error: msgError,
          errorMsg: msgErrorMsg,
        } = await sendMessage({
          chatId: chatData
            ? chatData.chat.uid
            : error?.response?.data.error.uid,
          userId: request.userId,
          message,
        });
        if (messageData)
          if (showNotificationAfterMsgSent)
            showNotification("success", t("messageSentSuccessfully"));
        if (msgError) showNotification("error", msgErrorMsg);
      } else if (error) {
        showNotification("error", errorMsg);
      }
      return { chatData, error };
    } catch (e) {
      console.log(e);
      showNotification("error", t(defaultErrorMsg));
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createChatAndSendMessage,
    loadingCreateChatAndSendMessage: loading,
    sendMessage,
    markAsRead,
    archiveChat,
    verifyIfChatExists,
  };
}

export function useGetChatList() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  // const [loading, setLoading] = useState<boolean>();
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [apiParams, setApiParams] = useState<useApiParams<GetChatListRequest>>({
    service: null,
    method: "get",
  });
  const { responseData, error, errorMsg, fetchData, loading } =
    useApi<GetChatListRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setChatList(
          responseData.data.map((chat: any) =>
            transformToChatListData(chat, uid)
          )
        );
      } catch (err) {
        console.log(err);
        showNotification("error", t(defaultErrorMsg));
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getChatList(chatId: string, archived: boolean) {
    // reset();
    // setLoading(true);
    setApiParams({
      service: archived ? getArchivedChatListService() : getChatListService(),
      method: "post",
      dataToSend: {
        userId: uid,
        chatId,
        pageSize: chatListPageSize,
      },
    });
  }

  return { getChatList, loadingGetChatList: loading, chatList };
}

export function useGetChatMessages() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [apiParams, setApiParams] = useState<
    useApiParams<GetChatMessagesRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<GetChatMessagesRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setChatMessages(
          responseData.data.map((chatMessage: any) =>
            transformToChatMessage(chatMessage)
          )
        );
      } catch (err) {
        console.log(err);
        showNotification("error", t(defaultErrorMsg));
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getChatMessages(chatId: string, messageId: string) {
    setApiParams({
      service: getChatMessagesService(),
      method: "post",
      dataToSend: {
        chatId,
        pageSize: chatMessagesPageSize,
        messageId,
      },
    });
  }

  return {
    getChatMessages,
    loadingGetChatMessages: loading,
    chatMessages,
  };
}

export function useChatSearch() {
  const uid = useSelector((state: MainState) => state.user.uid);
  const [foundChatList, setFoundChatList] = useState<ChatListData[]>([]);
  const [apiParams, setApiParams] = useState<useApiParams<SearchChatRequest>>({
    service: null,
    method: "get",
  });
  const { loading, responseData, fetchData } =
    useApi<SearchChatRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setFoundChatList(
          responseData.data.map((chat: any) =>
            transformToChatListData(chat, uid)
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  function searchChat(keyWords: string) {
    setApiParams({
      service: searchChatService(),
      method: "post",
      dataToSend: {
        userId: uid,
        keyWords,
      },
    });
  }

  return { searchChat, loadingSearchChat: loading, foundChatList };
}
