import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllPurchaseOrders } from "../models/Interfaces";
import {
  Action,
  CommonFilter,
  PurchaseOrderState,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { BasicPurchaseOrder, PurchaseOrder } from "../models/MainInterfaces";
import {
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { App } from "antd";

const purchaseOrderList: PurchaseOrder[] = [
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    type: RequirementType.GOOD,
    key: "111",
    filters: {
      price: CommonFilter.ASC,
      location: 12,
      deliveryTime: 2,
      warranty: CommonFilter.ALL,
    },
    requirementId: "req2id",
    offerId: "offer2id",
    offerTitle: "sas  sjkdadjshfj hfjkhasj fkja fa hfkjhfjhkahfka fhkshf shfks",
    userClientId: "123",
    userNameClient: "hhhhhhh ddddddd sssssssssss",
    subUserClientId: "123",
    subUserNameClient: "hhhhhhh ddddddd sssssssssss",
    addressClient: "fdsf dfdf d",
    documentClient: "12324345",
    userProviderId: "5555",
    userNameProvider: "aaaaa dda ssasass",
    subUserProviderId: "5555",
    subUserNameProvider: "aaaaa dda ssasass",
    addressProvider: "djkhj fjd hfjkdsh fdks",
    documentProvider: "1231545",
    emailProvider: "la.j89939",
    deliveryDate: "23-45-2490",
    price: 0,
    subTotal: 0,
    igv: 0,
    total: 0,
  },
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.CANCELED,
    type: RequirementType.GOOD,

    key: "ssssssssss",
    filters: {
      price: CommonFilter.DESC,
      location: 18,
      deliveryTime: 3,
      warranty: CommonFilter.DESC,
    },
    requirementId: "req2id",
    offerId: "offer2id",
    offerTitle: "sas  sjkdadjshfj hfjkhasj fkja fa hfkjhfjhkahfka fhkshf shfks",
    userClientId: "123",
    userNameClient: "hhhhhhh ddddddd sssssssssss",
    subUserClientId: "123",
    subUserNameClient: "hhhhhhh ddddddd sssssssssss",
    addressClient: "fdsf dfdf d",
    documentClient: "12324345",
    userProviderId: "5555",
    userNameProvider: "aaaaa dda ssasass",
    subUserProviderId: "5555",
    subUserNameProvider: "aaaaa dda ssasass",
    addressProvider: "djkhj fjd hfjkdsh fdks",
    documentProvider: "1231545",
    emailProvider: "la.j89939",
    deliveryDate: "23-45-2490",
    price: 0,
    subTotal: 0,
    igv: 0,
    total: 0,
  },
];
export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const { notification, message } = App.useApp();
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const [tableContent, setTableContent] = useState<TableTypeAllPurchaseOrders>({
    type: TableTypes.ALL_PURCHASE_ORDERS,
    data: purchaseOrderList, //[]
    subType: PurchaseOrderTableTypes.ISSUED,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
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
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
      };
    });
  }, [type]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(
    action: Action,
    purchaseOrder: BasicPurchaseOrder
  ) {}

  return (
    <TablePageContent
      title={t("purchaseOrders")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")} ${t(
        getLabelFromPurchaseOrderType(type, true, false)
      )}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={handleSearch}
      // loading={
      //   equalServices(apiParams.service, getRequirementsService())
      //     ? loading
      //     : undefined
      // }
    />
  );
}
