import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

export default function CategoryColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
    title: t("categoryColumn"),
    dataIndex: "category",
    key: "category",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, { category }) => (
      <div style={{ textAlign: "left" }}>{category}</div>
    ),
  };
  return col;
}
