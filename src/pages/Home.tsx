import { useState } from "react";
import ButtonContainer from "../components/containers/ButtonContainer";
import Login from "./Login";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";

export default function Home() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  function handleOpenLoginModal() {
    setIsOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setIsOpenLoginModal(false);
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenLoginModal}
        onClose={handleCloseLoginModal}
        width={850}
        className="no-padding-modal"
        // style={{ maxHeight: "75vh", padding: 0 }}
        style={{ background: "transparent" }}
      >
        <Login />
      </NoContentModalContainer>
      <ButtonContainer onClick={handleOpenLoginModal}>Login</ButtonContainer>
    </>
  );
}
