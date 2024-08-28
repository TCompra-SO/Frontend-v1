import { Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";

interface OTPInputContainerProps extends OTPProps {}

export default function OTPInputContainer(props: OTPInputContainerProps) {
  return <Input.OTP {...props} />;
}
