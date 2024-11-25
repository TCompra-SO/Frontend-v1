import { ColumnType } from "antd/es/table";
import { BasicRequirement } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { defaultCountry } from "../../../../utilities/globals";
import { IdValueMap, IdValueObj } from "../../../../models/Interfaces";

export default function LocationColumn(hidden: boolean = false) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;
  const [cities, setCities] = useState<IdValueMap>({});

  useEffect(() => {
    if (countryData && countryData[defaultCountry]) {
      const loadedCities = countryData[defaultCountry].cities.reduce(
        (acc: IdValueMap, { id, value }: IdValueObj) => {
          acc[id] = { value };
          return acc;
        },
        {}
      );
      setCities(loadedCities);
    }
  }, [countryData]);

  const col: ColumnType<BasicRequirement> = {
    title: t("locationColumn"),
    dataIndex: "location",
    key: "location",
    align: "center",
    sorter: (a, b) =>
      cities[a.location]?.value.localeCompare(cities[b.location]?.value),
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (_, { location }) => (
      <div style={{ textAlign: "left" }} className="t-flex dato-table">
        {cities[location]?.value ?? null}
      </div>
    ),
  };
  return col;
}
