import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

export default function LocationColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
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
