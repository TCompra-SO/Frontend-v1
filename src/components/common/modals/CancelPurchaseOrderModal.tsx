import { App } from "antd";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { useEffect, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import showNotification from "../../../utilities/notification/showNotification";
import { Action, ActionLabel } from "../../../utilities/types";
import { useCancelRequirement } from "../../../hooks/requirementHook";

interface CancelPurchaseOrderModalProps {
  onClose: () => any;
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
  const { cancelRequirement, loadingCancel } = useCancelRequirement();

  useEffect(() => {
    if (loadingCancel === false) props.onClose();
  }, [loadingCancel]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  function cancelPurchaseOrder() {
    if (!text) {
      showNotification(
        notification,
        "error",
        t("mustIndicateReasonCancellation")
      );
      return;
    }
    cancelRequirement(props.requirementId, text.trim());
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
            loading={loadingCancel}
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
