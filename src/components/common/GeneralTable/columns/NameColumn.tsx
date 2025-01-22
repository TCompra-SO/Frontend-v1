import { ColumnType } from "antd/es/table";
import {
  BaseRequirementOffer,
  BasicPurchaseOrder,
  CertificateFile,
  Requirement,
  SubUserBase,
} from "../../../../models/MainInterfaces";
import {
  PurchaseOrderTableTypes,
  TableTypes,
} from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import {
  getLabelFromRole,
  getSortOrderFromFieldSort,
} from "../../../../utilities/globalFunctions";
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
        dataIndex = "subUserNameClient";
      else dataIndex = "subUserNameProvider";
      break;
    case TableTypes.SALES_ORDER:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "userNameClient";
      else dataIndex = "userNameProvider";
      break;
    case TableTypes.ALL_SALES_ORDERS:
      if (extraParam == PurchaseOrderTableTypes.ISSUED)
        dataIndex = "subUserNameProvider";
      else dataIndex = "subUserNameClient";
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
    sorter: noSorter ? undefined : true,
    showSorterTooltip: false,
    sortOrder: getSortOrderFromFieldSort(nameColumnKey, fieldSort),
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
                  ? (record as BasicPurchaseOrder).subUserNameClient
                  : (record as BasicPurchaseOrder).subUserNameProvider)}
              {type === TableTypes.SALES_ORDER &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).userNameClient
                  : (record as BasicPurchaseOrder).userNameProvider)}
              {type === TableTypes.ALL_SALES_ORDERS &&
                (extraParam == PurchaseOrderTableTypes.ISSUED
                  ? (record as BasicPurchaseOrder).subUserNameProvider
                  : (record as BasicPurchaseOrder).subUserNameClient)}
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
