import { ColumnType } from "antd/es/table";
import {
  Offer,
  RequirementItemSubUser,
  Requirement,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { Coins } from "../../../../utilities/types";
import { priceColumnKey } from "../../../../utilities/globals";

export default function PriceColumn(
  hidden: boolean = false,
  noSorter?: boolean
) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyData } = context;

  const col: ColumnType<Requirement | Offer | RequirementItemSubUser> = {
    title: t("priceColumn"),
    dataIndex: "price",
    align: "center",
    key: priceColumnKey,
    hidden,
    render: (_, record) => (
      <div style={{ textAlign: "left" }} className="t-flex dato-table">
        {currencyData && currencyData[record.coin]
          ? Coins[currencyData[record.coin].alias]
          : null}{" "}
        {record.price}
      </div>
    ),
    sorter: noSorter ? undefined : (a, b) => a.price - b.price,
    showSorterTooltip: false,
    width: "130px",
  };
  return col;
}
