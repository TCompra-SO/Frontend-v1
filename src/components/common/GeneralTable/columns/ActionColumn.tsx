import { ColumnType } from "antd/es/table";
import { Dropdown } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
import {
  Action,
  ActionByStateOffer,
  ActionByStatePurchaseOrder,
  ActionByStateRequirement,
  ActionLabel,
  ActionSubUsers,
  TableTypes,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { allItems } from "../../../../utilities/globals";

export default function ActionColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<any> = {
    title: t("actionColumn"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (record) => {
      let ActionByState: { [key: number]: Action[] } = {};
      let key: number = 0;
      switch (type) {
        case TableTypes.REQUIREMENT:
          ActionByState = ActionByStateRequirement;
          key = record.state;
          break;
        case TableTypes.OFFER:
          ActionByState = ActionByStateOffer; // r3v determinar si se debe mostrar calificar en oferta cancelada
          key = record.state;
          break;
        case TableTypes.USERS:
          ActionByState = ActionSubUsers;
          key = allItems;
          break;
        case TableTypes.PURCHASE_ORDER:
          ActionByState = ActionByStatePurchaseOrder;
          key = record.state;
          break;
      }

      return (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: ActionByState[key].map((action: Action) => {
              return {
                key: action,
                label: t(ActionLabel[action]),
                onClick: () => onButtonClick(action, record),
              };
            }),
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
