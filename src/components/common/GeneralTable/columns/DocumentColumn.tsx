import { ColumnType } from "antd/es/table";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import {
  PurchaseOrder,
  PurchaseOrderItemSubUser,
} from "../../../../models/MainInterfaces";
import { Action } from "../../../../utilities/types";

export default function DocumentColumn(
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<PurchaseOrderItemSubUser | PurchaseOrder> = {
    title: t("document"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "130px",
    hidden,
    render: (record) => {
      return (
        <div className="t-flex c-ofertas" style={{ padding: "7px 0" }}>
          <ButtonContainer
            onClick={() =>
              onButtonClick(Action.DOWNLOAD_PURCHASE_ORDER, record)
            }
            className="btn btn-border-default btn-sm t-flex seleccionar-tb"
            children={<i className="fa-solid fa-file"></i>}
          />
        </div>
      );
    },
  };
  return col;
}
