import { useTranslation } from "react-i18next";
import { CertificationState, ModalTypes } from "../../../../../utilities/types";
import ModalContainer from "../../../../containers/ModalContainer";
import { useState } from "react";
import { ModalContent } from "../../../../../models/Interfaces";
import { mainModalScrollStyle } from "../../../../../utilities/globals";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { FullUser } from "../../../../../models/MainInterfaces";

interface CertificationDataProps {
  state: CertificationState;
  user: FullUser;
}

export default function CertificationData(props: CertificationDataProps) {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

  function openGetCertifiedModal() {
    //r3v
    setDataModal({
      type: ModalTypes.SELECT_DOCS_CERT,
      data: {
        data: {
          userId: props.user.uid,
          userName: props.user.name,
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
