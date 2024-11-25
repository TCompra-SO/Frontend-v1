import { DatePicker } from "antd/lib";
import { RangePickerProps } from "antd/lib/date-picker";

interface RangeDatePickerContainerProps extends RangePickerProps {}

export default function RangeDatePickerContainer(
  props: RangeDatePickerContainerProps
) {
  return <DatePicker.RangePicker {...props} />;
}
