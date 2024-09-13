import { Input } from "antd";
import { InputProps } from "antd/lib";

interface InputContainerProps extends InputProps {
  password?: boolean;
}

export default function InputContainer({
  password,
  ...rest
}: InputContainerProps) {
  if (password) return <Input.Password {...rest} />;
  return <Input {...rest} />;
}
