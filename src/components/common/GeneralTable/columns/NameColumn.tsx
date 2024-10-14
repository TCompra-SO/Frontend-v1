import { ColumnType } from "antd/es/table";
import {
  BaseRequirementOffer,
  BasicPurchaseOrder,
  Requirement,
} from "../../../../models/MainInterfaces";
import { TableTypes } from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { SubUserProfile } from "../../../../models/Responses";

export default function NameColumn(
  type: TableTypes,
  nameColumnHeader: string,
  hidden: boolean = false
) {
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
    case TableTypes.PURCHASE_ORDER:
    case TableTypes.ALL_PURCHASE_ORDERS:
      dataIndex = "user.name";
      break;
  }

  const col: ColumnType<
    SubUserProfile | BaseRequirementOffer | BasicPurchaseOrder
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
      } else if (
        type == TableTypes.PURCHASE_ORDER ||
        type == TableTypes.ALL_PURCHASE_ORDERS
      ) {
        const aName = (a as BasicPurchaseOrder).user.name;
        const bName = (b as BasicPurchaseOrder).user.name;
        return aName.localeCompare(bName);
      }
      return 0;
    },
    showSorterTooltip: false,
    render: (_, record) => (
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
            {(type === TableTypes.PURCHASE_ORDER ||
              type === TableTypes.ALL_PURCHASE_ORDERS) &&
              (record as BasicPurchaseOrder).user.name}
          </div>
          {(type == TableTypes.REQUIREMENT || type == TableTypes.USERS) && (
            <div
              className="text-truncate info-categoria"
              style={{ textAlign: "left" }}
            >
              {type == TableTypes.REQUIREMENT && categoryData
                ? categoryData[(record as Requirement).category]?.value
                : null}
              {type == TableTypes.USERS && <>Vendedor</>}
              {/** r3v*/}
            </div>
          )}
        </div>
      </>
    ),
  };
  return col;
}
