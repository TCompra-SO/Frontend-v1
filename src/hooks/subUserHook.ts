import { useTranslation } from "react-i18next";
import useShowNotification, { useShowLoadingMessage } from "./utilHooks";
import { useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import { changeStatusSubUserService } from "../services/requests/subUserService";
import { ChangeStatusRequest } from "../models/Requests";

export function useChangeSubUserStatus() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const [apiParams, setApiParams] = useState<useApiParams<ChangeStatusRequest>>(
    {
      service: null,
      method: "get",
    }
  );
  const { responseData, error, errorMsg, fetchData } =
    useApi<ChangeStatusRequest>(apiParams);

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
      showLoadingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function changeSubUserStatus(subUserId: string, activate: boolean) {
    showLoadingMessage(true);
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
