import { ColumnType } from "antd/es/table";
import { Dropdown } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
import {
  Action,
  ActionByStateOffer,
  ActionByStatePurchaseOrder,
  ActionByStateRequirement,
  ActionCertificateFiles,
  ActionLabel,
  ActionSubUsers,
  PurchaseOrderTableTypes,
  SubActions,
  TableTypes,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { actionColumnKey, allItems } from "../../../../utilities/globals";
import { ItemType } from "antd/es/menu/interface";
import { Offer } from "../../../../models/MainInterfaces";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";
import { useContext } from "react";

// extraParam tiene diferentes significados según el tipo de tabla
export default function ActionColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any, subAction?: Action) => void,
  hidden: boolean = false,
  extraParam?: any
) {
  const { t } = useTranslation();
  const { myPurchaseOrdersLoadingPdf, idAndActionQueue } =
    useContext(LoadingDataContext);

  function getActions(ActionByState: { [key: number]: Action[] }) {
    if (type != TableTypes.PURCHASE_ORDER && type != TableTypes.SALES_ORDER)
      switch (type) {
        case TableTypes.PURCHASE_ORDER:
        case TableTypes.SALES_ORDER:
          break;
        default:
          break;
      }
  }

  const col: ColumnType<any> = {
    title: t("actionsColumn"),
    key: actionColumnKey,
    align: "center",
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (record) => {
      let ActionByState: { [key: number]: Action[] } = {};
      let key: number = 0;
      switch (type) {
        case TableTypes.ALL_REQUIREMENTS:
        case TableTypes.REQUIREMENT:
          ActionByState = ActionByStateRequirement;
          key = record.state;
          break;
        case TableTypes.ALL_OFFERS:
        case TableTypes.OFFER:
          ActionByState = ActionByStateOffer;
          key = record.state;
          break;
        case TableTypes.USERS:
          ActionByState = ActionSubUsers;
          key = allItems;
          break;
        case TableTypes.ALL_PURCHASE_ORDERS:
        case TableTypes.PURCHASE_ORDER:
        case TableTypes.SALES_ORDER:
        case TableTypes.ALL_SALES_ORDERS:
          ActionByState = ActionByStatePurchaseOrder;
          key = record.state;
          break;
        case TableTypes.MY_DOCUMENTS:
          ActionByState = ActionCertificateFiles;
          break;
      }

      return (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: ActionByState[key]
              ? type != TableTypes.PURCHASE_ORDER &&
                type != TableTypes.SALES_ORDER
                ? type == TableTypes.OFFER
                  ? ActionByState[key].reduce<ItemType[]>(
                      (acc, action: Action) => {
                        const { canceledByCreator, cancelRated } =
                          record as Offer;
                        if (
                          action == Action.RATE_CANCELED &&
                          (canceledByCreator ||
                            (!canceledByCreator && cancelRated))
                        )
                          return acc;
                        else
                          acc.push({
                            key: action,
                            label: t(ActionLabel[action]),
                            onClick: () => onButtonClick(action, record),
                            disabled: idAndActionQueue[record?.key]
                              ? true
                              : false,
                          });
                        return acc;
                      },
                      []
                    )
                  : ActionByState[key].map((action: Action) => {
                      // default
                      return {
                        key: action,
                        label: t(ActionLabel[action]),
                        onClick: Object.prototype.hasOwnProperty.call(
                          SubActions,
                          action
                        )
                          ? undefined
                          : () => onButtonClick(action, record),
                        disabled: idAndActionQueue[record?.key] ? true : false,
                        children: Object.prototype.hasOwnProperty.call(
                          SubActions,
                          action
                        )
                          ? SubActions[action].map((a) => ({
                              key: `${action.toString()}-${a.toString()}`,
                              label: t(ActionLabel[a]),
                              onClick: () => onButtonClick(action, record, a),
                            }))
                          : undefined,
                      };
                    })
                : type == TableTypes.PURCHASE_ORDER
                ? ActionByState[key].reduce<ItemType[]>(
                    (acc, action: Action) => {
                      if (
                        action == Action.VIEW_HISTORY &&
                        extraParam == PurchaseOrderTableTypes.RECEIVED
                      )
                        return acc;
                      if (
                        action == Action.VIEW_CUSTOMER &&
                        extraParam == PurchaseOrderTableTypes.ISSUED
                      )
                        return acc;
                      if (
                        action == Action.VIEW_SUPPLIER &&
                        extraParam == PurchaseOrderTableTypes.RECEIVED
                      )
                        return acc;

                      acc.push({
                        key: action,
                        label: t(ActionLabel[action]),
                        onClick: () => onButtonClick(action, record),
                        disabled: idAndActionQueue[record?.key]
                          ? true
                          : action == Action.DOWNLOAD_PURCHASE_ORDER
                          ? myPurchaseOrdersLoadingPdf
                          : false,
                      });
                      return acc;
                    },
                    []
                  )
                : ActionByState[key].reduce<ItemType[]>( // órdenes de venta
                    (acc, action: Action) => {
                      if (
                        action == Action.VIEW_HISTORY &&
                        extraParam == PurchaseOrderTableTypes.RECEIVED
                      )
                        return acc;
                      if (
                        action == Action.VIEW_CUSTOMER &&
                        extraParam == PurchaseOrderTableTypes.RECEIVED
                      )
                        return acc;
                      if (
                        action == Action.VIEW_SUPPLIER &&
                        extraParam == PurchaseOrderTableTypes.ISSUED
                      )
                        return acc;

                      acc.push({
                        key: action,
                        label: t(ActionLabel[action]),
                        onClick: () => onButtonClick(action, record),
                        disabled: idAndActionQueue[record?.key]
                          ? true
                          : action == Action.DOWNLOAD_PURCHASE_ORDER
                          ? myPurchaseOrdersLoadingPdf
                          : false,
                      });
                      return acc;
                    },
                    []
                  )
              : [],
          }}
        >
          <div className="t-flex c-ofertas" style={{ padding: "7px 0" }}>
            <ButtonContainer
              className="btn btn-border-default btn-sm t-flex seleccionar-tb"
              children={
                <>
                  {t("select")} <i className="fa-solid fa-chevron-down"></i>
                </>
              }
            />
          </div>
        </Dropdown>
      );
    },
  };
  return col;
}
