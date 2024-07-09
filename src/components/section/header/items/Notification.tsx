import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Notification() {
  return (
    <div className='icon'>
        <FontAwesomeIcon icon={faBell} />
        <div className='item-label'>Notificaciones</div>     
    </div>
  )
}
