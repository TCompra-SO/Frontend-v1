import { Form, Input } from "antd";
import { Lengths } from "../../../utilities/lengths";

const rulesPhone =  [
  {
    required: true,
    message: 'Campo obligatorio',
  },
  {
    min: Lengths.dni.min,
    message: `Ingresa mínimo ${Lengths.phone.min} caracteres`
  },
  {
    max: Lengths.dni.max,
    message: `Ingresa máximo ${Lengths.phone.max} caracteres`
  }
];

export default function Phone() {
  return (
    <Form.Item
      label="Teléfono"
      name="phone"
      rules={rulesPhone}
    >
      <Input />
    </Form.Item>
  )
}
