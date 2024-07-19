import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";

export default function DateColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    align: "center",
    showSorterTooltip: false,
    ellipsis: true,
    width: "120px",
    hidden,
  };
  return col;
}
