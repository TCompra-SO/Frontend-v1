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
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [docType, setDocType] = useState("");

  function handleOpenLoginModal() {
    setIsOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setIsOpenLoginModal(false);
  }

  function handleOpenModal(login: boolean) {
    setShowLogin(login);
    handleOpenLoginModal();
  }

  function handleRegisterSuccess(email: string, docType: string) {
    setEmail(email);
    setDocType(docType);
    handleOpenModal(false);
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenLoginModal}
        onClose={handleCloseLoginModal}
        width={showLogin ? 850 : 1300}
        style={{ background: "transparent" }}
      >
        {showLogin ? (
          <Login onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          // <Profile email={email} docType={"RUC"} />
          <CreateRequirement />
        )}
      </NoContentModalContainer>
      <ButtonContainer onClick={() => handleOpenModal(true)}>
        Login
      </ButtonContainer>
      <ButtonContainer onClick={() => handleOpenModal(false)}>
        Profile
      </ButtonContainer>
    </>
  );
}
