import { useTranslation } from "react-i18next";
import useShowNotification, { useShowLoadingMessage } from "./utilHooks";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { useContext, useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import { ValidateSaleRequest } from "../models/Requests";
import useApi from "./useApi";
import { defaultErrorMsg } from "../utilities/globals";
import { Action, RequirementType } from "../utilities/types";
import { getValidateRecordService } from "../utilities/globalFunctions";

export function useValidateSale() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { updateIdAndActionAdminQueue, deleteFromIdAndActionAdminQueue } =
    useContext(LoadingDataContext);
  const [apiParams, setApiParams] = useState<useApiParams<ValidateSaleRequest>>(
    {
      service: null,
      method: "get",
    }
  );
  const { responseData, error, errorMsg, fetchData } =
    useApi<ValidateSaleRequest>(apiParams);

  useEffect(() => {
    return () => {
      if (apiParams.dataToSend?.requirementId)
        deleteFromIdAndActionAdminQueue(apiParams.dataToSend.requirementId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    try {
      if (responseData) {
        showNotification(
          "success",
          t(
            responseData.res?.value
              ? "saleValidatedSuccessfully"
              : "saleInvalidatedSuccessfully"
          )
        );
      } else if (error) {
        showNotification("error", errorMsg);
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      if (apiParams.dataToSend?.requirementId)
        deleteFromIdAndActionAdminQueue(apiParams.dataToSend?.requirementId);
      showLoadingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function validateSale(requirementId: string, value: boolean) {
    showLoadingMessage(true);
    updateIdAndActionAdminQueue(
      requirementId,
      value ? Action.VALIDATE : Action.INVALIDATE
    );
    setApiParams({
      service: getValidateRecordService(RequirementType.SALE),
      method: "post",
      dataToSend: {
        requirementId,
        value,
      },
    });
  }

  return {
    validateSale,
  };
}
