import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import {
  ModalContent,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
  TableTypeMyDocuments,
} from "../models/Interfaces";
import {
  Action,
  CertificationState,
  ModalTypes,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile, CertificationItem } from "../models/MainInterfaces";
import {
  getLastSegmentFromRoute,
  openDocument,
} from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { Row } from "antd";
import { useLocation } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";

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

const cert2: CertificationItem[] = [
  {
    companyID: "1111111",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-1",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.CERTIFIED,
  },
  {
    companyID: "2222222",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-2",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.PENDING,
  },
  {
    companyID: "33333333",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-3",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.REJECTED,
  },
];

export default function Certificates() {
  const location = useLocation();
  const { t } = useTranslation();
  const [type, setType] = useState(getLastSegmentFromRoute(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<
    | TableTypeMyDocuments
    | TableTypeCertificatesReceived
    | TableTypeCertificatesSent
    | null
  >(
    null
    //   {
    //   type:
    //     TableTypes.MY_DOCUMENTS | TableTypes.SENT_CERT | TableTypes.RECEIVED_CERT,
    //   data: [],
    //   hiddenColumns: [],
    //   nameColumnHeader: t("name"),
    //   onButtonClick: handleOnButtonClick,
    // }
  );

  useEffect(() => {
    switch (type) {
      case pageRoutes.documents:
        setTableContent({
          type: TableTypes.MY_DOCUMENTS,
          data: cert,
          hiddenColumns: [],
          nameColumnHeader: t("name"),
          onButtonClick: handleOnButtonClick,
        });
        break;
      case pageRoutes.sent:
        setTableContent({
          type: TableTypes.SENT_CERT,
          data: cert2,
          hiddenColumns: [],
          nameColumnHeader: t("name"),
          onButtonClick: handleOnButtonClick,
        });
        break;
      case pageRoutes.received:
        setTableContent({
          type: TableTypes.RECEIVED_CERT,
          data: cert2,
          hiddenColumns: [],
          nameColumnHeader: t("name"),
          onButtonClick: handleOnButtonClick,
        });
        break;
    }
  }, [location]);

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

  function handleOnButtonClick(
    action: Action,
    obj: CertificateFile | CertificationItem
  ) {
    if (type == pageRoutes.documents) {
      const certificate = obj as CertificateFile;
      switch (action) {
        case Action.VIEW_DOCUMENT:
          openDocument(certificate.url);
          break;
        case Action.DELETE:
          console.log(certificate); //r3v
      }
    } else if (type == pageRoutes.sent) {
      const certificate = obj as CertificationItem;
      switch (action) {
        case Action.VIEW:
          setDataModal({
            type: ModalTypes.VIEW_DOCS_SENT_CERT,
            data: {
              docs: cert,
              data: certificate,
              readonly: true,
            },
          });
          setIsOpenModal(true);
          break;
      }
    } else if (type == pageRoutes.received) {
      const certificate = obj as CertificationItem;
      switch (action) {
        case Action.VIEW:
          setDataModal({
            type: ModalTypes.VIEW_DOCS_RECEIVED_CERT,
            data: {
              docs: cert,
              data: certificate,
            },
          });
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
          type == pageRoutes.documents
            ? t("myDocuments")
            : type == pageRoutes.received
            ? t("certifiesReceived")
            : t("certifiesSent")
        }
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
      />
    </>
  );
}
