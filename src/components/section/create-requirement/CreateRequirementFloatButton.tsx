import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { lazy, useEffect, useState } from "react";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import { useLocation, useNavigate } from "react-router-dom";
import { isHome } from "../../../utilities/globalFunctions";
import { pageRoutes } from "../../../utilities/routes";

const CreateRequirement = lazy(
  () => import("../create-requirement/CreateRequirement")
);

export default function CreateRequirementFloatButton() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    setIsHomePage(isHome(location.pathname));
  }, [location]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
            {!isHomePage && (
              <FloatButton
                icon={<i className="fa-regular fa-house"></i>}
                tooltip={t("home")}
                type="primary"
                onClick={() => navigate(pageRoutes.home)}
              />
            )}
            <FloatButton
              icon={<i className="fa-solid fa-plus" />}
              type="primary"
              tooltip={t("createRequirement")}
              onClick={() => setIsOpenModal(true)}
            />
          </FloatButton.Group>

          <NoContentModalContainer
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            width={850}
            closable={true}
            maskClosable={false}
          >
            <CreateRequirement closeModal={() => setIsOpenModal(false)} />
          </NoContentModalContainer>
        </>
      ) : null}
    </>
  );
}
