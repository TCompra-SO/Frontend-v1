import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { primaryColor } from '../../utilities/colors'

interface DotContainerProps {
  fontSize?: number,
  color?: string
  marginLeft?: boolean
  marginRight?: boolean
}

export default function DotContainer(props: DotContainerProps) {
  return (
    <FontAwesomeIcon 
      icon={faCircle} 
      fontSize={props.fontSize ?? 5} 
      color={props.color ?? primaryColor}
      style={{marginLeft: props.marginLeft ? '5px' : '0',
        marginRight: props.marginRight ? '5px' : '0'
      }}
    />
  )
}
