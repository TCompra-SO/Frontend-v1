import { Select } from "antd"

interface SelectContainerProps {
  placeholder?: string
  defaultValue?: string
  onChange?: (type: string) => void,
  suffixIcon?: React.ReactNode,
  style?: React.CSSProperties,
  options: { 
    label: string | React.ReactNode, 
    value?: string, 
    key?: string,
    title?: string, 
    options?: {label: string, value: string}[] 
  }[],

  optionFilterProp?: string,
  showSearch?: boolean,
}

export default function SelectContainer(props: SelectContainerProps) {
  return (
    <Select
      showSearch={props.showSearch}
      suffixIcon={props.suffixIcon}
      placeholder={props.placeholder}
      optionFilterProp={props.optionFilterProp}
      style={props.style}
      options={props.options}
      defaultValue={props.defaultValue}
    >
    </Select>
  )
}
