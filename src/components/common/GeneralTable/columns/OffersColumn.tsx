import { ColumnType } from "antd/es/table";
import {
  BasicRequirement,
  Requirement,
} from "../../../../models/MainInterfaces";
import { Action, TableTypes } from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";
import ButtonContainer from "../../../containers/ButtonContainer";
import { offersColumnKey } from "../../../../utilities/globals";
import { FieldSort } from "../../../../models/Requests";
import { getSortOrderFromFieldSort } from "../../../../utilities/globalFunctions";

export default function OffersColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false,
  fieldSort?: FieldSort,
  noSorter?: boolean
) {
  const { t } = useTranslation();
  const { myRequirementsLoadingViewOffers } = useContext(LoadingDataContext);

  const col: ColumnType<Requirement | BasicRequirement> = {
    title: t("offersColumn"),
    dataIndex: "numberOffers",
    key: offersColumnKey,
    align: "center",
    sorter: noSorter ? undefined : true,
    showSorterTooltip: false,
    sortOrder: getSortOrderFromFieldSort(offersColumnKey, fieldSort),
    width: "92px",
    hidden,
    render: (_, record) => {
      return (
        <div className="t-flex c-ofertas">
          <ButtonContainer
            className="oferta-cant"
            style={{
              cursor: type == TableTypes.REQUIREMENT ? "pointer" : "default",
              borderColor: "transparent",
            }}
            onClick={() => onButtonClick(Action.SHOW_OFFERS, record)}
            disabled={
              type == TableTypes.REQUIREMENT
                ? myRequirementsLoadingViewOffers
                : undefined
            }
          >
            {record.numberOffers}
          </ButtonContainer>
        </div>
      );
    },
  };
  return col;
}
