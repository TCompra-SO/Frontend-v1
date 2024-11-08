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
  TableTypes,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";
import { allItems } from "../../../../utilities/globals";
import { ItemType } from "antd/es/menu/interface";
import { Offer } from "../../../../models/MainInterfaces";

// extraParam tiene diferentes significados según el tipo de tabla
export default function ActionColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false,
  extraParam: any = false
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
            items:
              type != TableTypes.PURCHASE_ORDER
                ? type == TableTypes.OFFER
                  ? ActionByState[key].reduce<ItemType[]>(
                      (acc, action: Action) => {
                        const canceledByCreator = (record as Offer) // r3v
                          .canceledByCreator;
                        if (action == Action.RATE_CANCELED && canceledByCreator)
                          return acc;
                        else
                          acc.push({
                            key: action,
                            label: t(ActionLabel[action]),
                            onClick: () => onButtonClick(action, record),
                          });
                        return acc;
                      },
                      []
                    )
                  : ActionByState[key].map((action: Action) => {
                      return {
                        key: action,
                        label: t(ActionLabel[action]),
                        onClick: () => onButtonClick(action, record),
                      };
                    })
                : ActionByState[key].reduce<ItemType[]>(
                    (acc, action: Action) => {
                      if (
                        action == Action.VIEW_HISTORY &&
                        (extraParam == PurchaseOrderTableTypes.RECEIVED ||
                          extraParam == PurchaseOrderTableTypes.ISSUED_SALES)
                      )
                        return acc;
                      if (
                        action == Action.VIEW_CUSTOMER &&
                        (extraParam == PurchaseOrderTableTypes.ISSUED ||
                          extraParam == PurchaseOrderTableTypes.ISSUED_SALES)
                      )
                        return acc;
                      if (
                        action == Action.VIEW_SUPPLIER &&
                        (extraParam == PurchaseOrderTableTypes.RECEIVED ||
                          extraParam == PurchaseOrderTableTypes.RECEIVED_SALES)
                      )
                        return acc;
                      acc.push({
                        key: action,
                        label: t(ActionLabel[action]),
                        onClick: () => onButtonClick(action, record),
                      });
                      return acc;
                    },
                    []
                  ),
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
