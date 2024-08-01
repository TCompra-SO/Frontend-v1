import { Input } from "antd";
import { InputProps } from "antd/lib";

interface InputContainerProps extends InputProps {}

export default function InputContainer(props: InputContainerProps) {
  return <Input {...props} />;
}
