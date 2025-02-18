import { App, Avatar } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DisplayUser } from "../models/MainInterfaces";
import { NotificationData, useApiParams } from "../models/Interfaces";
import { transformToDisplayUser } from "../utilities/transform";
import { searchCompanyByNameService } from "../services/requests/authService";
import {
  getGetOrderPDFService,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import useApi from "./useApi";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { RequirementType } from "../utilities/types";
import NotificationUserAvatar from "../components/common/utils/NotificationUserAvatar";

export default function useShowNotification() {
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

  function showRealTimeNotification(content: NotificationData) {
    if (api) {
      api.open({
        message: content.title,
        description: content.body,
        showProgress: true,
        pauseOnHover: true,
        placement: "bottomRight",
        icon: (
          <NotificationUserAvatar
            senderImage={content.senderImage}
            senderName={content.senderName}
            size={"small"}
          />
        ),
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
    showLoadingMessage(loadingPdf);
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
