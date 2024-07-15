import { Tag } from "antd";
import { RequirementType } from "../../utilities/types";
import { primaryColor } from "../../utilities/colors";

interface TagContainerProps {
  isRequirementTag?: boolean
  type?: RequirementType,
  style?: React.CSSProperties,
  text?: string,
  color?: string,
  label?: string,
  includeMarginRight?: boolean,
  truncateText?: boolean
}

export default function TagContainer(props: TagContainerProps) {
  let newStyle;
  if (props.includeMarginRight) {
    if (props.style) newStyle = props.style;
  } else {
    if (props.style) newStyle = {...props.style, marginRight: '0'};
    else newStyle = {marginRight: '0'};
  }

  if (props.truncateText) newStyle = {...newStyle, maxWidth: '74vw'};

  if (props.isRequirementTag)
    return (
      <Tag color={primaryColor} style={newStyle}>
        {
          props.type == RequirementType.GOOD ? 'Bienes' :
          props.type == RequirementType.SERVICE ? 'Servicios' :
          props.type == RequirementType.SALE ? 'Liquidación' :
          'Puesto de trabajo'
        }
      </Tag>
    )
  else
    return (
      <Tag color={props.color} style={newStyle} className={props.truncateText ? 'text-truncate' : ''}>
        { props.label ? props.label + ': ' + props.text : props.text}
      </Tag>
    )
}
