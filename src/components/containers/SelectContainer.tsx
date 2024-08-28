import { Select } from "antd";
import { SelectProps } from "antd/lib";

interface SelectContainerProps extends SelectProps {}

export default function SelectContainer(props: SelectContainerProps) {
  return <Select {...props}></Select>;
}
