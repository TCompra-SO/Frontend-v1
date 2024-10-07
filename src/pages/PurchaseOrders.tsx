import { PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderState,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
  EntityType,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  TableTypePurchaseOrder,
  useApiParams,
} from "../models/Interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import { getUserService } from "../services/authService";
import { App } from "antd";
import showNotification, {
  destroyMessage,
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { equalServices } from "../utilities/globalFunctions";
import { transformToFullUser } from "../utilities/transform";

const purchaseOrderList: PurchaseOrder[] = [
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    type: RequirementType.GOOD,
    user: {
      uid: "9i2lEIp4rFRnQXkM5GLv",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
    subUser: {
      uid: "9i2lEIp4rFRnQXkM5GLv",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "998989898",
      customerCount: 0,
      sellerCount: 0,
    },
    key: "111",
  },
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "9i2lEIp4rFRnQXkM5GLv",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      typeEntity: EntityType.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "90909090",
      customerCount: 0,
      sellerCount: 0,
    },
    key: "ssssssssss",
  },
];

export default function PurchaseOrders() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: purchaseOrderList,
    subType: PurchaseOrderTableTypes.ISSUED,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
  });
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (equalServices(apiParams.service, getUserService("")))
      if (loading) showLoadingMessage(message);
      else destroyMessage(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getUserService("")))
        showUserInfo(responseData);
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function showUserInfo(responseData: any) {
    console.log(responseData);
    const user = transformToFullUser(responseData);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
    });
    setIsOpenModal(true);
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    switch (action) {
      case Action.VIEW_CUSTOMER:
      case Action.VIEW_SUPPLIER:
        setApiParams({
          service: getUserService(purchaseOrder.user.uid),
          method: "get",
        });

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
      />
      <TablePageContent
        title={t("myPurchaseOrders")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t("purchaseOrders")}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
      />
    </>
  );
}
