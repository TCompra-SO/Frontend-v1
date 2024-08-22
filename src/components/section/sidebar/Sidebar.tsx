import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuProps } from "antd";
import logo from "../../../assets/images/logo-white.svg";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  style?: React.CSSProperties
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    style,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "",
    "",
    <a href="#">
      <img className="img-logo" src={logo} alt="Logo" />
    </a>
  ),
  getItem("Option 1", "1", <FontAwesomeIcon icon={faUser} />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function Sidebar() {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
}
