import { useTranslation } from "react-i18next";
import { TableTypes } from "../../../../utilities/types";
import { SubUserProfile } from "../../../../models/Responses";

interface SubUserTableModalProps {
  tableType: TableTypes;
  user: SubUserProfile | null;
}

export default function SubUserTableModal(props: SubUserTableModalProps) {
  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo">
          <i className="fa-regular fa-dolly sub-icon"></i>{" "}
          {props.tableType == TableTypes.REQUIREMENT && (
            <>
              {t("requirements")} {props.user?.numGoods}
            </>
          )}
          {props.tableType == TableTypes.OFFER && (
            <>
              {t("offers")} {props.user?.numGoods}
            </>
          )}
          {props.tableType == TableTypes.PURCHASE_ORDER && (
            <>
              {t("purchaseOrders")} {props.user?.numGoods}
            </>
          )}
          {props.user?.name}
        </div>
      </div>
    </div>
  );
}
