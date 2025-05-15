import { App } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BasicChatListData, DisplayUser } from "../models/MainInterfaces";
import {
  ShowRealTimeNotificationParams,
  useApiParams,
} from "../models/Interfaces";
import { transformToDisplayUser } from "../utilities/transform";
import { searchCompanyByNameService } from "../services/requests/authService";
import {
  collapseRepeatsLoose,
  collapseRepeatsSpecial,
  countChar,
  generateRandomKey,
  getGetOrderPDFService,
  normalizeSpanish,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import useApi from "./useApi";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { RequirementType, RTNotificationType } from "../utilities/types";
import NotificationUserAvatar from "../components/common/utils/NotificationUserAvatar";
import ParagraphContainer from "../components/containers/ParagraphContainer";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { basicChatDataFieldName } from "../utilities/globals";
import { rawBannedWords } from "../utilities/bannedWords";

export default function useShowNotification() {
  const { t } = useTranslation();
  const { notification: api } = App.useApp();

  function showNotification(
    type: "success" | "error" | "info" | "warning",
    description: ReactNode | null
  ) {
    if (api && description)
      api[type]({
        message: description,
        // description: description,
        showProgress: true,
        pauseOnHover: false,
        placement: "topLeft",
      });
  }

  function showRealTimeNotification(params: ShowRealTimeNotificationParams) {
    if (api) {
      const key = generateRandomKey();
      let title: string = "";
      let description: string = "";
      let senderImage: string | undefined = "";
      let senderName: string = "";
      let callback = () => {};
      if (params.type == RTNotificationType.NOTIFICATION) {
        title = params.content.title;
        description = params.content.body;
        senderImage = params.content.senderImage;
        senderName = params.content.senderName;
        callback = () => params.onClickCallback(params.content);
      } else if (params.type == RTNotificationType.CHAT) {
        title = params.content.userName;
        senderImage = params.content.userImage;
        senderName = params.content.userName;
        callback = () => params.onClickCallback(params.content);
        if (
          params.content.message &&
          typeof params.content.message === "string"
        )
          description = params.content.message;
        else if (params.content.images)
          description = `${t("chatMessageImagesDocs")} ${
            params.content.images.length
          } ${t("chatMessageImages")}.`;
        else if (params.content.documents)
          description = `${t("chatMessageImagesDocs")} ${
            params.content.documents.length
          } ${t("chatMessageDocs")}.`;
      }
      api.open({
        key,
        message: (
          <ParagraphContainer ellipsis={{ rows: 1 }}>
            {title}
          </ParagraphContainer>
        ),
        description: (
          <ParagraphContainer
            ellipsis={{
              rows: 2,
            }}
          >
            {description}
          </ParagraphContainer>
        ),
        showProgress: true,
        pauseOnHover: true,
        placement: "bottomRight",
        icon: (
          <NotificationUserAvatar
            senderImage={senderImage}
            senderName={senderName}
            size={"small"}
          />
        ),
        onClick: () => {
          callback();
          api.destroy(key);
        },
        style: { cursor: "pointer" },
      });
    }
  }

  return { showNotification, showRealTimeNotification };
}

export function useShowLoadingMessage() {
  const { message } = App.useApp();
  const { t } = useTranslation();

  function showLoadingMessage(
    show: boolean | undefined,
    textKey: string = "loading"
  ) {
    // console.log(textKey, show);
    // const message = getMessageApi();
    if (message && show) {
      message.open({
        type: "loading",
        content: t(textKey),
        duration: 0,
      });
    }
    if (show === false && message) message.destroy();
  }

  return { showLoadingMessage };
}

export function useSearchCompanyByName() {
  const [companyList, setCompanyList] = useState<DisplayUser[]>([]);
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { loading, responseData, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setCompanyList(
          responseData.data?.map((item: any) => transformToDisplayUser(item))
        );
      } catch (err) {
        console.log(err);
      } finally {
        // showLoadingMessage(message, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  function searchCompanyByName(query: string) {
    setCompanyList([]);
    setApiParams({
      service: searchCompanyByNameService(query),
      method: "get",
    });
  }

  function clearList() {
    setCompanyList([]);
  }

  return {
    searchCompanyByName,
    clearList,
    loadingCompanyList: loading,
    companyList,
  };
}

export function useDownloadPdfOrder() {
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);

  const [apiParamsPdf, setApiParamsPdf] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingPdf,
    responseData: responseDataPdf,
    error: errorPdf,
    errorMsg: errorMsgPdf,
    fetchData: fetchDataPdf,
  } = useApi(apiParamsPdf);

  useEffect(() => {
    updateMyPurchaseOrdersLoadingPdf(loadingPdf);
    showLoadingMessage(loadingPdf, "generatingPDF");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPdf]);

  useEffect(() => {
    if (apiParamsPdf.service) fetchDataPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsPdf]);

  useEffect(() => {
    if (responseDataPdf) {
      openPurchaseOrderPdf(responseDataPdf);
    } else if (errorPdf) {
      showNotification("error", errorMsgPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataPdf, errorPdf]);

  function downloadPdfOrder(id: string, type: RequirementType) {
    setApiParamsPdf({
      service: getGetOrderPDFService(type)?.(id),
      method: "get",
    });
  }

  return downloadPdfOrder;
}

export function useRedirectToChat() {
  const navigate = useNavigate();

  function redirectToChat(data: BasicChatListData) {
    navigate(pageRoutes.chat, {
      state: { [basicChatDataFieldName]: data },
    });
  }

  return { redirectToChat };
}

export function useGetBannedWords() {
  const [bannedWords] = useState(getBannedWords());

  function getBannedWords() {
    const bannedWords = new Set<string>();
    rawBannedWords.forEach((word) => {
      const normalizedWord = normalizeSpanish(word);
      bannedWords.add(normalizedWord);
      // Caso específico para palabras que contienen número impar de rs y ls (e.g r y rr o l y ll)
      // asumiendo la poca probabilidad de que haya palabras prohibidas con r rr rr o similares
      const rCount = countChar(word, "r");
      const lCount = countChar(word, "l");
      if ((rCount > 2 && rCount % 2 !== 0) || (lCount > 2 && lCount % 2 !== 0))
        bannedWords.add(collapseRepeatsLoose(normalizedWord));
    });
    return [...bannedWords];
  }

  function censorText(input: string) {
    return input.replace(/\p{L}+/gu, (word) => {
      const normalizedLoose = collapseRepeatsLoose(normalizeSpanish(word));
      const normalizedSpecial = collapseRepeatsSpecial(normalizeSpanish(word));
      const match = bannedWords.find(
        (bw) => normalizedLoose === bw || normalizedSpecial === bw
      );
      return match ? "*".repeat(word.length) : word;
    });
  }

  return { getBannedWords, censorText };
}
