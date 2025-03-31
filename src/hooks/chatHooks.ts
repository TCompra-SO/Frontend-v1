import { useTranslation } from "react-i18next";
import { CreateChatRequest } from "../models/Requests";
import {
  createChat,
  createChatMessage,
} from "../services/general/generalServices";
import { defaultErrorMsg } from "../utilities/globals";
import useShowNotification from "./utilHooks";
import { useState } from "react";

export function useCreateChatAndSendMessage(
  showNotificationAfterMsgSent: boolean
) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);

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
        } = await createChatMessage({
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

  return { createChatAndSendMessage, loadingCreateChatAndSendMessage: loading };
}
