import { ColumnType } from "antd/es/table";
import {
  BasicRequirement,
  Requirement,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { categoryColumnKey } from "../../../../utilities/globals";

export default function CategoryColumn(hidden: boolean = false) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { categoryData } = context;

  const col: ColumnType<Requirement | BasicRequirement> = {
    title: t("categoryColumn"),
    dataIndex: "category",
    key: categoryColumnKey,
    align: "center",
    sorter: (a, b) =>
      categoryData[a.category]?.value.localeCompare(
        categoryData[b.category]?.value
      ),
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, record) => {
      return (
        <div style={{ textAlign: "left" }}>
          {categoryData[record.category]?.value ?? null}
        </div>
      );
    },
  };
  return col;
}
