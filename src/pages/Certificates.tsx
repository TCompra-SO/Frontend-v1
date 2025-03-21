import { useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import {
  defaultErrorMsg,
  fieldNameSearchRequestCertRequests,
  mainModalScrollStyle,
} from "../utilities/globals";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
} from "../models/Interfaces";
import {
  Action,
  CertificationTableType,
  ModalTypes,
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
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { transformToCertificationItem } from "../utilities/transform";
import useShowNotification from "../hooks/utilHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import { useGetCertificationData } from "../hooks/certificateHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";

export default function Certificates() {
  const location = useLocation();
  const { t } = useTranslation();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const mainEntityType = useSelector(
    (state: MainState) => state.mainUser.typeEntity
  );
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { showNotification } = useShowNotification();
  const { viewCertificationData, resetViewCertificationData } =
    useContext(ModalsContext);
  const [type, setType] = useState(
    getCertificationTableType(getLastSegmentFromRoute(location.pathname))
  );
  const { getCertificationData, modalDataCertificationData } =
    useGetCertificationData(type);
  const [certificationRequestList, setCertificationRequestList] = useState<
    CertificationItem[]
  >([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    handleChangePageAndPageSize,
    handleSearch,
    fieldSort,
    filteredInfo,
    reset,
  } = useFilterSortPaginationForTable();
  const [tableContent, setTableContent] = useState<
    TableTypeCertificatesReceived | TableTypeCertificatesSent
  >({
    type: TableTypes.SENT_CERT | TableTypes.RECEIVED_CERT,
    data: certificationRequestList,
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useActionsForRow(
    type == CertificationTableType.SENT
      ? TableTypes.SENT_CERT
      : TableTypes.RECEIVED_CERT,
    (data: SocketDataPackType) => transformToCertificationItem(data),
    certificationRequestList,
    setCertificationRequestList,
    total,
    setTotal,
    currentPageSize
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const { searchTable, responseData, error, errorMsg, loading, apiParams } =
    useSearchTable(
      mainUserUid,
      type == CertificationTableType.SENT
        ? TableTypes.SENT_CERT
        : TableTypes.RECEIVED_CERT,
      mainEntityType,
      undefined,
      resetChangesQueue
    );
  useSocket(
    type == CertificationTableType.SENT
      ? TableTypes.SENT_CERT
      : TableTypes.RECEIVED_CERT,
    undefined,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: certificationRequestList,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificationRequestList]);

  /** Obtener lista de solicitudes de certificación */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setCertificationRequestList([]);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Obtener tipo de tabla */

  useEffect(() => {
    setType(
      getCertificationTableType(getLastSegmentFromRoute(location.pathname))
    );
  }, [location]);

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
      const data: CertificationItem[] = responseData.data.map((e: any) =>
        transformToCertificationItem(e)
      );
      setTotal(responseData.res?.totalDocuments);
      setCertificationRequestList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
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
        loading={loading}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestCertRequests,
            searchTable
          )
        }
        total={total}
        onSearch={(e) => handleSearch(e, searchTable)}
        ref={searchValueRef}
      />
    </>
  );
}
