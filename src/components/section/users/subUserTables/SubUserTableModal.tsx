import { useTranslation } from "react-i18next";
import { Action, TableTypes } from "../../../../utilities/types";
import { SubUserProfile } from "../../../../models/Responses";
import { RequirementItemSubUser } from "../../../../models/MainInterfaces";
import GeneralTable from "../../../common/GeneralTable/GeneralTable";

interface SubUserTableModalProps {
  tableType: TableTypes;
  user: SubUserProfile | null;
  tableContent: RequirementItemSubUser[];
}

export default function SubUserTableModal(props: SubUserTableModalProps) {
  const { t } = useTranslation();

  function handleOnButtonClick(action: Action, data: any) {
    console.log(action, data);
  }

  return (
    <div className="modal-card">
      <div className="t-flex t-wrap mr-sub-2">
        <i className="fa-regular fa-dolly sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>
            {props.tableType == TableTypes.REQUIREMENT && (
              <>{t("requirements")}</>
            )}
            {props.tableType == TableTypes.OFFER && <>{t("offers")}</>}
            {props.tableType == TableTypes.PURCHASE_ORDER && (
              <>{t("purchaseOrders")}</>
            )}
          </div>
          <div className="calificar-detalle">{props.user?.name}</div>
          <div className="calificar-detalle">
            {t("quantity")}: {props.user?.numGoods}
          </div>
        </div>
      </div>
      <div className="detalle-oferta">
        <GeneralTable
          content={{
            type: TableTypes.REQUIREMENT_SUBUSER,
            data: props.tableContent,
            hiddenColumns: [],
            nameColumnHeader: t("requirements"),
            onButtonClick: handleOnButtonClick,
          }}
        />
      </div>
    </div>
  );
}
