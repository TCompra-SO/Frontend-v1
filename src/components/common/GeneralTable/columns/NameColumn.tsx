import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { tableHeaderTextColor } from "../../../../utilities/colors";
import { TableTypes } from "../../../../utilities/types";

export default function NameColumn(
  type: TableTypes,
  nameColumnHeader: string,
  hidden: boolean = false
) {
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
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {record.title}
          </div>
          {type == TableTypes.REQUIREMENT && (
            <div
              className="text-truncate"
              style={{ textAlign: "left", color: tableHeaderTextColor }}
            >
              {(record as RequirementTableItem).category}
            </div>
          )}
        </Flex>
      </>
    ),
  };
  return col;
}
