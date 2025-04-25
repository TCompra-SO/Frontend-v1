import { lazy, useEffect, useState } from "react";
import MainHeaderNoModals from "./header/MainHeaderNoModals.tsx";
import NoContentModalContainer from "../../containers/NoContentModalContainer.tsx";
import ValidateCode from "../profile/ValidateCode.tsx";
import { loginKey } from "../../../utilities/globals.ts";

const Login = lazy(() => import("./../../../pages/Login.tsx"));
const Profile = lazy(() => import("./../../../pages/Profile.tsx"));

interface MainHeaderProps {
  onShowMenu?: (show: boolean) => void;
}

export default function MainHeader(props: MainHeaderProps) {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenValCodeModal, setIsOpenValCodeModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [docType, setDocType] = useState("");

  /** Cerrar modal al iniciar sesión */

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function handleStorageChange(event: StorageEvent) {
    if (
      event.key === loginKey &&
      event.newValue &&
      event.oldValue !== event.newValue
    ) {
      handleCloseLoginModal();
    }
  }

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
      <MainHeaderNoModals
        onShowMenu={props.onShowMenu}
        onOpenLoginModal={() => {
          handleOpenModal(true);
        }}
      />
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
    </>
  );
}
