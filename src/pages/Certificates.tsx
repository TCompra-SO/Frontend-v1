import { ChangeEvent, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle, pageSizeOptionsSt } from "../utilities/globals";
import {
  ModalContent,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
  useApiParams,
} from "../models/Interfaces";
import {
  Action,
  ModalTypes,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificationItem } from "../models/MainInterfaces";
import { getLastSegmentFromRoute } from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { pageSubRoutes } from "../utilities/routes";
import useApi from "../hooks/useApi";
import {
  getReceivedRequestsByEntityService,
  getSentRequestsByEntityService,
} from "../services/requests/certificateService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { transformToCertificationItem } from "../utilities/transform";
import useShowNotification from "../hooks/utilHooks";

export default function Certificates() {
  const location = useLocation();
  const { showNotification } = useShowNotification();
  const { t } = useTranslation();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const [type, setType] = useState(getLastSegmentFromRoute(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
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
    setType(getLastSegmentFromRoute(location.pathname));
  }, [location]);

  useEffect(() => {
    switch (type) {
      case pageSubRoutes.sent:
        setApiParamsCertif({
          service: getSentRequestsByEntityService(
            mainUserUid,
            1,
            pageSizeOptionsSt[0]
          ),
          method: "get",
        });
        break;
      case pageSubRoutes.received:
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

  /** Funciones */

  function setTableData() {
    try {
      const data: CertificationItem[] = responseDataCertif.data.map((e: any) =>
        transformToCertificationItem(e)
      );
      setTotal(responseDataCertif.res?.totalDocuments);
      setTableContent({
        type:
          type == pageSubRoutes.received
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
    if (type == pageSubRoutes.sent) {
      switch (action) {
        case Action.VIEW:
          setDataModal({
            type: ModalTypes.VIEW_DOCS_SENT_CERT,
            data: {
              docs: certificate.certificates,
              data: certificate,
              readonly: true,
            },
            action,
          });
          setIsOpenModal(true);
          break;
      }
    } else if (type == pageSubRoutes.received) {
      switch (action) {
        case Action.VIEW:
          setDataModal({
            type: ModalTypes.VIEW_DOCS_RECEIVED_CERT,
            data: {
              docs: certificate.certificates,
              data: certificate,
            },
            action,
          });
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
      case pageSubRoutes.sent:
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
      case pageSubRoutes.received:
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
          type == pageSubRoutes.received
            ? t("certifiesReceived")
            : t("certifiesSent")
        }
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        loading={loadingCertif}
        onChangePageAndPageSize={handleChangePageAndPageSize}
        total={total}
        onSearch={handleSearch}
      />
    </>
  );
}
