import { useEffect, useRef, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import {
  fieldNameSearchRequestMyDocsCert,
  mainModalScrollStyle,
} from "../utilities/globals";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeMyDocuments,
} from "../models/Interfaces";
import { Action, ModalTypes, TableTypes } from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile } from "../models/MainInterfaces";
import {
  getInitialModalData,
  openDocument,
} from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { Row } from "antd";
import {
  useDeleteCertificate,
  useGetRequiredDocsCert,
} from "../hooks/certificateHooks";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, {
  useAddOrUpdateRow,
} from "../hooks/socketQueueHook";
import { transformToCertificateFile } from "../utilities/transform";
import useSocket from "../socket/useSocket";
import useShowNotification from "../hooks/utilHooks";

export default function CertificatesDocs() {
  const { t } = useTranslation();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const mainEntityType = useSelector(
    (state: MainState) => state.mainUser.typeEntity
  );
  const { deleteCertificate, loadingDeleteCert } = useDeleteCertificate();
  const { getRequiredDocsCert, requiredDocs } = useGetRequiredDocsCert();
  const { showNotification } = useShowNotification();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const [certificateList, setCertificateList] = useState<CertificateFile[]>([]);
  const [total, setTotal] = useState(0);
  const searchValueRef = useRef<TablePageContentRef>(null);
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
  const [tableContent, setTableContent] = useState<TableTypeMyDocuments>({
    type: TableTypes.MY_DOCUMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useAddOrUpdateRow(
    TableTypes.MY_DOCUMENTS,
    (data: SocketDataPackType) => transformToCertificateFile(data),
    certificateList,
    setCertificateList,
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
      TableTypes.MY_DOCUMENTS,
      mainEntityType,
      undefined,
      resetChangesQueue
    );
  useSocket(
    TableTypes.MY_DOCUMENTS,
    undefined,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: certificateList,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateList]);

  /** Cargar datos iniciales */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setCertificateList([]);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Mostrar lista de documentos requeridos */

  useEffect(() => {
    if (requiredDocs !== null) {
      setDataModal({
        type: ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST,
        data: {
          text: requiredDocs,
        },
        action: Action.EDIT_DOCUMENT_LIST_TO_REQUEST,
      });
      setIsOpenModal(true);
    }
  }, [requiredDocs]);

  /** Funciones */

  function setTableData() {
    try {
      const data = responseData.data.map((e: any) =>
        transformToCertificateFile(e)
      );
      setTotal(responseData.res?.totalDocuments);
      setCertificateList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function openModal(action: Action) {
    switch (action) {
      case Action.ADD_CERTIFICATES:
        setDataModal({
          type: ModalTypes.ADD_CERTIFICATES,
          action,
        });
        setIsOpenModal(true);
        break;
      case Action.EDIT_DOCUMENT_LIST_TO_REQUEST:
        getRequiredDocsCert(mainUserUid);
        break;
    }
  }

  function handleOnButtonClick(action: Action, certificate: CertificateFile) {
    switch (action) {
      case Action.VIEW_DOCUMENT:
        openDocument(certificate.url);
        break;
      case Action.DELETE:
        deleteDoc(certificate.key);
        break;
    }
  }

  function deleteDoc(uid: string) {
    setDataModal({
      type: ModalTypes.CONFIRM,
      data: {
        loading: loadingDeleteCert,
        onAnswer: async (ok: boolean) => {
          if (!ok) return;
          await deleteCertificate(uid);
          setIsOpenModal(false);
        },
        text: t("deleteDocumentConfirmation"),
        id: uid,
      },
      action: Action.DELETE,
    });
    setIsOpenModal(true);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
        loadingConfirm={loadingDeleteCert}
      />
      <TablePageContent
        title={t("certificates")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={t("myDocuments")}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearch(e, searchTable)}
        additionalContentHeader={
          <Row gutter={[10, 10]}>
            <ButtonContainer
              common
              className="btn btn-default"
              onClick={() => openModal(Action.ADD_CERTIFICATES)}
              style={{ marginRight: "10px" }}
            >
              <i className="fas fa-certificate"></i> {t("addCertificates")}
            </ButtonContainer>

            <ButtonContainer
              common
              className="btn btn-default"
              onClick={() => openModal(Action.EDIT_DOCUMENT_LIST_TO_REQUEST)}
            >
              <i className="fas fa-list-alt"></i>{" "}
              {t("listOfDocumentsToRequest")}
            </ButtonContainer>
          </Row>
        }
        loading={loading}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestMyDocsCert,
            searchTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
