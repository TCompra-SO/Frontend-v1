import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllPurchaseOrders } from "../models/Interfaces";
import {
  Action,
  CommonFilter,
  EntityType,
  PurchaseOrderState,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { BasicPurchaseOrder, PurchaseOrder } from "../models/MainInterfaces";
import {
  equalServices,
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";

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
    filters: {
      price: CommonFilter.ASC,
      location: 12,
      deliveryTime: 2,
      warranty: CommonFilter.ALL,
    },
    requirementId: "reqid",
    offerId: "offerid",
    offerTitle: "sas  sjkdadjshfj hfjkhasj fkja fa hfkjhfjhkahfka",
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
    filters: {
      price: CommonFilter.DESC,
      location: 18,
      deliveryTime: 3,
      warranty: CommonFilter.DESC,
    },
    requirementId: "req2id",
    offerId: "offer2id",
    offerTitle: "sas  sjkdadjshfj hfjkhasj fkja fa hfkjhfjhkahfka fhkshf shfks",
  },
];
export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const [tableContent, setTableContent] = useState<TableTypeAllPurchaseOrders>({
    type: TableTypes.ALL_PURCHASE_ORDERS,
    data: purchaseOrderList, //[]
    subType: PurchaseOrderTableTypes.ISSUED,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

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
      title={t("offers")}
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
