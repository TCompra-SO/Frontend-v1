import {
  forwardRef,
  lazy,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import MainHeaderNoModals from "./MainHeaderNoModals.tsx";
import NoContentModalContainer from "../../containers/NoContentModalContainer.tsx";
import ValidateCode from "../../common/modals/ValidateCode.tsx";
import { loginKey } from "../../../utilities/globals.ts";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux.ts";

const Login = lazy(() => import("./../../../pages/Login.tsx"));
const Profile = lazy(() => import("./../../../pages/Profile.tsx"));

interface MainHeaderProps {
  onShowMenu?: (show: boolean) => void;
}

export interface MainHeaderRef {
  openloginModal: () => void;
}

export const MainHeader = forwardRef<MainHeaderRef, MainHeaderProps>(
  function MainHeader(props, ref) {
    const location = useLocation();
    const isLoadingUser = useSelector(
      (state: MainState) => state.loadingUser.isLoading
    );
    const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [isOpenValCodeModal, setIsOpenValCodeModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [docType, setDocType] = useState("");
    const hasOpenedLogin = useRef(false);

    /** Abrir modal desde fuera */
    useImperativeHandle(ref, () => ({
      openloginModal: () => handleOpenModal(true),
    }));

    /** Cerrar modal al iniciar sesión */

    useEffect(() => {
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Abrir modal de login */

    useEffect(() => {
      if (!isLoadingUser && !hasOpenedLogin.current && !isLoggedIn) {
        const pathIsHome = location.pathname === "/";
        if (pathIsHome) {
          const queryParams = new URLSearchParams(location.search);
          const login = queryParams.get("login");
          if (login === "true") {
            handleOpenModal(true);
            hasOpenedLogin.current = true;
          }
        }
      }
    }, [location, isLoadingUser]);

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
);
