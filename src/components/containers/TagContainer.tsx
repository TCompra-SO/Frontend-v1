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
}

export default function TagContainer(props: TagContainerProps) {
  if (props.isRequirementTag)
    return (
      <Tag color={primaryColor} style={props.style}>
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
      <Tag color={props.color} style={props.style}>
        { props.label ? props.label + ': ' + props.text : props.text}
      </Tag>
    )
}
