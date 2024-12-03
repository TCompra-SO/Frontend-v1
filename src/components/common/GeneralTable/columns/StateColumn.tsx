import { ColumnType } from "antd/es/table";
import {
  OfferItemSubUser,
  Offer,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  Requirement,
  BasicRequirement,
  BasicOffer,
  BasicPurchaseOrder,
  CertificationItem,
} from "../../../../models/MainInterfaces";
import {
  CertificationStateMeta,
  OfferStateMeta,
  PurchaseOrderStateMeta,
  RequirementStateMeta,
} from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import { CertificationState, TableTypes } from "../../../../utilities/types";

export default function StateColumn(type: TableTypes, hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<
    | Requirement
    | Offer
    | PurchaseOrder
    | RequirementItemSubUser
    | OfferItemSubUser
    | PurchaseOrderItemSubUser
    | BasicRequirement
    | BasicOffer
    | BasicPurchaseOrder
    | CertificationItem
  > = {
    title: t("stateColumn"),
    key: "state",
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "113px",
    hidden,
    filters:
      type == TableTypes.SENT_CERT || type == TableTypes.RECEIVED_CERT
        ? [
            {
              text: t(
                CertificationStateMeta[CertificationState.CERTIFIED].label
              ),
              value: CertificationState.CERTIFIED,
            },
            {
              text: t(CertificationStateMeta[CertificationState.PENDING].label),
              value: CertificationState.PENDING,
            },
            {
              text: t(
                CertificationStateMeta[CertificationState.REJECTED].label
              ),
              value: CertificationState.REJECTED,
            },
          ]
        : undefined,
    onFilter:
      type == TableTypes.SENT_CERT || type == TableTypes.RECEIVED_CERT
        ? (value, record) => record.state == value
        : undefined,
    render: (_, record) => {
      let label: string = "";
      let className: string = "";

      try {
        if (
          type == TableTypes.REQUIREMENT ||
          type == TableTypes.REQUIREMENT_SUBUSER ||
          type == TableTypes.ALL_REQUIREMENTS
        ) {
          const state = (record as BasicRequirement).state;
          label = t(RequirementStateMeta[state]?.label);
          className = `cont-estado ${RequirementStateMeta[state]?.class}`;
        } else if (
          type == TableTypes.OFFER ||
          type == TableTypes.OFFER_SUBUSER ||
          type == TableTypes.ALL_OFFERS
        ) {
          const state = (record as BasicOffer).state;
          label = t(OfferStateMeta[state]?.label);
          className = `cont-estado ${OfferStateMeta[state]?.class}`;
        } else if (
          type == TableTypes.PURCHASE_ORDER ||
          type == TableTypes.PURCHASE_ORDER_SUBUSER ||
          type == TableTypes.ALL_PURCHASE_ORDERS ||
          type == TableTypes.SALES_ORDER ||
          type == TableTypes.ALL_SALES_ORDERS
        ) {
          const state = (record as BasicPurchaseOrder).state;
          label = t(PurchaseOrderStateMeta[state]?.label);
          className = `cont-estado ${PurchaseOrderStateMeta[state]?.class}`;
        } else if (
          type == TableTypes.SENT_CERT ||
          type == TableTypes.RECEIVED_CERT
        ) {
          const state = (record as CertificationItem).state;
          label = t(CertificationStateMeta[state]?.label);
          className = `cont-estado ${CertificationStateMeta[state]?.class}`;
        }
      } catch (e) {
        console.log(e);
      }
      return (
        <div className="t-flex c-estados">
          <div className={className}>{label}</div>
        </div>
      );
    },
  };
  return col;
}
