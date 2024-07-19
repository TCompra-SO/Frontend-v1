import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";

export default function PriceColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Cotización",
    dataIndex: "price",
    align: "center",
    key: "price",
    hidden,
    render: (_, record) => (
      <div style={{ textAlign: "left" }}>
        {record.coin} {record.price}
      </div>
    ),
    sorter: (a, b) => a.price - b.price,
    showSorterTooltip: false,
    width: "120px",
  };
  return col;
}
