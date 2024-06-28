import { DatePicker, Form } from "antd";
import { dateFormat } from "../../../utilities/globals";

const rulesBirthdate =  [
  {
    required: true,
    message: 'Campo obligatorio',
  }
];

export default function Birthdate() {
  return (
    <Form.Item
      label="Fecha de nacimiento"
      name="birthdate"
      rules={rulesBirthdate}
    >
      <DatePicker format={dateFormat} style={{width: '100%'}}/>
    </Form.Item>
  )
}
