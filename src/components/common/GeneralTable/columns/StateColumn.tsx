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
  SubUserBase,
} from "../../../../models/MainInterfaces";
import {
  CertificationStateMeta,
  OfferStateMeta,
  PurchaseOrderStateMeta,
  RequirementStateMeta,
  UserStateMeta,
} from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import {
  CertificationState,
  Filters,
  OfferState,
  OrderConfirmation,
  PurchaseOrderState,
  OrderTableType,
  RequirementState,
  TableTypes,
} from "../../../../utilities/types";
import { stateColumnKey } from "../../../../utilities/globals";
import { StrictColumnFilterItem } from "../../../../models/Interfaces";
import CustomFilterDropdown from "../../utils/CustomFilterDropdown";

export default function StateColumn(
  type: TableTypes,
  hidden: boolean = false,
  filteredInfo?: Filters,
  extraParam?: any
) {
  const { t } = useTranslation();
  const filters: StrictColumnFilterItem[] | undefined =
    type == TableTypes.SENT_CERT || type == TableTypes.RECEIVED_CERT
      ? [
          {
            text: t(CertificationStateMeta[CertificationState.CERTIFIED].label),
            value: CertificationState.CERTIFIED,
          },
          {
            text: t(CertificationStateMeta[CertificationState.PENDING].label),
            value: CertificationState.PENDING,
          },
          {
            text: t(CertificationStateMeta[CertificationState.REJECTED].label),
            value: CertificationState.REJECTED,
          },
          {
            text: t(CertificationStateMeta[CertificationState.RESENT].label),
            value: CertificationState.RESENT,
          },
        ]
      : type == TableTypes.REQUIREMENT ||
        type == TableTypes.ALL_REQUIREMENTS ||
        type == TableTypes.REQUIREMENT_SUBUSER
      ? Object.values(RequirementState)
          .filter(
            (state) => RequirementStateMeta[Number(state) as RequirementState]
          )
          .map((state) => {
            return {
              text: t(
                RequirementStateMeta[Number(state) as RequirementState]?.label
              ),
              value: Number(state) as RequirementState,
            };
          })
      : type == TableTypes.OFFER ||
        type == TableTypes.ALL_OFFERS ||
        type == TableTypes.OFFER_SUBUSER
      ? Object.values(OfferState)
          .filter((state) => OfferStateMeta[Number(state) as OfferState])
          .map((state) => {
            return {
              text: t(OfferStateMeta[Number(state) as OfferState]?.label),
              value: Number(state) as OfferState,
            };
          })
      : type == TableTypes.PURCHASE_ORDER ||
        type == TableTypes.ALL_PURCHASE_ORDERS ||
        type == TableTypes.SALES_ORDER ||
        type == TableTypes.ALL_SALES_ORDERS ||
        type == TableTypes.PURCHASE_ORDER_SUBUSER ||
        type == TableTypes.SALES_ORDER_SUBUSER
      ? Object.values(PurchaseOrderState)
          .filter(
            (state) =>
              PurchaseOrderStateMeta[Number(state) as PurchaseOrderState]
          )
          .map((state) => {
            return {
              text: t(
                PurchaseOrderStateMeta[Number(state) as PurchaseOrderState]
                  ?.label
              ),
              value: Number(state) as PurchaseOrderState,
            };
          })
      : type == TableTypes.USERS
      ? [
          {
            text: t("activeUser"),
            value: "true",
          },
          {
            text: t("suspendedUser"),
            value: "false",
          },
        ]
      : undefined;

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
    | SubUserBase
  > = {
    title: t("stateColumn"),
    key: stateColumnKey,
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "113px",
    hidden,
    filteredValue: filteredInfo?.[stateColumnKey] ?? null,
    filters,

    onFilter:
      type == TableTypes.SENT_CERT || type == TableTypes.RECEIVED_CERT
        ? (value, record) => record.state == value
        : undefined,

    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <CustomFilterDropdown
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
        filters={filters}
        filteredInfo={filteredInfo}
      />
    ),

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
          const bpo = record as BasicPurchaseOrder;
          let state = bpo.state;
          if (
            (extraParam == OrderTableType.ISSUED &&
              state == PurchaseOrderState.PENDING &&
              bpo.clientConfirmation != OrderConfirmation.NONE) ||
            (extraParam == OrderTableType.RECEIVED &&
              state == PurchaseOrderState.PENDING &&
              bpo.providerConfirmation != OrderConfirmation.NONE)
          )
            state = PurchaseOrderState.FINISHED;
          label = t(PurchaseOrderStateMeta[state]?.label);
          className = `cont-estado ${PurchaseOrderStateMeta[state]?.class}`;
        } else if (
          type == TableTypes.SENT_CERT ||
          type == TableTypes.RECEIVED_CERT
        ) {
          const state = (record as CertificationItem).state;
          label = t(CertificationStateMeta[state]?.label);
          className = `cont-estado ${CertificationStateMeta[state]?.class}`;
        } else if (type == TableTypes.USERS) {
          const state = (record as SubUserBase).state;
          const temp = UserStateMeta(state);
          className = `cont-estado ${temp.class}`;
          label = t(temp.label);
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
