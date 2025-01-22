import { ColumnType } from "antd/es/table";
import { BasicRequirement } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import {
  defaultCountry,
  locationColumnKey,
} from "../../../../utilities/globals";
import { IdValueMap, IdValueObj } from "../../../../models/Interfaces";
import { FieldSort } from "../../../../models/Requests";
import { getSortOrderFromFieldSort } from "../../../../utilities/globalFunctions";

export default function LocationColumn(
  hidden: boolean = false,
  fieldSort?: FieldSort,
  noSorter?: boolean
) {
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
    key: locationColumnKey,
    align: "center",
    sorter: noSorter ? undefined : true,
    showSorterTooltip: false,
    sortOrder: getSortOrderFromFieldSort(locationColumnKey, fieldSort),
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
