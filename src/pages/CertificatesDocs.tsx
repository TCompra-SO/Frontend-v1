import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import { ModalContent, TableTypeMyDocuments } from "../models/Interfaces";
import { Action, ModalTypes, TableTypes } from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile } from "../models/MainInterfaces";
import { openDocument } from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { Row } from "antd";
import {
  useDeleteCertificate,
  useGetCertificatesList,
} from "../hooks/certificateHook";

export default function CertificatesDocs() {
  const { t } = useTranslation();
  const { certificateList, getCertificatesList, loadingCertList } =
    useGetCertificatesList();
  const { deleteCertificate, loadingDeleteCert } = useDeleteCertificate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeMyDocuments>({
    type: TableTypes.MY_DOCUMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener lista de documentos */

  useEffect(() => {
    getCertificatesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (certificateList) {
      setTableContent((prev) => {
        return {
          ...prev,
          data: certificateList,
        };
      });
    } else {
      setTableContent({
        type: TableTypes.MY_DOCUMENTS,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t("name"),
        onButtonClick: handleOnButtonClick,
      });
    }
  }, [certificateList]);

  /** Funciones */

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function openModal(action: Action) {
    switch (action) {
      case Action.ADD_CERTIFICATES:
        setDataModal({
          type: ModalTypes.ADD_CERTIFICATES,
        });
        setIsOpenModal(true);
        break;
      case Action.EDIT_DOCUMENT_LIST_TO_REQUEST:
        setDataModal({
          type: ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST,
        });
        setIsOpenModal(true);
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
      },
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
      />
    </>
  );
}
