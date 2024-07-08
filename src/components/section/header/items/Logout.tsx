import { faDoorOpen } from '@fortawesome/free-solid-svg-icons/faDoorOpen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from 'antd';

export default function Logout() {
  return (
    <Flex justify='flex-start' align='center'>
      <FontAwesomeIcon icon={faDoorOpen} />
      <div style={{marginLeft: '8px'}}> Salir</div>
    </Flex>
  )
}
