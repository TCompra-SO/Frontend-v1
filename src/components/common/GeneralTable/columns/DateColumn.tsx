import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";
import {
  OfferListItem,
  PurchaseOrder,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";

export default function DateColumn(type: TableTypes, hidden: boolean = false) {
  const { t } = useTranslation();
  let dataIndex = "date";
  switch (type) {
    case TableTypes.REQUIREMENT:
      dataIndex = "publishDate";
      break;
    case TableTypes.OFFER:
      dataIndex = "date";
      break;
    case TableTypes.PURCHASE_ORDER:
      dataIndex = "date";
      break;
  }

  const col: ColumnType<RequirementTableItem | OfferListItem | PurchaseOrder> =
    {
      title: t("dateColumn"),
      dataIndex: dataIndex,
      key: dataIndex,
      align: "center",
      showSorterTooltip: false,
      ellipsis: true,
      width: "110px",
      hidden,

      render: (_, record) => {
        let value: Date = new Date();
        switch (type) {
          case TableTypes.REQUIREMENT:
            value = (record as RequirementTableItem).publishDate;
            break;
          case TableTypes.OFFER:
            value = (record as OfferListItem).publishDate;
            break;
          case TableTypes.PURCHASE_ORDER:
            value = (record as PurchaseOrder).purchaseDate;
            break;
        }
        return (
          <div style={{ textAlign: "left" }} className="t-flex dato-table">
            {dayjs(value).format(dateFormat)}
          </div>
        );
      },
    };
  return col;
}
