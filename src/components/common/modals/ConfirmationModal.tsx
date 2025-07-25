import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  text: React.ReactNode;
  icon?: React.ReactNode;
  onClose: () => any;
  onAnswer: (ok: boolean) => any;
  loading?: boolean;
  showOnlyAcceptButton?: boolean;
}
export default function ConfirmationModal(props: ConfirmationModalProps) {
  const { t } = useTranslation();

  function closeModal(ok: boolean) {
    props.onAnswer(ok);
    // if (!ok)
    props.onClose();
  }

  return (
    <div className="modal-card">
      <div className="t-flex alert-base">
        {props.icon ?? (
          <i className="fa-regular fa-circle-exclamation sub-icon"></i>
        )}

        <div className="alert-info text-center">{props.text}</div>
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            onClick={() => closeModal(true)}
            children={t("acceptButton")}
            className="btn btn-default alert-boton"
            loading={props.loading}
          />
          {!props.showOnlyAcceptButton && (
            <ButtonContainer
              onClick={() => closeModal(false)}
              children={t("cancelButton")}
              common
              className="btn btn-second alert-boton"
            />
          )}
        </div>
      </div>
    </div>
  );
}
