import { useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import {
  ModalContent,
  TableTypeCertificatesReceived,
  TableTypeCertificatesSent,
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
import {
  equalServices,
  getLastSegmentFromRoute,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { pageSubRoutes } from "../utilities/routes";
import { App } from "antd";
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

const cert2: CertificationItem[] = [
  {
    companyId: "1111111",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-1",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.CERTIFIED,
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    companyId: "2222222",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-2",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.PENDING,
  },
  {
    companyId: "33333333",
    companyName: "Empresa name sac hfdskhfjshf kjhsfjkshkfs",
    companyDocument: "11111111-3",
    creationDate: "2024-09-12T20:36:45.673Z",
    state: CertificationState.REJECTED,
  },
];

export default function Certificates() {
  const location = useLocation();
  const { notification, message } = App.useApp();
  const { t } = useTranslation();
  const [type, setType] = useState(getLastSegmentFromRoute(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<
    TableTypeCertificatesReceived | TableTypeCertificatesSent
  >({
    type: TableTypes.SENT_CERT | TableTypes.RECEIVED_CERT,
    data: [],
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

  useEffect(() => {
    setType(getLastSegmentFromRoute(location.pathname));
  }, [location]);

  useEffect(() => {
    switch (type) {
      case pageSubRoutes.sent:
        setTableContent({
          type: TableTypes.SENT_CERT,
          data: cert2,
          hiddenColumns: [],
          nameColumnHeader: t("name"),
          onButtonClick: handleOnButtonClick,
        });
        break;
      case pageSubRoutes.received:
        setTableContent({
          type: TableTypes.RECEIVED_CERT,
          data: cert2,
          hiddenColumns: [],
          nameColumnHeader: t("name"),
          onButtonClick: handleOnButtonClick,
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // useEffect(() => {
  //   if (equalServices(apiParams.service, getUserService("")))
  //     if (loading) showLoadingMessage(message);
  //     else destroyMessage(message);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnButtonClick(
    action: Action,
    obj: CertificateFile | CertificationItem
  ) {
    if (type == pageSubRoutes.sent) {
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
    } else if (type == pageSubRoutes.received) {
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
          type == pageSubRoutes.received
            ? t("certifiesReceived")
            : t("certifiesSent")
        }
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        hideSearch={true}
        // loading={
        //   equalServices(apiParams.service, getRequirementsService())
        //     ? loading
        //     : undefined
        // }
      />
    </>
  );
}
