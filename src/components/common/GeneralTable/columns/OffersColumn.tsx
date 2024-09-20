import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Action, TableTypes } from "../../../../utilities/types";
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
          <div className="t-flex c-ofertas">
            <div
              className="oferta-cant"
              style={{ cursor: "pointer" }}
              onClick={() => onButtonClick(Action.SHOW_OFFERS, record)}
            >
              {record.numberOffers}
            </div>
          </div>
        );
      else return null;
    },
  };
  return col;
}
