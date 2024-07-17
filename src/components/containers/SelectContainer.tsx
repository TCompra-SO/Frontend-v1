import { Select } from "antd";
import { SelectProps } from "antd/lib";

interface SelectContainerProps extends SelectProps {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (type: string) => void;
  suffixIcon?: React.ReactNode;
  style?: React.CSSProperties;
  options: {
    label: string | React.ReactNode;
    value?: string;
    key?: string;
    title?: string;
    options?: { label: string; value: string }[];
  }[];

  optionFilterProp?: string;
  showSearch?: boolean;
}

export default function SelectContainer({
  options,
  ...props
}: SelectContainerProps) {
  return (
    <Select
      {...props}
      showSearch={props.showSearch}
      suffixIcon={props.suffixIcon}
      placeholder={props.placeholder}
      optionFilterProp={props.optionFilterProp}
      style={props.style}
      options={options}
      defaultValue={props.defaultValue}
    ></Select>
  );
}
