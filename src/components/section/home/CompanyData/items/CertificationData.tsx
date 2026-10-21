import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Action,
  CertificationState,
  EntityType,
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

  // 👇 Usuario LOGUEADO desde Redux (no props.user, que es la empresa)
  const currentUser = useSelector((state: any) =>
    state.user?.user ??
    state.user ??
    state.userReducer?.user ??
    state.auth?.user ??
    state.session?.user ??
    state.userState?.user
  );
  const isSubUser = currentUser?.typeEntity === EntityType.SUBUSER;



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
    setIsOpenModal(true);
  }

  console.log("🔍 currentUser:", currentUser);
  console.log("🔍 typeEntity:", currentUser?.typeEntity);
  console.log("🔍 isSubUser:", isSubUser);
  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />

      {/* 1. PENDIENTE / REENVIADO (informativo para todos) */}
      {props.state === CertificationState.PENDING ||
        props.state === CertificationState.RESENT ? (
        <div className="certificado-estado-1 t-flex f-column gap-10">
          <div className="t-flex a-center gap-10">
            <i className="fa-regular fa-clock"></i>
            <span>
              {t(
                "pendingCertificationProfessionalMsg",
                "Su solicitud de certificación se encuentra en proceso de revisión por parte de la empresa."
              )}
            </span>
          </div>
        </div>
      ) : /* 2. CERTIFICADO (informativo para todos) */
        props.state === CertificationState.CERTIFIED ? (
          <div className="certificado-estado-2 t-flex a-center gap-10">
            <i className="fa-regular fa-circle-check"></i>
            <span>
              {t(
                "certifiedProfessionalMsg",
                "Actualmente cuenta con una certificación activa con esta empresa."
              )}
            </span>
          </div>
        ) : /* 3. SUBUSUARIO → solo mensaje, sin botón */
          isSubUser ? (
            <div className="certificado-estado-3 t-flex f-column gap-10">
              <div className="t-flex a-center gap-10">
                <i className="fa-regular fa-circle-info"></i>
                <span>
                  {t(
                    "subUserCannotRequestCertification",
                    "Tu empresa aún no está certificada. Contacta al administrador de tu empresa para poder certificarla."
                  )}
                </span>
              </div>
            </div>
          ) : /* 4. RECHAZADO (empresa) → botón de reintentar */
            props.state === CertificationState.REJECTED ? (
              <div className="t-flex f-column gap-15 certificado-estado-3">
                <div className="t-flex a-center gap-10">
                  <i className="fa-regular fa-triangle-exclamation"></i>
                  <span>
                    {t(
                      "rejectedCertificationProfessionalMsg",
                      "Su solicitud anterior no fue aprobada. Puede revisar los requisitos y volver a enviar su postulación."
                    )}
                  </span>
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
              /* 5. NINGUNO (empresa) → botón de solicitar */
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