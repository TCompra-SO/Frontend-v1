import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  PurchaseOrder,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import TagContainer from "../../../containers/TagContainer";
import {
  OfferStateMeta,
  RequirementStateMeta,
} from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";

export default function StateColumn(type: TableTypes, hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem | OfferListItem | PurchaseOrder> =
    {
      title: t("stateColumn"),
      key: "state",
      align: "center",
      dataIndex: "state",
      showSorterTooltip: false,
      width: "100px",
      hidden,
      render: (_, record) => {
        let background: string = "";
        let label: string = "";
        let color: string = background;
        if (type == TableTypes.REQUIREMENT) {
          const state = (record as RequirementTableItem).state;
          background = RequirementStateMeta[state].background;
          label = t(RequirementStateMeta[state].label);
          color = RequirementStateMeta[state].color;
        } else if (type == TableTypes.OFFER) {
          const state = (record as OfferListItem).state;
          background = OfferStateMeta[state].background;
          label = t(OfferStateMeta[state].label);
          color = OfferStateMeta[state].color;
        } else if (type == TableTypes.PURCHASE_ORDER) {
          const state = (record as PurchaseOrder).state;
          background = OfferStateMeta[state].background;
          label = t(OfferStateMeta[state].label);
          color = OfferStateMeta[state].color;
        }
        return (
          <TagContainer
            color={background}
            text={label}
            style={{
              width: "77px",
              textAlign: "center",
              marginInlineEnd: "0",
              color: color,
            }}
          />
        );
      },
    };
  return col;
}
