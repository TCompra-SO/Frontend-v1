import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle, pageSizeOptionsSt } from "../utilities/globals";
import { ModalContent, TableTypeMyDocuments } from "../models/Interfaces";
import {
  Action,
  ModalTypes,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile } from "../models/MainInterfaces";
import { openDocument } from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { Row } from "antd";
import {
  useDeleteCertificate,
  useGetCertificatesList,
  useGetRequiredDocsCert,
} from "../hooks/certificateHook";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";

export default function CertificatesDocs() {
  const { t } = useTranslation();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const {
    certificateList,
    getCertificatesList,
    loadingCertList,
    totalCertList,
  } = useGetCertificatesList();
  const { deleteCertificate, loadingDeleteCert } = useDeleteCertificate();
  const { getRequiredDocsCert, requiredDocs } = useGetRequiredDocsCert();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeMyDocuments>({
    type: TableTypes.MY_DOCUMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
    total: totalCertList,
  });

  /** Obtener lista de documentos */

  useEffect(() => {
    getCertificatesList(1, pageSizeOptionsSt[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (certificateList) {
      setTableContent((prev) => {
        return {
          ...prev,
          data: certificateList,
          total: totalCertList,
        };
      });
    } else {
      setTableContent({
        type: TableTypes.MY_DOCUMENTS,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t("name"),
        onButtonClick: handleOnButtonClick,
        total: totalCertList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateList]);

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
        deleteDoc(certificate.uid);
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

  function handleChangePageAndPageSize({
    page,
    pageSize,
  }: OnChangePageAndPageSizeTypeParams) {
    getCertificatesList(page, pageSize);
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
        subtitle={t("myDocuments")}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        hideSearch={true}
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
        loading={loadingCertList}
        onChangePageAndPageSize={handleChangePageAndPageSize}
      />
    </>
  );
}
