import { ColumnType } from "antd/es/table";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import {
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
} from "../../../../models/MainInterfaces";
import { Action, TableTypes } from "../../../../utilities/types";

export default function ViewColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<
    RequirementItemSubUser | OfferItemSubUser | PurchaseOrderItemSubUser
  > = {
    title: t("actionColumn"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (record) => {
      let action: Action = Action.VIEW_REQUIREMENTS;
      switch (type) {
        case TableTypes.REQUIREMENT_SUBUSER:
          action = Action.VIEW_REQUIREMENTS;
          break;
        case TableTypes.OFFER_SUBUSER:
          action = Action.VIEW_OFFERS;
          break;
        case TableTypes.PURCHASE_ORDER_SUBUSER:
          action = Action.VIEW_PURCHASE_ORDERS;
          break;
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
          />
        </div>
      );
    },
  };
  return col;
}
