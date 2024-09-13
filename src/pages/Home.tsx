import { lazy, useState } from "react";
import ButtonContainer from "../components/containers/ButtonContainer";

import NoContentModalContainer from "../components/containers/NoContentModalContainer";
// import Profile from "./Profile.tsx";

const Login = lazy(() => import("./Login.tsx"));
const Profile = lazy(() => import("./Profile.tsx"));
const CreateRequirement = lazy(
  () => import("../components/section/create-requirement/CreateRequirement.tsx")
);

export default function Home() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(0);
  const [email, setEmail] = useState("");
  const [docType, setDocType] = useState("");

  function handleOpenLoginModal() {
    setIsOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setIsOpenLoginModal(false);
  }

  function handleOpenModal(login: number) {
    setShowLogin(login);
    handleOpenLoginModal();
  }

  function handleRegisterSuccess(email: string, docType: string) {
    setEmail(email);
    setDocType(docType);
    handleOpenModal(1);
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenLoginModal}
        onClose={handleCloseLoginModal}
        width={showLogin ? 850 : 1300}
        style={{ background: "transparent" }}
      >
        {showLogin == 0 ? (
          <Login onRegisterSuccess={handleRegisterSuccess} />
        ) : showLogin == 1 ? (
          <Profile email={email} docType={docType} />
        ) : (
          <CreateRequirement />
        )}
      </NoContentModalContainer>
      <ButtonContainer onClick={() => handleOpenModal(0)}>
        Login
      </ButtonContainer>
      <ButtonContainer onClick={() => handleOpenModal(2)}>
        Crear
      </ButtonContainer>
    </>
  );
}
