import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";
import {
  Action,
  CertificationState,
  CertificationTableType,
  ErrorMsgRequestType,
  ErrorRequestType,
  ModalTypes,
  ResponseRequestType,
  SystemNotificationType,
} from "../../../utilities/types";
import { useContext, useEffect, useRef, useState } from "react";
import { CommonModalProps, ModalContent } from "../../../models/Interfaces";
import ModalContainer from "../../containers/ModalContainer";
import { mainModalScrollStyle } from "../../../utilities/globals";
import { updateCertificationStateService } from "../../../services/requests/certificateService";
import { UpdateCertificationStateRequest } from "../../../models/Requests";
import useShowNotification from "../../../hooks/utilHooks";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import useSystemNotification from "../../../hooks/useSystemNotification";
import dayjs from "dayjs";
import { getInitialModalData } from "../../../utilities/globalFunctions";

interface ViewDocsReceivedCertificateProps extends CommonModalProps {
  data: CertificationItem;
  docs: CertificateFile[];
  readOnly?: boolean;
  onClose: () => any;
}

export default function ViewDocsReceivedCertificate(
  props: ViewDocsReceivedCertificateProps
) {
  const { t } = useTranslation();
  const { getNotification } = useContext(MainSocketsContext);
  const { getSystemNotification } = useSystemNotification();
  const { showNotification } = useShowNotification();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [certApproved, setCertApproved] = useState(false);
  const [note, setNote] = useState("");
  const { loading } = props.useApiHook;
  const certApprovedRef = useRef(certApproved);
  const [resendLoading, setResendLoading] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );

  useEffect(() => {
    certApprovedRef.current = certApproved;
  }, [certApproved]);

  /** Para certificar o rechazar */

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          showNotification(
            "success",
            t(
              certApprovedRef.current
                ? "certificationApproved"
                : "certificationRejected"
            )
          );
          props.onClose();
        } else if (error) {
          showNotification("error", errorMsg);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(e.target.value.trim());
  }

  function resend() {
    setDataModal({
      type: ModalTypes.SELECT_DOCS_CERT,
      data: {
        certificationId: props.data.key,
        data: {
          userId: props.data.companyId,
          userName: props.data.companyName,
        },
        onRequestSent: () => props.onClose(),
        setLoading: setResendLoading,
      },
      action: Action.SELECT_CERT_TO_SEND,
    });
    setIsOpenModal(true);
  }

  function submit(approve: boolean) {
    if (!approve && !note) {
      showNotification("error", t("mustProvideReasonCertification"));
      return;
    }
    setCertApproved(approve);

    const notificationFn = getSystemNotification(
      SystemNotificationType.CERTIFICATE_COMPANY
    );
    const basicNotification = notificationFn(certApprovedRef.current);
    const notification = getNotification({
      ...basicNotification,
      timestamp: dayjs().toISOString(),
      receiverId: props.data.companyId,
      targetId: props.data.key,
      targetType: CertificationTableType.SENT,
    });

    const data: UpdateCertificationStateRequest = {
      certificateID: props.data.key,
      state: approve
        ? CertificationState.CERTIFIED
        : CertificationState.REJECTED,
      notification,
    };
    if (note) data.note = note;

    props.setApiParams({
      service: updateCertificationStateService(),
      method: "post",
      dataToSend: data,
    });
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />

      <div className="modal-card img-bg-certificado">
        <div className="t-flex mr-sub-2">
          <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
          <div className="sub-titulo sub-calificar">
            <div>{t("certificates")}</div>
            <div className="calificar-detalle">
              {t(props.readOnly ? "sentDocuments" : "receivedDocuments")}
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 preguntas">
          {((props.readOnly && props.data.note) || !props.readOnly) && (
            <div className="t-flex gap-15">
              <div className="card-ofertas cert-datos">
                <div className="dato-empresa text-left">
                  {!props.readOnly && (
                    <TextAreaContainer
                      className="form-control wd-100"
                      autoSize
                      placeholder={`${t("notes")}...`}
                      maxLength={Lengths.certificationNotes.max}
                      onChange={handleTextChange}
                    />
                  )}
                  {props.readOnly && <>{props.data.note}</>}
                </div>
              </div>
            </div>
          )}
          {props.docs.map((obj, index) => (
            <div key={index} className="card-ofertas certificado-bloque">
              <div className="t-flex oferta-titulo gap-10">
                <div className="icon-doc-estado">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="oferta-datos t-wrap m-0">
                    <div className="text-truncate doc-name">
                      {obj.documentName}
                    </div>
                  </div>
                  <div className="t-flex oferta-descripcion">
                    <div className="text-truncate detalles-oferta">
                      {obj.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="t-flex gap-15 wd-100 alert-btn">
            <ButtonContainer
              className="btn alert-boton btn-green"
              onClick={() => (props.readOnly ? props.onClose() : submit(true))}
              loading={loading}
            >
              {t(props.readOnly ? "acceptButton" : "certify")}
            </ButtonContainer>
            {(!props.readOnly ||
              (props.readOnly &&
                props.data.state == CertificationState.REJECTED)) && (
              <ButtonContainer
                className="btn alert-boton btn-green-o"
                onClick={props.readOnly ? () => resend() : () => submit(false)}
                loading={loading || resendLoading}
              >
                {t(props.readOnly ? "resend" : "reject")}
              </ButtonContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
