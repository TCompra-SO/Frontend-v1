import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  text: React.ReactNode;
  icon?: React.ReactNode;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
  onAnswer: (ok: boolean) => any;
  loading?: boolean;
}
export default function ConfirmationModal(props: ConfirmationModalProps) {
  function closeModal(e: React.SyntheticEvent<Element, Event>, ok: boolean) {
    props.onAnswer(ok);
    if (props.loading !== undefined) props.onClose(e);
  }

  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="t-flex alert-base">
        {props.icon ?? (
          <i className="fa-regular fa-circle-exclamation sub-icon"></i>
        )}

        <div className="alert-info text-center">{props.text}</div>
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            onClick={(e) => closeModal(e, true)}
            children={t("acceptButton")}
            className="btn btn-default alert-boton"
            loading={props.loading}
          />
          <ButtonContainer
            onClick={(e) => closeModal(e, false)}
            children={t("cancelButton")}
            className="btn btn-second alert-boton"
          />
        </div>
      </div>
    </div>
  );
}
