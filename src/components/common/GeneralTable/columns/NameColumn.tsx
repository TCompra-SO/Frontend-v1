import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
  User,
} from "../../../../models/MainInterfaces";
import { TableTypes } from "../../../../utilities/types";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";

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
    case TableTypes.OFFER:
      dataIndex = "title";
      break;
    case TableTypes.USERS:
      dataIndex = "name";
      break;
  }

  const col: ColumnType<RequirementTableItem | OfferListItem | User> = {
    title: nameColumnHeader,
    dataIndex,
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => {
      if (type === TableTypes.REQUIREMENT || type === TableTypes.OFFER) {
        const aTitle = (a as OfferListItem | RequirementTableItem).title;
        const bTitle = (b as OfferListItem | RequirementTableItem).title;
        return aTitle.localeCompare(bTitle);
      } else if (type === TableTypes.USERS) {
        const aName = (a as User).name;
        const bName = (b as User).name;
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
            {(type === TableTypes.REQUIREMENT || type === TableTypes.OFFER) &&
              (record as OfferListItem | RequirementTableItem).title}
            {type === TableTypes.USERS && (record as User).name}
          </div>
          {type == TableTypes.REQUIREMENT && (
            <div
              className="text-truncate info-categoria"
              style={{ textAlign: "left" }}
            >
              {categoryData
                ? categoryData[(record as RequirementTableItem).category]?.value
                : null}
            </div>
          )}
        </div>
      </>
    ),
  };
  return col;
}
