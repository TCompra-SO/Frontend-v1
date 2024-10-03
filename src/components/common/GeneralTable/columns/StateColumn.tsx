import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  PurchaseOrder,
  RequirementItemSubUser,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import {
  OfferStateMeta,
  RequirementStateMeta,
} from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";

export default function StateColumn(type: TableTypes, hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<
    | RequirementTableItem
    | OfferListItem
    | PurchaseOrder
    | RequirementItemSubUser
  > = {
    title: t("stateColumn"),
    key: "state",
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "113px",
    hidden,
    render: (_, record) => {
      let label: string = "";
      let className: string = "";

      if (
        type == TableTypes.REQUIREMENT ||
        type == TableTypes.REQUIREMENT_SUBUSER
      ) {
        const state = (record as RequirementTableItem).state;
        label = t(RequirementStateMeta[state].label);
        className = `cont-estado ${RequirementStateMeta[state].class}`;
      } else if (type == TableTypes.OFFER) {
        const state = (record as OfferListItem).state;
        label = t(OfferStateMeta[state].label);
        className = `cont-estado ${OfferStateMeta[state].class}`;
      } else if (type == TableTypes.PURCHASE_ORDER) {
        const state = (record as PurchaseOrder).state;
        label = t(OfferStateMeta[state].label);
        className = `cont-estado ${OfferStateMeta[state].class}`;
      }
      return (
        <div className="t-flex c-estados">
          <div className={className}>{label}</div>
        </div>
        // <TagContainer
        //   color={background}
        //   text={label}
        //   style={{
        //     width: "77px",
        //     textAlign: "center",
        //     marginInlineEnd: "0",
        //     color: color,
        //   }}
        // />
      );
    },
  };
  return col;
}
