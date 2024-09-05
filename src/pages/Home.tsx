import { useState } from "react";
import ButtonContainer from "../components/containers/ButtonContainer";
import Login from "./Login";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import Profile from "./Profile";

export default function Home() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

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

  return (
    <>
      <NoContentModalContainer
        open={isOpenLoginModal}
        onClose={handleCloseLoginModal}
        width={showLogin ? 850 : 1300}
        style={{ background: "transparent" }}
      >
        {showLogin ? <Login /> : <Profile />}
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
