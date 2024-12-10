import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";
import { CertificationState, ModalTypes } from "../../../utilities/types";
import { useState } from "react";
import { ModalContent } from "../../../models/Interfaces";
import ModalContainer from "../../containers/ModalContainer";
import { mainModalScrollStyle } from "../../../utilities/globals";

interface ViewDocsReceivedCertificateProps {
  data: CertificationItem;
  docs: CertificateFile[];
  readOnly?: boolean;
  onClose: () => any;
}

export default function ViewDocsReceivedCertificate(
  props: ViewDocsReceivedCertificateProps
) {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

  function submit(approve: boolean) {
    console.log(approve);
  }

  function resend() {
    setDataModal({
      type: ModalTypes.SELECT_DOCS_CERT,
      data: {
        data: {
          userId: "2222222",
          userName: "Uiversidad nacional de san agustín",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
      },
    });
    setIsOpenModal(true);
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
                <div className="dato-empresa">
                  {!props.readOnly && (
                    <TextAreaContainer
                      className="form-control wd-100"
                      autoSize
                      placeholder={`${t("notes")}...`}
                      maxLength={Lengths.certificationNotes.max}
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
            >
              {t(props.readOnly ? "acceptButton" : "certify")}
            </ButtonContainer>
            {(!props.readOnly ||
              (props.readOnly &&
                props.data.state == CertificationState.REJECTED)) && (
              <ButtonContainer
                className="btn alert-boton btn-green-o"
                onClick={props.readOnly ? () => resend() : () => submit(false)}
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
