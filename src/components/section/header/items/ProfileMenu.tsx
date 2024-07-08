import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faUserEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from 'antd';

export default function ProfileMenu() {
  return (
    <Flex justify='flex-start' align='center'>
      <FontAwesomeIcon icon={faUserEdit} />
      <div style={{marginLeft: '8px'}}> Mi perfil</div>
    </Flex>
  )
}
