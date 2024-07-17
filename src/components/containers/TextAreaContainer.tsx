import TextArea from "antd/es/input/TextArea";
import { TextAreaProps } from "antd/lib/input/TextArea";

interface TextAreaContainerProps extends TextAreaProps {
  placeholder?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  defaultValue?: string | number | readonly string[];
  rows?: number;
  maxLength?: number;
}

export default function TextAreaContainer(props: TextAreaContainerProps) {
  return (
    <TextArea
      {...props}
      style={props.style}
      rows={props.rows}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue}
    />
  );
}
