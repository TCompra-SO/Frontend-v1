import { DatePicker, DatePickerProps } from "antd/lib";

interface DatePickerContainerProps extends DatePickerProps {}

export default function DatePickerContainer(props: DatePickerContainerProps) {
  return <DatePicker {...props} />;
}
