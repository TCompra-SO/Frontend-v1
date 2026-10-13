import { useTranslation } from "react-i18next";
import {
  Action,
  CertificationState,
  ModalTypes,
} from "../../../../../utilities/types";
import ModalContainer from "../../../../containers/ModalContainer";
import { useState } from "react";
import { ModalContent } from "../../../../../models/Interfaces";
import { mainModalScrollStyle } from "../../../../../utilities/globals";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { FullUser } from "../../../../../models/MainInterfaces";

interface CertificationDataProps {
  state: CertificationState;
  user: FullUser;
  onRequestSent: () => void;
}

export default function CertificationData(props: CertificationDataProps) {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });

  function openGetCertifiedModal() {
    setDataModal({
      type: ModalTypes.SELECT_DOCS_CERT,
      data: {
        onRequestSent: props.onRequestSent,
        data: {
          userId: props.user.uid,
          userName: props.user.name,
        },
      },
      action: Action.SELECT_CERT_TO_SEND,
    });
    setIsOpenModal(true); // Ojo: mantenemos tu lógica original de setIsOpenModal(true)
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

      {/* 1. ESTADO: PENDIENTE */}
      {props.state === CertificationState.PENDING || props.state === CertificationState.RESENT ? (
        <div className="certificado-estado-1 t-flex f-column gap-10">
          <div className="t-flex a-center gap-10">
            <i className="fa-regular fa-clock"></i>
            <span>{t("pendingCertificationProfessionalMsg", "Su solicitud de certificación se encuentra en proceso de revisión por parte de la empresa.")}</span>
          </div>
        </div>
      ) : /* 2. ESTADO: CERTIFICADO */
        props.state === CertificationState.CERTIFIED ? (
          <div className="certificado-estado-2 t-flex a-center gap-10">
            <i className="fa-regular fa-circle-check"></i>
            <span>{t("certifiedProfessionalMsg", "Actualmente cuenta con una certificación activa con esta empresa.")}</span>
          </div>
        ) : /* 3. ESTADO: RECHAZADO (Muestra mensaje y botón para reintentar) */
          props.state === CertificationState.REJECTED ? (
            <div className="t-flex f-column gap-15 certificado-estado-3">
              <div className="t-flex a-center gap-10">
                <i className="fa-regular fa-triangle-exclamation"></i>
                <span>{t("rejectedCertificationProfessionalMsg", "Su solicitud anterior no fue aprobada. Puede revisar los requisitos y volver a enviar su postulación.")}</span>
              </div>
              <div className="t-flex j-conten">
                <ButtonContainer
                  className="btn btn-green btn-certificate"
                  icon={<i className="fa-regular fa-diploma"></i>}
                  onClick={openGetCertifiedModal}
                >
                  {t("reapplyForCertification", "Volver a solicitar certificación")}
                </ButtonContainer>
              </div>
            </div>
          ) : (
            /* 4. ESTADO: NINGUNO (Por defecto) */
            <div className="t-flex j-conten">
              <ButtonContainer
                className="btn btn-green btn-certificate"
                icon={<i className="fa-regular fa-diploma"></i>}
                onClick={openGetCertifiedModal}
              >
                {t("getCertified", "Solicitar certificación")}
              </ButtonContainer>
            </div>
          )}
    </>
  );
}