import { Dropdown, Space } from "antd";
import Premium from "../items/Premium";
import Notification from "../items/Notification";
import Chat from "../items/Chat";
import UserName from "../items/UserName";
import Logout from "../items/Logout";
import { useEffect, useState } from "react";
import ProfileMenu from "../items/ProfileMenu";
import useWindowSize from "../../../../hooks/useWindowSize";
import { windowSize } from "../../../../utilities/globals";
import { useTranslation } from "react-i18next";

function MainHeader() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const [dropdownItems, setDropdownItems] = useState({
    items: [
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
    ],
  });

  useEffect(() => {
    if (width > windowSize.md) {
      setDropdownItems({
        items: [
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
        ],
      });
    } else {
      setDropdownItems({
        items: [
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
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div className="t-flex header-tc">
      <i className="fa-solid fa-bars-progress i-menu"></i>
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
          menu={dropdownItems}
          trigger={["click"]}
          placement="bottomRight"
        >
          <i className="fa-regular fa-caret-down"></i>
        </Dropdown>
      </div>
    </div>
  );
}

export default MainHeader;
