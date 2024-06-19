import { LogoutOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

export default function Logout() {
  return (
    <Flex justify='flex-start' align='center'>
      <LogoutOutlined/>
      <div style={{marginLeft: '8px'}}> Salir</div>
    </Flex>
  )
}
