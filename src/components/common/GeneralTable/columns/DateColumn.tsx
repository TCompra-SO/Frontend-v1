import { ColumnType } from "antd/es/table";
import { TableRecordType } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

export default function DateColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<TableRecordType> = {
    title: t("dateColumn"),
    dataIndex: "date",
    key: "date",
    align: "center",
    showSorterTooltip: false,
    ellipsis: true,
    width: "100px",
    hidden,
  };
  return col;
}
