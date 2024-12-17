import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import { ModalContent, TableTypeMyDocuments } from "../models/Interfaces";
import {
  Action,
  CertificationState,
  ModalTypes,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile } from "../models/MainInterfaces";
import { openDocument } from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { Row } from "antd";
import { useGetCertificatesList } from "../hooks/certificateHook";

const cert: CertificateFile[] = [
  {
    name: "sadasd dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka ",
    documentName:
      "ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds.jpeg",
    url: "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
    state: CertificationState.CERTIFIED,
  },
  {
    name: "ddddddddd ssssssssssssss sss ssssssssss",
    documentName: "dummy.pdf",
    url: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
    state: CertificationState.REJECTED,
  },
  {
    name: "ddddddddd ssssssssssssss sss ssssssssss",
    documentName: "dummy.pdf",
    url: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
    state: CertificationState.PENDING,
  },
];

export default function CertificatesDocs() {
  const { t } = useTranslation();
  const { certificateList, getCertificatesList, loadingCertList } =
    useGetCertificatesList();
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
  }, []);

  useEffect(() => {
    if (certificateList) {
      setTableContent((prev) => {
        return {
          ...prev,
          data: certificateList,
        };
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
    // const certificate = obj as CertificateFile;
    switch (action) {
      case Action.VIEW_DOCUMENT:
        openDocument(certificate.url);
        break;
      case Action.DELETE:
        console.log(certificate); //r3v
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
