import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementItemSubUser,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { Coins } from "../../../../utilities/types";

export default function PriceColumn(hidden: boolean = false) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyData } = context;

  const col: ColumnType<
    RequirementTableItem | OfferListItem | RequirementItemSubUser
  > = {
    title: t("priceColumn"),
    dataIndex: "price",
    align: "center",
    key: "price",
    hidden,
    render: (_, record) => (
      <div style={{ textAlign: "left" }} className="t-flex dato-table">
        {currencyData && currencyData[record.coin]
          ? Coins[currencyData[record.coin].alias]
          : null}{" "}
        {record.price}
      </div>
    ),
    sorter: (a, b) => a.price - b.price,
    showSorterTooltip: false,
    width: "130px",
  };
  return col;
}
