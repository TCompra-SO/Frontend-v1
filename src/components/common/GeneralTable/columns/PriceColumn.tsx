import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { Coins } from "../../../../utilities/types";

export default function PriceColumn(hidden: boolean = false) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyList } = context;

  const col: ColumnType<RequirementTableItem | OfferListItem> = {
    title: t("priceColumn"),
    dataIndex: "price",
    align: "center",
    key: "price",
    hidden,
    render: (_, record) => (
      <div style={{ textAlign: "left" }} className="t-flex dato-table">
        {Coins[currencyList[record.coin]?.alias]} {record.price}
      </div>
    ),
    sorter: (a, b) => a.price - b.price,
    showSorterTooltip: false,
    width: "130px",
  };
  return col;
}
