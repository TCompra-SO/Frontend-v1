import { useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";
import { CancelRequirement } from "../models/Requests";
import { cancelRequirementService } from "../services/requests/requirementService";
import { useTranslation } from "react-i18next";
import { getOffersByRequirementIdService } from "../services/requests/offerService";

export function useCancelRequirement() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();

  const [apiParamsCancel, setApiParamsCancel] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingCancel,
    responseData: responseDataCancel,
    error: errorCancel,
    errorMsg: errorMsgCancel,
    fetchData: fetchDataCancel,
  } = useApi<CancelRequirement>({
    service: apiParamsCancel.service,
    method: apiParamsCancel.method,
    dataToSend: apiParamsCancel.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingCancel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancel]);

  useEffect(() => {
    if (apiParamsCancel.service) fetchDataCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsCancel]);

  useEffect(() => {
    if (responseDataCancel) {
      showNotification(
        notification,
        "success",
        t("requirementCanceledSuccessfully")
      );
    } else if (errorCancel) {
      showNotification(notification, "error", errorMsgCancel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataCancel, errorCancel]);

  function cancelRequirement(reqId: string, motive?: string) {
    const data: CancelRequirement = {
      requerimentID: reqId,
      reason: motive,
    };
    setApiParamsCancel({
      service: cancelRequirementService(),
      method: "post",
      dataToSend: data,
    });
  }

  return { cancelRequirement, loadingCancel };
}

export function useGetOffersByRequirementId() {
  const { notification, message } = App.useApp();

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  function getOffersByRequirementId(reqId: string) {
    setApiParams({
      service: getOffersByRequirementIdService(reqId),
      method: "get",
    });
  }

  return {
    getOffersByRequirementId,
    loadingGetOffersByRequirementId: loading,
    responseDataGetOffersByRequirementId: responseData,
  };
}
