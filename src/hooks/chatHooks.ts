import { useTranslation } from "react-i18next";
import {
  CreateChatRequest,
  CreateMessageRequest,
  GetChatListRequest,
  GetChatMessagesRequest,
} from "../models/Requests";
import {
  createChat,
  createChatMessage,
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
  getChatListService,
  getChatMessagesService,
} from "../services/requests/chatService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { ChatListData, ChatMessage } from "../models/MainInterfaces";
import {
  transformToChatListData,
  transformToChatMessage,
} from "../utilities/transform";

export function useCreateChatAndSendMessage(
  showNotificationAfterMsgSent: boolean
) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);

  async function sendMessage(request: CreateMessageRequest) {
    return await createChatMessage(request);
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
    } catch (e) {
      console.log(e);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      setLoading(false);
    }
  }

  return {
    createChatAndSendMessage,
    loadingCreateChatAndSendMessage: loading,
    sendMessage,
  };
}

export function useGetChatList() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [chatList, setChatList] = useState<ChatListData[]>([]);
  const [apiParams, setApiParams] = useState<useApiParams<GetChatListRequest>>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<GetChatListRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setChatList(
          responseData.data.map((chat: any) => transformToChatListData(chat))
        );
      } catch (err) {
        showNotification("error", t(defaultErrorMsg));
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getChatList(page: number) {
    setApiParams({
      service: getChatListService(),
      method: "post",
      dataToSend: {
        userId: uid,
        page,
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
        console.log(
          responseData.data.map((chatMessage: any) =>
            transformToChatMessage(chatMessage)
          )
        );
      } catch (err) {
        showNotification("error", t(defaultErrorMsg));
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getChatMessages(chatId: string, page: number) {
    setApiParams({
      service: getChatMessagesService(),
      method: "post",
      dataToSend: {
        chatId,
        page,
        pageSize: chatMessagesPageSize,
      },
    });
  }

  return { getChatMessages, loadingGetChatMessages: loading, chatMessages };
}
