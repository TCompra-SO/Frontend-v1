import { Dropdown, MenuProps, Space } from "antd";
import Premium from "../items/Premium";
import Chat from "../items/Chat";
import UserName from "../items/UserName";
import Logout from "../items/Logout";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import ProfileMenu from "../items/ProfileMenu";
import useWindowSize from "../../../../hooks/useWindowSize";
import { windowSize } from "../../../../utilities/globals";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../../../hooks/authHooks";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { getSectionFromRoute } from "../../../../utilities/globalFunctions";
import { pageRoutes } from "../../../../utilities/routes";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../../../utilities/types";
import ControlPanel from "../items/ControlPanel";
import Notifications from "../../notifications/Notifications";

interface MainHeaderNoModalsProps {
  onShowMenu?: (show: boolean) => void;
  onOpenLoginModal?: () => void;
}

export default function MainHeaderNoModals(props: MainHeaderNoModalsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [logoSrc, setLogoSrc] = useState("/src/assets/images/logo-white.svg");
  const typeID = useSelector((state: MainState) => state.user.typeID);
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const [currentSection, setCurrentSection] = useState(pageRoutes.home);
  const logout = useLogout();
  const [showMenuButtonStyle, setShowMenuButtonStyle] = useState<CSSProperties>(
    { display: "none" }
  );

  const profileItem: ReactNode = (
    <Space style={{ margin: "-10px 0" }}>
      <ProfileMenu />
      {t("myProfile")}
    </Space>
  );
  const controlItem: ReactNode = (
    <Space style={{ margin: "-10px 0" }}>
      <ControlPanel />
      {t("controlPanel")}
    </Space>
  );
  const logoutItem: ReactNode = (
    <Space style={{ margin: "-10px 0" }}>
      <Logout />
      {t("logout")}
    </Space>
  );
  const notifItem: ReactNode = (
    // <Space style={{ margin: "-10px 0" }}>
    //   <Notifications forDropdown />
    //   {t("notifications")}
    // </Space>
    <Notifications forDropdown includeText />
  );
  const chatItem: ReactNode = (
    <Space style={{ margin: "-10px 0" }}>
      <Chat forDropdown />
      {t("chat")}
    </Space>
  );

  const [dropdownItems, setDropdownItems] = useState([
    {
      key: "profile",
      label: profileItem,
    },
    {
      key: "control",
      label: controlItem,
    },
    {
      key: "logout",
      label: logoutItem,
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
          label: profileItem,
        },
        {
          key: "control",
          label: controlItem,
        },
        {
          key: "logout",
          label: logoutItem,
        },
      ]);
    } else {
      setShowMenuButtonStyle({});
      setDropdownItems([
        {
          key: "notification",
          label: notifItem,
        },
        {
          key: "chat",
          label: chatItem,
        },
        {
          key: "profile",
          label: profileItem,
        },
        {
          key: "control",
          label: controlItem,
        },
        {
          key: "logout",
          label: logoutItem,
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
      case "chat":
        navigate(`${pageRoutes.chat}`);
        break;
      case "control":
        switch (typeID) {
          case UserRoles.ADMIN:
          case UserRoles.BUYER:
          case UserRoles.SELLER_BUYER:
            navigate(`${pageRoutes.myRequirements}`);
            break;
          case UserRoles.SELLER:
            navigate(`${pageRoutes.myOffers}`);
            break;
          case UserRoles.LEGAL:
            navigate(`${pageRoutes.certificates}`);
            break;
          default:
            navigate(`${pageRoutes.home}`);
        }
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
                className="fa-solid fa-bars i-menu"
                style={showMenuButtonStyle}
                onClick={() => props.onShowMenu?.(true)}
              ></i>
              <div></div>
            </>
          )}
          {(currentSection == pageRoutes.home ||
            currentSection == pageRoutes.productDetail) && (
            <img
              src={logoSrc}
              className="logo-header"
              alt="Logo"
              style={{ flex: "0 0 auto" }}
            />
          )}
          <div
            className="t-flex options-tc"
            style={{
              maxWidth: "100%",
              minWidth: 0,
              justifyContent: "flex-end",
            }}
          >
            {isPremium && <Premium />}
            {width > windowSize.md && (
              <>
                <Chat />
                <Notifications />
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
