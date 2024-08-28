import { ColumnType } from "antd/es/table";
import { PurchaseOrder } from "../../../../models/MainInterfaces";
import { Flex } from "antd";

export default function UserNameColumn(
  nameColumnHeader: string,
  hidden: boolean = false
) {
  const col: ColumnType<PurchaseOrder> = {
    title: nameColumnHeader,
    dataIndex: "title",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    showSorterTooltip: false,
    render: (_, record) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {record.user.name}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
