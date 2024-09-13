import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";

export default function DateColumn(type: TableTypes, hidden: boolean = false) {
  const { t } = useTranslation();
  let dataIndex = "date";
  switch (type) {
    case TableTypes.REQUIREMENT:
      dataIndex = "date";
      break;
    case TableTypes.OFFER:
      dataIndex = "date";
      break;
    case TableTypes.PURCHASE_ORDER:
      dataIndex = "date";
      break;
  }

  const col: ColumnType<any> = {
    title: t("dateColumn"),
    dataIndex: dataIndex,
    key: dataIndex,
    align: "center",
    showSorterTooltip: false,
    ellipsis: true,
    width: "110px",
    hidden,
  };
  return col;
}
