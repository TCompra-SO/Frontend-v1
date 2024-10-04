import { ColumnType } from "antd/es/table";
import {
  OfferItemSubUser,
  Offer,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  Requirement,
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
    | Requirement
    | Offer
    | PurchaseOrder
    | RequirementItemSubUser
    | OfferItemSubUser
    | PurchaseOrderItemSubUser
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
        const state = (record as Requirement).state;
        label = t(RequirementStateMeta[state].label);
        className = `cont-estado ${RequirementStateMeta[state].class}`;
      } else if (type == TableTypes.OFFER || type == TableTypes.OFFER_SUBUSER) {
        const state = (record as Offer).state;
        label = t(OfferStateMeta[state].label);
        className = `cont-estado ${OfferStateMeta[state].class}`;
      } else if (
        type == TableTypes.PURCHASE_ORDER ||
        type == TableTypes.PURCHASE_ORDER_SUBUSER
      ) {
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
