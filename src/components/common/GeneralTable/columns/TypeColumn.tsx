import { ColumnType } from "antd/es/table";
import {
  OfferItemSubUser,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
} from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { getLabelFromRequirementType } from "../../../../utilities/globalFunctions";
import { typeColumnKey } from "../../../../utilities/globals";

export default function TypeColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<
    | RequirementItemSubUser
    | OfferItemSubUser
    | PurchaseOrderItemSubUser
    | PurchaseOrder
  > = {
    title: t("type"),
    dataIndex: "type",
    align: "center",
    key: typeColumnKey,
    hidden,
    width: 100,
    render: (_, record) => (
      <>
        <div style={{ textAlign: "left" }} className={`t-flex dato-table`}>
          {t(getLabelFromRequirementType(record.type, false))}
        </div>
      </>
    ),
  };
  return col;
}
