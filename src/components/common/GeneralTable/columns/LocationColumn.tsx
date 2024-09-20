import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { defaultCountry } from "../../../../utilities/globals";
import { IdValueMap, IdValueObj } from "../../../../models/Interfaces";

export default function LocationColumn(hidden: boolean = false) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;
  const [cities] = useState(
    countryData[defaultCountry]?.cities.reduce(
      (acc: IdValueMap, { id, value }: IdValueObj) => {
        acc[id] = { value };
        return acc;
      },
      {}
    )
  ); /* r3v */

  const col: ColumnType<RequirementTableItem | OfferListItem> = {
    title: t("locationColumn"),
    dataIndex: "location",
    key: "location",
    align: "center",
    sorter: (a, b) =>
      cities[a.location].value.localeCompare(cities[b.location].value),
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (_, { location }) => (
      <div style={{ textAlign: "left" }} className="t-flex dato-table">
        {cities[location].value}
      </div>
    ),
  };
  return col;
}
