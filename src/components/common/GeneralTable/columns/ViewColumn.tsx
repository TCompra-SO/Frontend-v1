import { ColumnType } from "antd/es/table";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Action, TableTypes } from "../../../../utilities/types";
import { useContext } from "react";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";

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
  } = useContext(LoadingDataContext);

  const col: ColumnType<any> = {
    title: t("actionColumn"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "100px",
    fixed: "right",
    hidden,
    render: (record) => {
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
      }

      return (
        <div className="t-flex c-ofertas" style={{ padding: "7px 0" }}>
          <ButtonContainer
            onClick={() => onButtonClick(action, record)}
            className="btn btn-border-default btn-sm t-flex seleccionar-tb"
            children={
              <>
                {t("view")} <i className="fa-solid fa-eye"></i>
              </>
            }
            disabled={
              type == TableTypes.PURCHASE_ORDER_SUBUSER
                ? subUserRequirementsViewOffers
                : type == TableTypes.ALL_PURCHASE_ORDERS
                ? allPurchaseOrdersViewOffers
                : type == TableTypes.ALL_SALES_ORDERS
                ? allSalesOrdersViewOffers
                : undefined
            }
          />
        </div>
      );
    },
  };
  return col;
}
