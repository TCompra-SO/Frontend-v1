import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import ButtonContainer from "../../../containers/ButtonContainer";
import { Action, TableTypes } from "../../../../utilities/types";
import { lightColor, primaryColor } from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";

export default function OffersColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: RequirementTableItem) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
    title: t("offersColumn"),
    dataIndex: "numberOffers",
    key: "offers",
    align: "center",
    sorter: (a, b) => a.numberOffers - b.numberOffers,
    showSorterTooltip: false,
    width: "75px",
    hidden,
    render: (_, record) => {
      if (type == TableTypes.REQUIREMENT)
        return (
          <ButtonContainer
            size="small"
            type="default"
            shape="round"
            text={record.numberOffers}
            onClick={() => onButtonClick(Action.SHOW_OFFERS, record)}
            style={{
              height: "32px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "500",
              color: primaryColor,
              background: lightColor,
              border: "0",
            }}
          />
        );
      else return null;
    },
  };
  return col;
}
