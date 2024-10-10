import { Flex } from "antd";
import { ColumnType } from "antd/es/table";
import { getNestedValue } from "../../../../utilities/globalFunctions";

export default function GeneralColumnString(
  nameColumn: string,
  dataIndex: string,
  truncate: boolean,
  width: number = 130,
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
            {getNestedValue(dataIndex, record)}
          </div>
        )}
        {truncate && (
          <Flex vertical>
            <div
              className="text-truncate dato-table"
              style={{ textAlign: "left" }}
            >
              {getNestedValue(dataIndex, record)}
            </div>
          </Flex>
        )}
      </>
    ),
    sorter: (a, b) =>
      getNestedValue(dataIndex, a)?.localeCompare(getNestedValue(dataIndex, b)),
    showSorterTooltip: false,
  };
  if (!truncate) col.width = width;
  return col;
}
