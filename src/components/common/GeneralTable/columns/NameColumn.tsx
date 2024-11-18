import { ColumnType } from "antd/es/table";
import {
  BaseRequirementOffer,
  BasicPurchaseOrder,
  CertificateFile,
  Requirement,
} from "../../../../models/MainInterfaces";
import {
  PurchaseOrderTableTypes,
  TableTypes,
} from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { SubUserProfile } from "../../../../models/Responses";
import { getLabelFromRole } from "../../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";

export default function NameColumn(
  type: TableTypes,
  nameColumnHeader: string,
  hidden: boolean = false,
  extraParam?: any
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
      if (
        extraParam == PurchaseOrderTableTypes.ISSUED ||
        extraParam == PurchaseOrderTableTypes.ISSUED_SALES
      )
        dataIndex = "userNameProvider";
      else dataIndex = "userNameClient";
      break;
    case TableTypes.ALL_PURCHASE_ORDERS:
      if (
        extraParam == PurchaseOrderTableTypes.ISSUED ||
        extraParam == PurchaseOrderTableTypes.ISSUED_SALES
      )
        dataIndex = "subUserNameProvider";
      else dataIndex = "subUserNameClient";
      break;
  }

  const col: ColumnType<
    SubUserProfile | BaseRequirementOffer | BasicPurchaseOrder | CertificateFile
  > = {
    title: nameColumnHeader,
    dataIndex,
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => {
      if (
        type === TableTypes.REQUIREMENT ||
        type === TableTypes.OFFER ||
        type === TableTypes.ALL_OFFERS ||
        type === TableTypes.ALL_REQUIREMENTS
      ) {
        const aTitle = (a as BaseRequirementOffer).title;
        const bTitle = (b as BaseRequirementOffer).title;
        return aTitle.localeCompare(bTitle);
      } else if (type === TableTypes.USERS) {
        const aName = (a as SubUserProfile).name;
        const bName = (b as SubUserProfile).name;
        return aName.localeCompare(bName);
      } else if (type === TableTypes.MY_DOCUMENTS) {
        const aName = (a as CertificateFile).name;
        const bName = (b as CertificateFile).name;
        return aName.localeCompare(bName);
      } else if (type == TableTypes.PURCHASE_ORDER) {
        if (
          extraParam == PurchaseOrderTableTypes.ISSUED ||
          extraParam == PurchaseOrderTableTypes.ISSUED_SALES
        ) {
          const aName = (a as BasicPurchaseOrder).userNameProvider;
          const bName = (b as BasicPurchaseOrder).userNameProvider;
          return aName.localeCompare(bName);
        } else {
          const aName = (a as BasicPurchaseOrder).userNameClient;
          const bName = (b as BasicPurchaseOrder).userNameClient;
          return aName.localeCompare(bName);
        }
      } else if (type == TableTypes.ALL_PURCHASE_ORDERS) {
        if (
          extraParam == PurchaseOrderTableTypes.ISSUED ||
          extraParam == PurchaseOrderTableTypes.ISSUED_SALES
        ) {
          const aName = (a as BasicPurchaseOrder).subUserNameProvider;
          const bName = (b as BasicPurchaseOrder).subUserNameProvider;
          return aName.localeCompare(bName);
        } else {
          const aName = (a as BasicPurchaseOrder).subUserNameClient;
          const bName = (b as BasicPurchaseOrder).subUserNameClient;
          return aName.localeCompare(bName);
        }
      }
      return 0;
    },
    showSorterTooltip: false,
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
              {type === TableTypes.USERS && (record as SubUserProfile).name}
              {type === TableTypes.MY_DOCUMENTS &&
                (record as CertificateFile).name}
              {type === TableTypes.PURCHASE_ORDER &&
                (extraParam == PurchaseOrderTableTypes.ISSUED ||
                extraParam == PurchaseOrderTableTypes.ISSUED_SALES
                  ? (record as BasicPurchaseOrder).userNameProvider
                  : (record as BasicPurchaseOrder).userNameClient)}
              {type === TableTypes.ALL_PURCHASE_ORDERS &&
                (extraParam == PurchaseOrderTableTypes.ISSUED ||
                extraParam == PurchaseOrderTableTypes.ISSUED_SALES
                  ? (record as BasicPurchaseOrder).subUserNameProvider
                  : (record as BasicPurchaseOrder).subUserNameClient)}
            </div>
            {(type == TableTypes.REQUIREMENT || type == TableTypes.USERS) && (
              <div
                className="text-truncate info-categoria"
                style={{ textAlign: "left" }}
              >
                {type == TableTypes.REQUIREMENT && categoryData
                  ? categoryData[(record as Requirement).category]?.value
                  : null}
                {type == TableTypes.USERS &&
                  t(getLabelFromRole((record as SubUserProfile).typeID))}
              </div>
            )}
          </div>
        </>
      );
    },
  };
  return col;
}
