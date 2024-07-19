import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { tableHeaderTextColor } from "../../../../utilities/colors";

export default function NameColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Nombre",
    dataIndex: "title",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    render: (_, { title, category }) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {title}
          </div>
          <div
            className="text-truncate"
            style={{ textAlign: "left", color: tableHeaderTextColor }}
          >
            {category}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
