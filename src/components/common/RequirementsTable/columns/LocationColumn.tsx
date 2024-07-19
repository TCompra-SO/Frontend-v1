import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";

export default function LocationColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Departmento",
    dataIndex: "location",
    key: "location",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, { location }) => (
      <div style={{ textAlign: "left" }}>{location}</div>
    ),
  };
  return col;
}
