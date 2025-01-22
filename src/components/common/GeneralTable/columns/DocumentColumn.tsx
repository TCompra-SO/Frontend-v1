import { ColumnType } from "antd/es/table";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import {
  PurchaseOrder,
  PurchaseOrderItemSubUser,
} from "../../../../models/MainInterfaces";
import { Action, TableTypes } from "../../../../utilities/types";
import { useContext } from "react";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";
import { documentColumnKey } from "../../../../utilities/globals";

export default function DocumentColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();
  const {
    allPurchaseOrdersLoadingPdf,
    subUserPurchaseOrdersLoadingPdf,
    allSalesOrdersLoadingPdf,
  } = useContext(LoadingDataContext);

  const col: ColumnType<PurchaseOrderItemSubUser | PurchaseOrder> = {
    title: t("document"),
    key: documentColumnKey,
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
            disabled={
              type == TableTypes.ALL_PURCHASE_ORDERS
                ? allPurchaseOrdersLoadingPdf
                : type == TableTypes.ALL_SALES_ORDERS
                ? allSalesOrdersLoadingPdf
                : type == TableTypes.PURCHASE_ORDER_SUBUSER
                ? subUserPurchaseOrdersLoadingPdf
                : undefined
            }
          />
        </div>
      );
    },
  };
  return col;
}
