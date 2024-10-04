import { ColumnType } from "antd/es/table";
import { Requirement } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";

export default function CategoryColumn(
  type: TableTypes,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<Requirement> = {
    title: t("categoryColumn"),
    dataIndex: "category",
    key: "category",
    align: "center",
    sorter:
      type == TableTypes.REQUIREMENT
        ? (a, b) => a.title.localeCompare(b.title)
        : undefined,
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, record) => {
      if (type == TableTypes.REQUIREMENT)
        return (
          <div style={{ textAlign: "left" }}>
            {(record as Requirement).category}
          </div>
        );
      else return null;
    },
  };
  return col;
}
