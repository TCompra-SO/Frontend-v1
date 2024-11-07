import { lazy, useEffect, useState } from "react";
import ButtonContainer from "../components/containers/ButtonContainer";

import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import ValidateCode from "../components/section/profile/ValidateCode.tsx";
import { useTranslation } from "react-i18next";
import { TableTypeRequirement } from "../models/Interfaces.ts";
import {
  RequirementType,
  TableColumns,
  TableTypes,
} from "../utilities/types.ts";
import GeneralTable from "../components/common/GeneralTable/GeneralTable.tsx";
import useSocket from "../socket/useSocket.tsx";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes.ts";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux.ts";

const Login = lazy(() => import("./Login.tsx"));
const Profile = lazy(() => import("./Profile.tsx"));

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenValCodeModal, setIsOpenValCodeModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [docType, setDocType] = useState("");
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);

  const { requirements: tableData, loading: loadingTable } = useSocket();
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: tableData,
    subType: RequirementType.GOOD,
    hiddenColumns: [
      TableColumns.CATEGORY,
      TableColumns.OFFERS,
      TableColumns.ACTION,
      TableColumns.STATE,
    ],
    nameColumnHeader: t("goods"),
    onButtonClick: () => {},
  });

  useEffect(() => {
    setTableContent((prevContent) => ({
      ...prevContent,
      data: tableData,
    }));
  }, [tableData]);

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

      <ButtonContainer
        onClick={() => {
          isLoggedIn
            ? navigate(`${pageRoutes.myRequirements}`)
            : handleOpenModal(true);
        }}
      >
        {isLoggedIn ? t("myRequirements") : t("login")}
      </ButtonContainer>

      <div className="table-responsive">
        <GeneralTable
          content={tableContent}
          loading={loadingTable}
          onRowAction
        />
      </div>
    </>
  );
}
