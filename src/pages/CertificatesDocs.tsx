import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import {
  ModalContent,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
  TableTypeMyDocuments,
  useApiParams,
} from "../models/Interfaces";
import {
  Action,
  CertificationState,
  ModalTypes,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import { CertificateFile, CertificationItem } from "../models/MainInterfaces";
import { equalServices, openDocument } from "../utilities/globalFunctions";
import ButtonContainer from "../components/containers/ButtonContainer";
import { App, Row } from "antd";
import useApi from "../hooks/useApi";
import showNotification from "../utilities/notification/showNotification";

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
  const { notification, message } = App.useApp();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent] = useState<TableTypeMyDocuments>({
    type: TableTypes.MY_DOCUMENTS,
    data: cert,
    hiddenColumns: [],
    nameColumnHeader: t("name"),
    onButtonClick: handleOnButtonClick,
  });

  // const [apiParams, setApiParams] = useState<useApiParams>({
  //   service: getOffersService(),
  //   method: "get",
  // });

  // const { loading, responseData, error, errorMsg, fetchData } = useApi({
  //   service: apiParams.service,
  //   method: apiParams.method,
  //   dataToSend: apiParams.dataToSend,
  // });

  // useEffect(() => {
  //   if (apiParams.service) fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [apiParams]);

  // useEffect(() => {
  //   if (responseData) {
  //     if (equalServices(apiParams.service, getOffersService())) setData();
  //   } else if (error) {
  //     if (equalServices(apiParams.service, getOffersService()))
  //       showNotification(notification, "error", errorMsg);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [responseData, error]);

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
        // loading={
        //   equalServices(apiParams.service, getRequirementsService())
        //     ? loading
        //     : undefined
        // }
      />
    </>
  );
}
