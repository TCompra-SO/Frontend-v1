import { ColumnType } from "antd/es/table";
import { TableRecordType } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";

export default function PriceColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<TableRecordType> = {
    title: t("priceColumn"),
    dataIndex: "price",
    align: "center",
    key: "price",
    hidden,
    render: (_, record) => (
      <div style={{ textAlign: "left" }}>
        {record.coin} {record.price}
      </div>
    ),
    sorter: (a, b) => a.price - b.price,
    showSorterTooltip: false,
    width: "120px",
  };
  return col;
}
