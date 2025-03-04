import TextAreaContainer from "../../containers/TextAreaContainer";
import { useContext, useEffect, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import {
  Action,
  ActionLabel,
  RequirementType,
  ResponseRequestType,
  SystemNotificationType,
} from "../../../utilities/types";
import {
  useCancelOffer,
  useCancelRequirement,
} from "../../../hooks/requirementHooks";
import useShowNotification from "../../../hooks/utilHooks";
import { UseApiType } from "../../../hooks/useApi";
import useSystemNotification from "../../../hooks/useSystemNotification";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import {
  BasicNotificationData,
  NotificationTargetData,
} from "../../../models/MainInterfaces";
import dayjs from "dayjs";
import { getBasicRateData } from "../../../services/general/generalServices";

interface CancelPurchaseOrderModalProps {
  onClose: () => any;
  offerId: string;
  requirementId: string;
  fromRequirementTable: boolean;
  canceledByCreator: boolean;
  onCancelSuccess?: (offerId: string) => void;
  useCancelRequirementHook: ReturnType<typeof useCancelRequirement>;
  useCancelOfferHook: ReturnType<typeof useCancelOffer>;
  type: RequirementType;
  additionalApiParams: UseApiType;
  setAdditionalApiParams: (additionalParams: UseApiType) => void;
  notificationTargetData: NotificationTargetData;
  requirementTitle: string;
}

export default function CancelPurchaseOrderModal(
  props: CancelPurchaseOrderModalProps
) {
  const { t } = useTranslation();
  const { sendNotification } = useContext(MainSocketsContext);
  const { showNotification } = useShowNotification();
  const { getSystemNotification } = useSystemNotification();
  const [text, setText] = useState<string>("");
  const { cancelRequirement, loadingCancelRequirement } =
    props.useCancelRequirementHook;
  const { cancelOffer, loadingCancelOffer } = props.useCancelOfferHook;

  /** Generar notificación de sistema */

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: generateNotification,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Cerrar modal */

  useEffect(() => {
    if (loadingCancelOffer === false) props.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancelOffer]);

  useEffect(() => {
    if (loadingCancelRequirement === false) props.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancelRequirement]);

  /** Funciones */

  async function generateNotification(responseData: ResponseRequestType) {
    if (responseData) {
      let notification: BasicNotificationData | null = null;
      if (props.canceledByCreator) {
        const notificationFn = getSystemNotification(
          SystemNotificationType.CANCEL_MY_OFFER
        );
        notification = notificationFn(props.requirementTitle, props.type);
      } else {
        const notificationFn = getSystemNotification(
          SystemNotificationType.CANCEL_AN_OFFER
        );
        notification = notificationFn(props.type);
      }

      let receiverId: string = props.notificationTargetData.receiverId;
      if (!receiverId && !props.fromRequirementTable) {
        const { basicRateData } = await getBasicRateData(
          props.fromRequirementTable ? props.offerId : props.requirementId,
          props.fromRequirementTable,
          props.type
        );
        if (basicRateData)
          receiverId = basicRateData.subUserId ?? basicRateData.userId;
      }
      if (receiverId)
        sendNotification({
          ...notification,
          ...props.notificationTargetData,
          receiverId,
          timestamp: dayjs().toISOString(),
        });
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value.trim());
  }

  function cancelPurchaseOrder() {
    if (!text) {
      showNotification("error", t("mustIndicateReasonCancellation"));
      return;
    }
    if (props.fromRequirementTable)
      cancelRequirement(
        props.requirementId,
        Action.CANCEL_REQUIREMENT,
        props.type,
        text.trim()
      );
    else
      cancelOffer(
        props.offerId,
        props.type,
        props.canceledByCreator,
        Action.CANCEL_OFFER,
        text.trim()
      );
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
            loading={loadingCancelRequirement || loadingCancelOffer}
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
