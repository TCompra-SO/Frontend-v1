import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isChat, isHome } from "../../../utilities/globalFunctions";
import { pageRoutes } from "../../../utilities/routes";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { windowSize } from "../../../utilities/globals";

const CreateRequirement = lazy(
  () => import("../create-requirement/CreateRequirement")
);

export default function CreateRequirementFloatButton() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isLoading = useSelector((state: MainState) => state.loading.isLoading);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [isChatPage, setIsChatPage] = useState(false);
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);

  useEffect(() => {
    setIsHomePage(isHome(location.pathname));
    setIsChatPage(isChat(location.pathname));
  }, [location]);

  return (
    <>
      {!isLoading &&
      (width > windowSize.sm || (width <= windowSize.sm && !isChatPage)) ? (
        <>
          <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
            {!isHomePage && (
              <FloatButton
                icon={
                  <i
                    className="fa-regular fa-house"
                    style={{ marginLeft: "-1px" }}
                  ></i>
                }
                tooltip={t("home")}
                type="primary"
                onClick={() => navigate(pageRoutes.home)}
              />
            )}
            {isLoggedIn && (
              <FloatButton
                icon={<i className="fa-solid fa-plus" />}
                type="primary"
                tooltip={t("createRequirement")}
                onClick={() => setIsOpenModal(true)}
              />
            )}
          </FloatButton.Group>

          {isLoggedIn && (
            <NoContentModalContainer
              open={isOpenModal}
              onClose={() => setIsOpenModal(false)}
              width={850}
              closable={true}
              maskClosable={false}
            >
              <CreateRequirement closeModal={() => setIsOpenModal(false)} />
            </NoContentModalContainer>
          )}
        </>
      ) : null}
    </>
  );
}
