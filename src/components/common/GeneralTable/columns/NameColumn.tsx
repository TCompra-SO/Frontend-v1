import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
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
    case TableTypes.OFFER:
      dataIndex = "title";
      break;
    case TableTypes.USERS:
      dataIndex = "name";
      break;
  }

  const col: ColumnType<RequirementTableItem | OfferListItem | SubUserProfile> =
    {
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
          const aName = (a as SubUserProfile).name;
          const bName = (b as SubUserProfile).name;
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
              {type === TableTypes.USERS && (record as SubUserProfile).name}
            </div>
            {(type == TableTypes.REQUIREMENT || type == TableTypes.USERS) && (
              <div
                className="text-truncate info-categoria"
                style={{ textAlign: "left" }}
              >
                {type == TableTypes.REQUIREMENT && categoryData
                  ? categoryData[(record as RequirementTableItem).category]
                      ?.value
                  : null}
                {type == TableTypes.USERS && <>Vendedor</>}
              </div>
            )}
          </div>
        </>
      ),
    };
  return col;
}
