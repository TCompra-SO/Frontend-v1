import { ColumnType } from "antd/es/table";
import {
  RequirementTableItem,
  TableRecordType,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";

export default function CategoryColumn(
  type: TableTypes,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<TableRecordType> = {
    title: t("categoryColumn"),
    dataIndex: "category",
    key: "category",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, record) => {
      if (type == TableTypes.REQUIREMENT)
        return (
          <div style={{ textAlign: "left" }}>
            {(record as RequirementTableItem).category}
          </div>
        );
      else return null;
    },
  };
  return col;
}
