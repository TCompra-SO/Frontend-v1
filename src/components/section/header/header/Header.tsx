import { Dropdown, Flex, Menu, MenuProps } from 'antd';
import Logo from '../items/Logo'; 
import './Header.css'; 
import Premium from '../items/Premium'
import Notification from '../items/Notification'
import Chat from '../items/Chat'
import UserName from '../items/UserName'
import { DownOutlined } from '@ant-design/icons';
import Logout from '../items/Logout';
import { useEffect, useState } from 'react';

const menuItems  = [
  {
    key: 'notification',
    label: (
      <Notification />
    )
  },
  {
    key: 'chat',
    label: (
      <Chat />
    )
  },
  {
    key: 'logout',
    label: (
      <Logout />
    )
  },
];

// const menuProps: MenuProps = {
//   items: menuItems
// };

const navBarItems: MenuProps['items']  = [
  {
    key: 'premium',
    label: (
      <Premium />
    )
  },
  {
    key: 'notification',
    label: (
      <Notification />
    )
  },
  {
    key: 'chat',
    label: (
      <Chat />
    )
  },
  {
    key: 'userName',
    label: (
      <UserName />
    )
  },
];

function Header() {

  const [dropdownItems, setDropdownItems] = useState({
    items: [{
      key: 'logout',
      label: (
        <Logout />
      )
    },]
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setDropdownItems({
          items: menuItems
        });
      } else {
        setDropdownItems({
          items: [{
            key: 'logout',
            label: (
              <Logout />
            )
          },]
        });
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Flex justify='space-between' align='center'>
      <Logo />
      <Flex justify='flex-end' align='center' style={{ flex: "auto" }}>
        <Menu mode="horizontal" className="main-menu" items={navBarItems} style={{ minWidth: 0, flex: "auto" }}/>
        <Dropdown menu={dropdownItems} trigger={['click']} placement="bottomRight" >            
          <DownOutlined />
        </Dropdown>
      </Flex>
    </Flex>
  );
}

export default Header;
