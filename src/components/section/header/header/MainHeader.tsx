import { Dropdown, Flex, MenuProps, Space } from "antd";
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

interface MainHeaderProps {
  onShowMenu?: (show: boolean) => void;
}

function MainHeader(props: MainHeaderProps) {
  const { t } = useTranslation();
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
    if (width <= windowSize.sm) {
      setLogoSrc("/src/assets/images/favicon.svg");
    }
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
      setShowMenuButtonStyle({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        logout();
        break;
      case "profile":
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
            <img
              src="/src/assets/images/favicon.svg"
              className="logo-header"
              alt="Logo"
            />
          )}
          <div className="t-flex options-tc">
            {width > windowSize.md && (
              <>
                <Premium />
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
        <header className="">
          <div className="t-flex header-tc header-menu">
            <img
              src={
                currentSection == pageRoutes.home
                  ? "/src/assets/images/logo-white.svg"
                  : "/src/assets/images/logo-black.svg"
              }
              alt="Logo"
              style={{ height: "48px" }}
            />
            <div className="t-flex options-tc">
              <button className="btn btn-default">
                <i className="fa-regular fa-user"></i>{" "}
                <span className="req-btn-info">
                  {t("login")}/{t("register")}
                </span>
              </button>
            </div>
          </div>
        </header>
      )}
    </header>
  );
}

export default MainHeader;
