import { Form } from "antd";
import RangeDatePickerContainer from "../../containers/RangeDatePicker";

interface DateFieldProps {
  name: string;
  placeholder?: [string, string];
  allowEmpty?: boolean;
}

export default function RangeDateField(props: DateFieldProps) {
  return (
    <Form.Item name={props.name} labelCol={{ span: 0 }}>
      <RangeDatePickerContainer
        style={{ width: "100%" }}
        className="form-control"
        placeholder={props.placeholder}
        allowEmpty={props.allowEmpty ? [true, true] : undefined}
      ></RangeDatePickerContainer>
    </Form.Item>
  );
}
