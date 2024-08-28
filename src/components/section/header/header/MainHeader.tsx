import { Dropdown, Flex, Menu, MenuProps } from "antd";
import "./Header.css";
import Premium from "../items/Premium";
import Notification from "../items/Notification";
import Chat from "../items/Chat";
import UserName from "../items/UserName";
import Logout from "../items/Logout";
import { useEffect, useState } from "react";
import ProfileMenu from "../items/ProfileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";

const menuItems = [
  {
    key: "notification",
    label: <Notification />,
  },
  {
    key: "chat",
    label: <Chat />,
  },
  {
    key: "profile",
    label: <ProfileMenu />,
  },
  {
    key: "logout",
    label: <Logout />,
  },
];

const navBarItems: MenuProps["items"] = [
  {
    key: "notification",
    label: <Notification />,
  },
  {
    key: "chat",
    label: <Chat />,
  },
  {
    key: "premium",
    label: <Premium />,
  },
  {
    key: "userName",
    label: <UserName />,
  },
];

function MainHeader() {
  const [dropdownItems, setDropdownItems] = useState({
    items: [
      {
        key: "profile",
        label: <ProfileMenu />,
      },
      {
        key: "logout",
        label: <Logout />,
      },
    ],
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setDropdownItems({
          items: menuItems,
        });
      } else {
        setDropdownItems({
          items: [
            {
              key: "profile",
              label: <ProfileMenu />,
            },
            {
              key: "logout",
              label: <Logout />,
            },
          ],
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex justify="space-between" align="center" style={{ padding: "0 10px" }}>
      <Flex justify="flex-end" align="center" style={{ flex: "auto" }}>
        <Menu
          mode="horizontal"
          className="main-menu"
          items={navBarItems}
          style={{ minWidth: 0, flex: "auto" }}
        />
        <Dropdown
          menu={dropdownItems}
          trigger={["click"]}
          placement="bottomRight"
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </Dropdown>
      </Flex>
    </Flex>
  );
}

export default MainHeader;
