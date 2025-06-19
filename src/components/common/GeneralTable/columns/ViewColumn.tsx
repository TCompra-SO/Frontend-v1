import { ColumnType } from "antd/es/table";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Action, ActionLabel, TableTypes } from "../../../../utilities/types";
import { useContext } from "react";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";
import { viewColumnKey } from "../../../../utilities/globals";
import { KeyInterface, Requirement } from "../../../../models/MainInterfaces";

export default function ViewColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();
  const {
    subUserRequirementsViewOffers,
    allPurchaseOrdersViewOffers,
    allSalesOrdersViewOffers,
    idAndActionQueue,
    idAndActionAdminQueue,
  } = useContext(LoadingDataContext);

  const col: ColumnType<KeyInterface> = {
    title: t("actionColumn"),
    key: viewColumnKey,
    align: "center",
    showSorterTooltip: false,
    width: "100px",
    fixed: "right",
    hidden,
    render: (_, record) => {
      let buttonClass = "btn-border-default";
      let action: Action = Action.VIEW_REQUIREMENTS;
      switch (type) {
        case TableTypes.REQUIREMENT:
        case TableTypes.ALL_REQUIREMENTS:
        case TableTypes.REQUIREMENT_SUBUSER:
          action = Action.VIEW_REQUIREMENT;
          break;
        case TableTypes.ALL_OFFERS:
        case TableTypes.OFFER_SUBUSER:
          action = Action.VIEW_OFFER;
          break;
        case TableTypes.ALL_PURCHASE_ORDERS:
        case TableTypes.PURCHASE_ORDER_SUBUSER:
        case TableTypes.ALL_SALES_ORDERS:
          action = Action.VIEW_PURCHASE_ORDER;
          break;
        case TableTypes.SENT_CERT:
        case TableTypes.RECEIVED_CERT:
          action = Action.VIEW;
          break;
        case TableTypes.ADMIN_SALES: {
          const isValid = (record as Requirement).valid;
          action = isValid ? Action.INVALIDATE : Action.VALIDATE;
          buttonClass = isValid ? "btn-red" : "btn-green";
          break;
        }
      }

      return (
        <div className="t-flex c-ofertas" style={{ padding: "7px 0" }}>
          <ButtonContainer
            onClick={() => onButtonClick(action, record)}
            className={`btn ${buttonClass} btn-sm t-flex seleccionar-tb`}
            children={
              type == TableTypes.ADMIN_SALES ? (
                <>
                  {t(ActionLabel[action])}{" "}
                  <i
                    className={
                      action == Action.VALIDATE
                        ? "fa-regular fa-circle-check"
                        : "fa-regular fa-circle-xmark"
                    }
                  ></i>
                </>
              ) : (
                <>
                  {t("view")} <i className="fa-solid fa-eye"></i>
                </>
              )
            }
            disabled={
              type == TableTypes.PURCHASE_ORDER_SUBUSER
                ? subUserRequirementsViewOffers
                : type == TableTypes.ALL_PURCHASE_ORDERS
                ? allPurchaseOrdersViewOffers
                : type == TableTypes.ALL_SALES_ORDERS
                ? allSalesOrdersViewOffers
                : type == TableTypes.RECEIVED_CERT
                ? idAndActionQueue[record.key]
                  ? true
                  : false
                : TableTypes.ADMIN_SALES
                ? idAndActionAdminQueue[record.key]
                  ? true
                  : false
                : false
            }
          />
        </div>
      );
    },
  };
  return col;
}
