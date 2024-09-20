import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
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
  const { categoryList } = context;

  const col: ColumnType<RequirementTableItem | OfferListItem> = {
    title: nameColumnHeader,
    dataIndex: "title",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    render: (_, record) => (
      <>
        <div className="datos-prod">
          <div className="text-truncate info-req" style={{ textAlign: "left" }}>
            {record.title}
          </div>
          {type == TableTypes.REQUIREMENT && (
            <div
              className="text-truncate info-categoria"
              style={{ textAlign: "left" }}
            >
              {categoryList
                ? categoryList[(record as RequirementTableItem).category]?.value
                : null}
            </div>
          )}
        </div>
      </>
    ),
  };
  return col;
}
