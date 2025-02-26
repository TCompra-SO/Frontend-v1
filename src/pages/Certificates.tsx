import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle, pageSizeOptionsSt } from "../utilities/globals";
import {
  ModalContent,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
  useApiParams,
} from "../models/Interfaces";
import {
  Action,
  CertificationTableType,
  ModalTypes,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificationItem } from "../models/MainInterfaces";
import {
  getCertificationTableType,
  getInitialModalData,
  getLastSegmentFromRoute,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import {
  getReceivedRequestsByEntityService,
  getSentRequestsByEntityService,
} from "../services/requests/certificateService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { transformToCertificationItem } from "../utilities/transform";
import useShowNotification from "../hooks/utilHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import { useGetCertificationData } from "../hooks/certificateHooks";

export default function Certificates() {
  const location = useLocation();
  const { t } = useTranslation();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { showNotification } = useShowNotification();
  const { viewCertificationData, resetViewCertificationData } =
    useContext(ModalsContext);
  const [type, setType] = useState(
    getCertificationTableType(getLastSegmentFromRoute(location.pathname))
  );
  const { getCertificationData, modalDataCertificationData } =
    useGetCertificationData(type);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const [tableContent, setTableContent] = useState<
    TableTypeCertificatesReceived | TableTypeCertificatesSent
  >({
    type: TableTypes.SENT_CERT | TableTypes.RECEIVED_CERT,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
    total,
  });

  /** Obtener lista de solicitudes de certificación */

  const [apiParamsCertif, setApiParamsCertif] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingCertif,
    responseData: responseDataCertif,
    error: errorCertif,
    errorMsg: errorMsgCertif,
    fetchData: fetchDataCertif,
  } = useApi({
    service: apiParamsCertif.service,
    method: apiParamsCertif.method,
    dataToSend: apiParamsCertif.dataToSend,
  });

  useEffect(() => {
    if (apiParamsCertif.service) fetchDataCertif();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsCertif]);

  useEffect(() => {
    if (responseDataCertif) {
      setTableData();
    } else if (errorCertif) {
      setTotal(0);
      setTableContent({
        type: TableTypes.SENT_CERT | TableTypes.RECEIVED_CERT,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t("name"),
        onButtonClick: handleOnButtonClick,
        total,
      });
      showNotification("error", errorMsgCertif);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataCertif, errorCertif]);

  /** Obtener tipo de tabla */

  useEffect(() => {
    setType(
      getCertificationTableType(getLastSegmentFromRoute(location.pathname))
    );
  }, [location]);

  useEffect(() => {
    clearSearchValue();
    switch (type) {
      case CertificationTableType.SENT:
        setApiParamsCertif({
          service: getSentRequestsByEntityService(
            mainUserUid,
            1,
            pageSizeOptionsSt[0]
          ),
          method: "get",
        });
        break;
      case CertificationTableType.RECEIVED:
        setApiParamsCertif({
          service: getReceivedRequestsByEntityService(
            mainUserUid,
            1,
            pageSizeOptionsSt[0]
          ),
          method: "get",
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (viewCertificationData.certificationId) {
      const copy = { ...viewCertificationData };
      getCertificationData(copy.certificationId, undefined);
      resetViewCertificationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCertificationData]);

  useEffect(() => {
    if (modalDataCertificationData.type !== ModalTypes.NONE) {
      setDataModal(modalDataCertificationData);
      setIsOpenModal(true);
    }
  }, [modalDataCertificationData]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  function setTableData() {
    try {
      const data: CertificationItem[] = responseDataCertif.data.map((e: any) =>
        transformToCertificationItem(e)
      );
      console.log(data);
      setTotal(responseDataCertif.res?.totalDocuments);
      setTableContent({
        type:
          type == CertificationTableType.RECEIVED
            ? TableTypes.RECEIVED_CERT
            : TableTypes.SENT_CERT,
        data,
        hiddenColumns: [],
        nameColumnHeader: t("name"),
        onButtonClick: handleOnButtonClick,
        total,
      });
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnButtonClick(action: Action, certificate: CertificationItem) {
    if (type == CertificationTableType.SENT) {
      switch (action) {
        case Action.VIEW:
          setIsOpenModal(true);
          getCertificationData(certificate.key, certificate);
          break;
      }
    } else if (type == CertificationTableType.RECEIVED) {
      switch (action) {
        case Action.VIEW:
          getCertificationData(certificate.key, certificate);
          setIsOpenModal(true);
          break;
      }
    }
  }

  function handleChangePageAndPageSize({
    page,
    pageSize,
    filters,
    extra,
  }: OnChangePageAndPageSizeTypeParams) {
    switch (type) {
      case CertificationTableType.SENT:
        if (!filters || (filters && filters.state === null)) {
          setApiParamsCertif({
            service: getSentRequestsByEntityService(
              mainUserUid,
              page,
              pageSize
            ),
            method: "get",
          });
        } else if (filters && filters.state) {
          setTotal(extra?.currentDataSource.length ?? 0);
        }
        break;
      case CertificationTableType.RECEIVED:
        if (!filters || (filters && filters.state === null)) {
          setApiParamsCertif({
            service: getReceivedRequestsByEntityService(
              mainUserUid,
              page,
              pageSize
            ),
            method: "get",
          });
        } else if (filters && filters.state) {
          setTotal(extra?.currentDataSource.length ?? 0);
        }
        break;
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />
      <TablePageContent
        title={t("certificates")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={
          type == CertificationTableType.RECEIVED
            ? t("certifiesReceived")
            : t("certifiesSent")
        }
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        loading={loadingCertif}
        onChangePageAndPageSize={handleChangePageAndPageSize}
        total={total}
        onSearch={handleSearch}
        ref={searchValueRef}
      />
    </>
  );
}
