import { Input } from "antd";
import { InputProps } from "antd/lib";

interface InputContainerProps extends InputProps {
  placeholder?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  defaultValue?: string;
  otp?: boolean;
  length?: number;
  prefix?: React.ReactNode;
}

export default function InputContainer(props: InputContainerProps) {
  if (props.otp) {
    return <Input.OTP length={props.length} />;
  }

  return (
    <Input
      {...props}
      prefix={props.prefix}
      placeholder={props.placeholder}
      style={props.style}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue}
    />
  );
}
