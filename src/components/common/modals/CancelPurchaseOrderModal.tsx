import { App } from "antd";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { SyntheticEvent, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import showNotification from "../../../utilities/notification/showNotification";
import { Action, ActionLabel } from "../../../utilities/types";

interface CancelPurchaseOrderModalProps {
  onClose: (e: SyntheticEvent<Element, Event>) => any;
  offerId: string;
  requirementId: string;
  fromRequirementTable: boolean;
}

export default function CancelPurchaseOrderModal(
  props: CancelPurchaseOrderModalProps
) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  function cancelPurchaseOrder(e: SyntheticEvent<Element, Event>) {
    console.log(props.offerId, props.requirementId, text);
    if (!text) {
      showNotification(
        notification,
        "error",
        t("mustIndicateReasonCancellation")
      );
      return;
    }
    props.onClose(e);
  }

  return (
    <div className="modal-card">
      <div className="t-flex alert-base">
        <i className="fa-regular fa-circle-exclamation sub-icon"></i>
        <div className="text-center">
          <div className="alert-info">
            {props.fromRequirementTable
              ? t(ActionLabel[Action.CANCEL_REQUIREMENT])
              : t(ActionLabel[Action.CANCEL_PURCHASE_ORDER])}
          </div>
          <div
            className="alert-info"
            style={{ fontSize: "18px", color: "rgb(59 76 86 / 80%)" }}
          >
            {t("indicateReasonCancellation")}
          </div>
        </div>
        <div className="t-flex wd-100">
          <TextAreaContainer
            // rows={4}

            placeholder={t("reason")}
            maxLength={Lengths.reasonCancellation.max}
            onChange={handleTextChange}
            className="form-control wd-100"
            autoSize
          />
        </div>
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            children={t("acceptButton")}
            onClick={cancelPurchaseOrder}
            className="btn btn-default alert-boton"
          />
          <ButtonContainer
            children={t("cancelButton")}
            onClick={props.onClose}
            className="btn btn-second alert-boton"
          />
        </div>
      </div>
    </div>
  );
}
