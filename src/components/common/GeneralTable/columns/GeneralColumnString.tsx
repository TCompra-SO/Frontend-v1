import { Flex } from "antd";
import { ColumnType } from "antd/es/table";

export default function GeneralColumnString(
  nameColumn: string,
  dataIndex: string,
  truncate: boolean,
  width: number,
  hidden: boolean = false
) {
  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex,
    align: "center",
    key: dataIndex,
    hidden,
    render: (_, record) => (
      <>
        {!truncate && (
          <div style={{ textAlign: "left" }} className={`t-flex dato-table`}>
            {record[dataIndex]}
          </div>
        )}
        {truncate && (
          <Flex vertical>
            <div
              className="text-truncate dato-table"
              style={{ textAlign: "left" }}
            >
              {record[dataIndex]}
            </div>
          </Flex>
        )}
      </>
    ),
    sorter: (a, b) => a[dataIndex].localeCompare(b[dataIndex]),
    showSorterTooltip: false,
  };
  if (!truncate) col.width = width;
  return col;
}
