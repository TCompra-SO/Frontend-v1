import { Input } from "antd";
import { InputProps } from "antd/lib";

interface InputContainerProps extends InputProps {
  style?: React.CSSProperties;
  defaultValue?: string;
  otp?: boolean;
  length?: number;
  prefix?: React.ReactNode;
}

export default function InputContainer(props: InputContainerProps) {
  if (props.otp) {
    return (
      <Input.OTP
        length={props.length}
        prefix={typeof props.prefix == "string" ? props.prefix : undefined}
        style={props.style}
        defaultValue={props.defaultValue}
      />
    );
  }

  return <Input {...props} />;
}
