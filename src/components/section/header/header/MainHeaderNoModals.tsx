import { Dropdown, MenuProps, Space } from "antd";
import Premium from "../items/Premium";
import Notification from "../items/Notification";
import Chat from "../items/Chat";
import UserName from "../items/UserName";
import Logout from "../items/Logout";
import { CSSProperties, useEffect, useState } from "react";
import ProfileMenu from "../items/ProfileMenu";
import useWindowSize from "../../../../hooks/useWindowSize";
import { windowSize } from "../../../../utilities/globals";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../../../hooks/authHook";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { getSectionFromRoute } from "../../../../utilities/globalFunctions";
import { pageRoutes } from "../../../../utilities/routes";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useNavigate } from "react-router-dom";

interface MainHeaderNoModalsProps {
  onShowMenu?: (show: boolean) => void;
  onOpenLoginModal?: () => void;
}

export default function MainHeaderNoModals(props: MainHeaderNoModalsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [logoSrc, setLogoSrc] = useState("/src/assets/images/logo-white.svg");
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const [currentSection, setCurrentSection] = useState(pageRoutes.home);
  const logout = useLogout();
  const [showMenuButtonStyle, setShowMenuButtonStyle] = useState<CSSProperties>(
    { display: "none" }
  );
  const [dropdownItems, setDropdownItems] = useState([
    {
      key: "profile",
      label: (
        <Space style={{ margin: "-10px 0" }}>
          <ProfileMenu />
          {t("myProfile")}
        </Space>
      ),
    },
    {
      key: "logout",
      label: (
        <Space style={{ margin: "-10px 0" }}>
          <Logout /> {t("logout")}
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    setCurrentSection(getSectionFromRoute(location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (width > windowSize.md) {
      setShowMenuButtonStyle({ display: "none" });
      setDropdownItems([
        {
          key: "profile",
          label: (
            <Space style={{ margin: "-10px 0" }}>
              <ProfileMenu />
              {t("myProfile")}
            </Space>
          ),
        },
        {
          key: "logout",
          label: (
            <Space style={{ margin: "-10px 0" }}>
              <Logout />
              {t("logout")}
            </Space>
          ),
        },
      ]);
    } else {
      setShowMenuButtonStyle({});
      setDropdownItems([
        {
          key: "notification",
          label: (
            <Space style={{ margin: "-10px 0" }} size={16}>
              <Notification />
              {t("notifications")}
            </Space>
          ),
        },
        {
          key: "chat",
          label: (
            <Space style={{ margin: "-10px 0" }}>
              <Chat />
              {t("chat")}
            </Space>
          ),
        },
        {
          key: "profile",
          label: (
            <Space style={{ margin: "-10px 0" }} size={16}>
              <ProfileMenu />
              {t("myProfile")}
            </Space>
          ),
        },
        {
          key: "logout",
          label: (
            <Space style={{ margin: "-10px 0" }}>
              <Logout />
              {t("logout")}
            </Space>
          ),
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (width > windowSize.sm) {
      if (currentSection == pageRoutes.home)
        setLogoSrc("/src/assets/images/logo-white.svg");
      else setLogoSrc("/src/assets/images/logo-black.svg");
    } else setLogoSrc("/src/assets/images/favicon.svg");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, currentSection]);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        logout();
        break;
      case "profile":
        navigate(`${pageRoutes.profile}`);
        break;
    }
  };

  return (
    <header>
      {isLoggedIn ? (
        <div
          className={`t-flex header-tc  ${
            currentSection == pageRoutes.home ||
            currentSection == pageRoutes.productDetail
              ? "header-menu"
              : ""
          }`}
        >
          {props.onShowMenu && (
            <>
              <i
                className="fa-solid fa-bars-progress i-menu"
                style={showMenuButtonStyle}
                onClick={() => props.onShowMenu?.(true)}
              ></i>
              <div></div>
            </>
          )}
          {(currentSection == pageRoutes.home ||
            currentSection == pageRoutes.productDetail) && (
            <img src={logoSrc} className="logo-header" alt="Logo" />
          )}
          <div className="t-flex options-tc">
            <Premium />
            {width > windowSize.md && (
              <>
                <Chat />
                <Notification />
              </>
            )}
            <UserName />
            <Dropdown
              menu={{ items: dropdownItems, onClick: onClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <i
                className="fa-regular fa-caret-down"
                style={{
                  padding: "5px",
                  marginLeft: "-5px",
                  cursor: "pointer",
                }}
              ></i>
            </Dropdown>
          </div>
        </div>
      ) : (
        <header>
          <div className="t-flex header-tc header-menu">
            <img src={logoSrc} alt="Logo" style={{ height: "48px" }} />
            <div className="t-flex options-tc">
              <ButtonContainer
                className="btn btn-default"
                onClick={() => props.onOpenLoginModal?.()}
                icon={<i className="fa-regular fa-user"></i>}
              >
                <span className="req-btn-info">
                  {t("login")}/{t("register")}
                </span>
              </ButtonContainer>
            </div>
          </div>
        </header>
      )}
    </header>
  );
}
