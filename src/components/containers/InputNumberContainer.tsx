import { InputNumber, InputNumberProps } from "antd";

interface InputNumberContainerProps extends InputNumberProps {}

export default function InputNumberContainer(props: InputNumberContainerProps) {
  return <InputNumber {...props} />;
}
