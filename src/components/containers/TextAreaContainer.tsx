import TextArea from "antd/es/input/TextArea"

interface TextAreaContainerProps {
  placeholder?: string,
  style?: React.CSSProperties,
  readOnly?: boolean
  defaultValue?: string | number | readonly string[],
  rows?: number,
  maxLength?: number
}

export default function TextAreaContainer(props: TextAreaContainerProps) {
  return (
    <TextArea 
      style={props.style}
      rows={props.rows} 
      placeholder={props.placeholder} 
      maxLength={props.maxLength}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue}
    />
  )
}
