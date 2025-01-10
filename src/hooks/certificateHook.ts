import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  getCertificatesService,
  getRequiredDocumentsService,
  updateRequiredDocumentsService,
} from "../services/requests/certificateService";
import { CertificateFile } from "../models/MainInterfaces";
import {
  transformToCertificateFile,
  transformToRequiredDocsCert,
} from "../utilities/transform";
import {
  deleteCertificateById,
  verifyCertificationByUserIdAndCompanyId,
} from "../services/complete/generalServices";
import { UpdateRequiredDocsRequest } from "../models/Requests";
import useShowNotification, { useShowLoadingMessage } from "./utilHook";

export function useGetCertificatesList() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [total, setTotal] = useState(0);
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
    return () => {
      console.log("destroying modaldd");
    };
  }, []);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      try {
        setTotal(responseData.res?.totalDocuments);
        setDocList(
          responseData.data.map((doc: any) => transformToCertificateFile(doc))
        );
      } catch (err) {
        console.log(err);
        showNotification("error", t("errorOccurred"));
        setTotal(0);
      } finally {
        // showLoadingMessage( false);
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getCertificatesList(page: number, pageSize: number) {
    // showLoadingMessage( true);
    setApiParams({
      service: getCertificatesService(mainUserId, page, pageSize),
      method: "get",
    });
  }

  return {
    getCertificatesList,
    loadingCertList: loading,
    responseDataCertList: responseData,
    errorCertList: error,
    certificateList: docList,
    totalCertList: total,
  };
}

export function useDeleteCertificate() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  async function deleteCertificate(certId: string) {
    // showLoadingMessage( true);
    setLoading(true);
    const { responseData, error, errorMsg } = await deleteCertificateById(
      certId
    );
    if (responseData)
      showNotification("success", t("documentDeletedSuccessfully"));
    else if (error) showNotification("error", errorMsg);
    // showLoadingMessage( false);
    setLoading(false);
  }

  return {
    deleteCertificate,
    loadingDeleteCert: loading,
  };
}

export function useVerifyCertification() {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  async function verifyCertification(
    userId: string,
    companyIdToVerify: string
  ) {
    setLoading(true);
    const { certState } = await verifyCertificationByUserIdAndCompanyId(
      userId,
      companyIdToVerify
    );
    setLoading(false);
    return certState;
  }

  return {
    verifyCertification,
    loadingVerifyCert: loading,
  };
}

export function useGetRequiredDocsCert() {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const [requiredDocs, setRequiredDocs] = useState<string | null>(null);
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
    showLoadingMessage(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      try {
        setRequiredDocs(
          transformToRequiredDocsCert(responseData).requiredDocuments ?? ""
        );
      } catch (err) {
        console.log(err);
        showNotification("error", t("errorOccurred"));
      }
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getRequiredDocsCert(companyId: string) {
    setRequiredDocs(null);
    setApiParams({
      service: getRequiredDocumentsService(companyId),
      method: "get",
    });
  }

  return {
    getRequiredDocsCert,
    loadingRequiredDocs: loading,
    requiredDocs,
    errorRequiredDocs: error,
  };
}

export function useUpdateRequiredDocsCert() {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
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
    showLoadingMessage(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      showNotification("success", t("dataSavedSuccessfully"));
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function updateRequiredDocsCert(companyId: string, newText: string) {
    const data: UpdateRequiredDocsRequest = {
      companyID: companyId,
      requiredDocuments: newText,
    };
    setApiParams({
      service: updateRequiredDocumentsService(),
      method: "post",
      dataToSend: data,
    });
  }

  return {
    updateRequiredDocsCert,
    loadingUpdateRequiredDocs: loading,
  };
}
