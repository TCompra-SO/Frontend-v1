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

      {props.state == CertificationState.PENDING ? (
        <div className="certificado-estado-1">
          <i className="fa-regular fa-face-thinking"></i>{" "}
          {t("pendingCertificationMsg")}
        </div>
      ) : props.state == CertificationState.CERTIFIED ? (
        <div className="certificado-estado-2">
          <i className="fa-regular fa-face-smile"></i>{" "}
          {t("youAreCertifiedWithThisCompany")}
        </div>
      ) : props.state == CertificationState.REJECTED ? (
        <div className="certificado-estado-3">
          <i className="fa-regular fa-face-disappointed"></i>{" "}
          {t("rejectedCertificationMsg")}
        </div>
      ) : (
        <div className="t-flex j-conten">
          <ButtonContainer
            className="btn btn-green btn-certificate"
            icon={<i className="fa-regular fa-diploma"></i>}
            onClick={openGetCertifiedModal}
          >
            {t("getCertified")}
          </ButtonContainer>
        </div>
      )}
    </>
  );
}
