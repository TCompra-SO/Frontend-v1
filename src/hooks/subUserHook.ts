import { useTranslation } from "react-i18next";
import useShowNotification, { useShowLoadingMessage } from "./utilHooks";
import { useContext, useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import { changeStatusSubUserService } from "../services/requests/subUserService";
import { ChangeStatusRequest } from "../models/Requests";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { Action } from "../utilities/types";

export function useChangeSubUserStatus() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { updateIdAndActionQueue, deleteFromIdAndActionQueue } =
    useContext(LoadingDataContext);
  const [apiParams, setApiParams] = useState<useApiParams<ChangeStatusRequest>>(
    {
      service: null,
      method: "get",
    }
  );
  const { responseData, error, errorMsg, fetchData } =
    useApi<ChangeStatusRequest>(apiParams);

  useEffect(() => {
    return () => {
      if (apiParams.dataToSend?.uid)
        deleteFromIdAndActionQueue(apiParams.dataToSend.uid);
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
            apiParams.dataToSend?.status
              ? "userReactivatedSuccessfully"
              : "userSuspendedSuccessfully"
          )
        );
      } else if (error) {
        showNotification("error", errorMsg);
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      if (apiParams.dataToSend?.uid)
        deleteFromIdAndActionQueue(apiParams.dataToSend?.uid);
      showLoadingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function changeSubUserStatus(subUserId: string, activate: boolean) {
    showLoadingMessage(true);
    updateIdAndActionQueue(
      subUserId,
      activate ? Action.REACTIVATE : Action.SUSPEND
    );
    setApiParams({
      service: changeStatusSubUserService(),
      method: "post",
      dataToSend: {
        uid: subUserId,
        status: activate,
      },
    });
  }

  return {
    changeSubUserStatus,
  };
}
