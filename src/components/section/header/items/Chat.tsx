import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Chat() {
  return (
    <div className='icon'>
      {/* <WechatFilled/> */}
      <FontAwesomeIcon icon={faComments} />
      <div className='item-label'>Chat</div>
    </div>
  )
}
