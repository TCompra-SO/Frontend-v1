import { ColumnType } from "antd/es/table";
import {
  BaseRequirementOffer,
  BasicPurchaseOrder,
  CertificateFile,
  Requirement,
  SubUserBase,
} from "../../../../models/MainInterfaces";
import {
  OrderType,
  PurchaseOrderTableTypes,
  TableTypes,
} from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { getLabelFromRole } from "../../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { nameColumnKey } from "../../../../utilities/globals";
import { FieldSort } from "../../../../models/Requests";

export default function NameColumn(
  type: TableTypes,
  nameColumnHeader: string,
  hidden: boolean = false,
  fieldSort?: FieldSort,
  extraParam?: any,
  noSorter?: boolean
) {
  console.log(fieldSort);
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { categoryData } = context;
  let dataIndex = "title";
  switch (type) {
    case TableTypes.REQUIREMENT:
    case TableTypes.ALL_REQUIREMENTS:
    case TableTypes.OFFER:
    case TableTypes.ALL_OFFERS:
      dataIndex = "title";
      break;
    case TableTypes.USERS:
      dataIndex = "name";
      break;
    case TableTypes.MY_DOCUMENTS:
      dataIndex = "name";
      break;
    case TableTypes.PURCHASE_ORDER:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "userNameProvider";
      else dataIndex = "userNameClient";
      break;
    case TableTypes.ALL_PURCHASE_ORDERS:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "subUserNameProvider";
      else dataIndex = "subUserNameClient";
      break;
    case TableTypes.SALES_ORDER:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "userNameClient";
      else dataIndex = "userNameProvider";
      break;
    case TableTypes.ALL_SALES_ORDERS:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "subUserNameClient";
      else dataIndex = "subUserNameProvider";
      break;
  }

  const col: ColumnType<
    SubUserBase | BaseRequirementOffer | BasicPurchaseOrder | CertificateFile
  > = {
    title: nameColumnHeader,
    dataIndex,
    key: nameColumnKey,
    align: "center",
    hidden,
    // sortDirections: ["ascend", "descend"],
    sorter: true,
    // sorter: noSorter
    //   ? undefined
    //   : (a, b) => {
    //       if (
    //         type === TableTypes.REQUIREMENT ||
    //         type === TableTypes.OFFER ||
    //         type === TableTypes.ALL_OFFERS ||
    //         type === TableTypes.ALL_REQUIREMENTS
    //       ) {
    //         const aTitle = (a as BaseRequirementOffer).title;
    //         const bTitle = (b as BaseRequirementOffer).title;
    //         return aTitle.localeCompare(bTitle);
    //       } else if (type === TableTypes.USERS) {
    //         const aName = (a as SubUserBase).name;
    //         const bName = (b as SubUserBase).name;
    //         return aName.localeCompare(bName);
    //       } else if (type === TableTypes.MY_DOCUMENTS) {
    //         const aName = (a as CertificateFile).name;
    //         const bName = (b as CertificateFile).name;
    //         return aName.localeCompare(bName);
    //       } else if (type == TableTypes.PURCHASE_ORDER) {
    //         if (extraParam == PurchaseOrderTableTypes.ISSUED) {
    //           const aName = (a as BasicPurchaseOrder).userNameProvider;
    //           const bName = (b as BasicPurchaseOrder).userNameProvider;
    //           return aName.localeCompare(bName);
    //         } else {
    //           const aName = (a as BasicPurchaseOrder).userNameClient;
    //           const bName = (b as BasicPurchaseOrder).userNameClient;
    //           return aName.localeCompare(bName);
    //         }
    //       } else if (type == TableTypes.ALL_PURCHASE_ORDERS) {
    //         if (extraParam == PurchaseOrderTableTypes.ISSUED) {
    //           const aName = (a as BasicPurchaseOrder).subUserNameProvider;
    //           const bName = (b as BasicPurchaseOrder).subUserNameProvider;
    //           return aName.localeCompare(bName);
    //         } else {
    //           const aName = (a as BasicPurchaseOrder).subUserNameClient;
    //           const bName = (b as BasicPurchaseOrder).subUserNameClient;
    //           return aName.localeCompare(bName);
    //         }
    //       } else if (type == TableTypes.SALES_ORDER) {
    //         if (extraParam == PurchaseOrderTableTypes.ISSUED) {
    //           const aName = (a as BasicPurchaseOrder).userNameClient;
    //           const bName = (b as BasicPurchaseOrder).userNameClient;
    //           return aName.localeCompare(bName);
    //         } else {
    //           const aName = (a as BasicPurchaseOrder).userNameProvider;
    //           const bName = (b as BasicPurchaseOrder).userNameProvider;
    //           return aName.localeCompare(bName);
    //         }
    //       } else if (type == TableTypes.ALL_SALES_ORDERS) {
    //         if (extraParam == PurchaseOrderTableTypes.ISSUED) {
    //           const aName = (a as BasicPurchaseOrder).subUserNameClient;
    //           const bName = (b as BasicPurchaseOrder).subUserNameClient;
    //           return aName.localeCompare(bName);
    //         } else {
    //           const aName = (a as BasicPurchaseOrder).subUserNameProvider;
    //           const bName = (b as BasicPurchaseOrder).subUserNameProvider;
    //           return aName.localeCompare(bName);
    //         }
    //       }
    //       return 0;
    //     },
    showSorterTooltip: false,
    sortOrder:
      fieldSort?.fieldName == nameColumnKey
        ? fieldSort?.orderType == OrderType.ASC
          ? "ascend"
          : "descend"
        : undefined,
    render: (_, record) => {
      return (
        <>
          <div className="datos-prod">
            <div
              className="text-truncate info-req-no-clamp"
              style={{ textAlign: "left" }}
            >
              {(type === TableTypes.REQUIREMENT ||
                type === TableTypes.OFFER ||
                type === TableTypes.ALL_OFFERS ||
                type === TableTypes.ALL_REQUIREMENTS) &&
                (record as BaseRequirementOffer).title}
              {type === TableTypes.USERS && (record as SubUserBase).name}
              {type === TableTypes.MY_DOCUMENTS &&
                (record as CertificateFile).name}
              {type === TableTypes.PURCHASE_ORDER &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).userNameProvider
                  : (record as BasicPurchaseOrder).userNameClient)}
              {type === TableTypes.ALL_PURCHASE_ORDERS &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).subUserNameProvider
                  : (record as BasicPurchaseOrder).subUserNameClient)}
              {type === TableTypes.SALES_ORDER &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).userNameClient
                  : (record as BasicPurchaseOrder).userNameProvider)}
              {type === TableTypes.ALL_SALES_ORDERS &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).subUserNameClient
                  : (record as BasicPurchaseOrder).subUserNameProvider)}
            </div>
            {(type == TableTypes.REQUIREMENT ||
              type == TableTypes.USERS ||
              type == TableTypes.ALL_REQUIREMENTS) && (
              <div
                className="text-truncate info-categoria"
                style={{ textAlign: "left" }}
              >
                {(type == TableTypes.REQUIREMENT ||
                  type == TableTypes.ALL_REQUIREMENTS) &&
                categoryData
                  ? categoryData[(record as Requirement).category]?.value
                  : null}
                {type == TableTypes.USERS &&
                  t(getLabelFromRole((record as SubUserBase).typeID))}
              </div>
            )}
          </div>
        </>
      );
    },
  };
  return col;
}
