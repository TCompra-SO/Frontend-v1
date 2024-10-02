import { ColumnType } from "antd/es/table";

export default function GeneralColumnNumber(
  nameColumn: string,
  dataIndex: string,
  hidden: boolean = false,
  width?: number
) {
  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex,
    key: dataIndex,
    align: "center",
    sorter: (a, b) => a[dataIndex] - b[dataIndex],
    showSorterTooltip: false,
    width: width ?? 75,
    hidden,
    render: (_, record) => {
      return (
        <div className="t-flex c-ofertas">
          <div
            className="oferta-cant"
            // style={{ cursor: "pointer" }}
          >
            {record[dataIndex] ?? 0}
          </div>
        </div>
      );
    },
  };
  return col;
}
