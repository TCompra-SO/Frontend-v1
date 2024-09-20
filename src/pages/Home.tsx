import { lazy, useState } from "react";
import ButtonContainer from "../components/containers/ButtonContainer";

import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import ValidateCode from "../components/section/profile/ValidateCode.tsx";

const Login = lazy(() => import("./Login.tsx"));
const Profile = lazy(() => import("./Profile.tsx"));

export default function Home() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenValCodeModal, setIsOpenValCodeModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [docType, setDocType] = useState("");

  function handleOpenLoginModal() {
    setIsOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setIsOpenLoginModal(false);
  }

  function handleOpenValCodeModal(fromProfile: boolean = false) {
    if (fromProfile) setIsForgotPassword(false);
    setIsOpenValCodeModal(true);
  }

  function handleCloseValCodeModal() {
    setIsOpenValCodeModal(false);
  }

  function handleOpenModal(login: boolean) {
    setShowLogin(login);
    handleOpenLoginModal();
  }

  function handleRegisterSuccess(docType: string) {
    setDocType(docType);
    handleOpenModal(false);
  }

  function changeIsFromForgotPassword(type: boolean) {
    setIsForgotPassword(type);
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenLoginModal}
        onClose={handleCloseLoginModal}
        width={showLogin ? 800 : 1300}
        style={{ background: "transparent" }}
      >
        {showLogin ? (
          <Login
            onRegisterSuccess={handleRegisterSuccess}
            changeIsFromForgotPassword={changeIsFromForgotPassword}
            openValidateCodeModal={handleOpenValCodeModal}
            closeLoginModal={handleCloseLoginModal}
          />
        ) : (
          <Profile
            docType={docType}
            openValidateCodeModal={() => handleOpenValCodeModal(true)}
            closeProfileModal={handleCloseLoginModal}
          />
        )}
      </NoContentModalContainer>
      <ValidateCode
        isOpen={isOpenValCodeModal}
        onClose={handleCloseValCodeModal}
        isForgotPassword={isForgotPassword}
      />
      <ButtonContainer onClick={() => handleOpenModal(true)}>
        Login
      </ButtonContainer>
      {/* <ButtonContainer onClick={() => handleOpenModal(false)}>
        Crear
      </ButtonContainer> */}
    </>
  );
}
