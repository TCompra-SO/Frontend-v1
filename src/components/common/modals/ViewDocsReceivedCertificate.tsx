import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";
import {
  CertificationState,
  ErrorMsgRequestType,
  ErrorRequestType,
  ModalTypes,
  ResponseRequestType,
} from "../../../utilities/types";
import { useEffect, useState } from "react";
import { CommonModalProps, ModalContent } from "../../../models/Interfaces";
import ModalContainer from "../../containers/ModalContainer";
import { mainModalScrollStyle } from "../../../utilities/globals";
import { updateCertificationStateService } from "../../../services/requests/certificateService";
import { UpdateCertificationStateRequest } from "../../../models/Requests";
import useShowNotification from "../../../hooks/utilHook";

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
  const { showNotification } = useShowNotification();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [certApproved, setCertApproved] = useState(false);
  const [note, setNote] = useState("");
  const { loading } = props.useApiHook;
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

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
            t(certApproved ? "certificationApproved" : "certificationRejected")
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
        certificationId: props.data.uid,
        data: {
          userId: props.data.companyId,
          userName: props.data.companyName,
        },
      },
    });
    setIsOpenModal(true);
    props.onClose();
  }

  function submit(approve: boolean) {
    if (!approve && !note) {
      showNotification("error", t("mustProvideReasonCertification"));
      return;
    }
    setCertApproved(approve);
    const data: UpdateCertificationStateRequest = {
      certificateID: props.data.uid,
      state: approve
        ? CertificationState.CERTIFIED
        : CertificationState.REJECTED,
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
                loading={loading}
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
