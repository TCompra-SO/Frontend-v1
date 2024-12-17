import { App } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { getCertificatesService } from "../services/requests/certificateService";
import { CertificateFile } from "../models/MainInterfaces";
import { transformToCertificateFile } from "../utilities/transform";

export function useGetCertificatesList() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const [docList, setDocList] = useState<CertificateFile[] | null>(null);
  const mainUserId = useSelector((state: MainState) => state.mainUser.uid);
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
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setDocList(
          responseData.map((doc: any) => transformToCertificateFile(doc))
        );
      } catch (err) {
        console.log(err);
        showNotification(notification, "error", t("errorOccurred"));
      } finally {
        // showLoadingMessage(message, false);
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getCertificatesList() {
    // showLoadingMessage(message, true);
    setApiParams({
      service: getCertificatesService(mainUserId),
      method: "get",
    });
  }

  return {
    getCertificatesList,
    loadingCertList: loading,
    responseDataCertList: responseData,
    errorCertList: error,
    certificateList: docList,
  };
}
