import { ColumnType } from "antd/es/table";
import { TableRecordType } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

export default function LocationColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<TableRecordType> = {
    title: t("locationColumn"),
    dataIndex: "location",
    key: "location",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: "105px",
    hidden,
    render: (_, { location }) => (
      <div style={{ textAlign: "left" }}>{location}</div>
    ),
  };
  return col;
}
