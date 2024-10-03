import { useTranslation } from "react-i18next";
import { Action, TableTypes } from "../../../../utilities/types";
import { SubUserProfile } from "../../../../models/Responses";
import {
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
} from "../../../../models/MainInterfaces";
import GeneralTable from "../../../common/GeneralTable/GeneralTable";

interface SubUserTableModalProps {
  user: SubUserProfile | null;
  content:
    | {
        tableType: TableTypes.REQUIREMENT_SUBUSER;
        tableContent: RequirementItemSubUser[];
      }
    | {
        tableType: TableTypes.OFFER_SUBUSER;
        tableContent: OfferItemSubUser[];
      }
    | {
        tableType: TableTypes.PURCHASE_ORDER_SUBUSER;
        tableContent: PurchaseOrderItemSubUser[];
      };
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
            {props.content.tableType == TableTypes.REQUIREMENT_SUBUSER && (
              <>{t("requirements")}</>
            )}
            {props.content.tableType == TableTypes.OFFER_SUBUSER && (
              <>{t("offers")}</>
            )}
            {props.content.tableType == TableTypes.PURCHASE_ORDER_SUBUSER && (
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
        {props.content.tableType == TableTypes.REQUIREMENT_SUBUSER && (
          <GeneralTable
            content={{
              type: props.content.tableType,
              data: props.content.tableContent,
              hiddenColumns: [],
              nameColumnHeader: t("requirements"),
              onButtonClick: handleOnButtonClick,
            }}
          />
        )}
        {props.content.tableType == TableTypes.OFFER_SUBUSER && (
          <GeneralTable
            content={{
              type: props.content.tableType,
              data: props.content.tableContent,
              hiddenColumns: [],
              nameColumnHeader: t("offers"),
              onButtonClick: handleOnButtonClick,
            }}
          />
        )}
        {props.content.tableType == TableTypes.PURCHASE_ORDER_SUBUSER && (
          <GeneralTable
            content={{
              type: props.content.tableType,
              data: props.content.tableContent,
              hiddenColumns: [],
              nameColumnHeader: t("purchaseOrders"),
              onButtonClick: handleOnButtonClick,
            }}
          />
        )}
      </div>
    </div>
  );
}
