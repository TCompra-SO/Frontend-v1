import { Form, Input, Space } from "antd";
import { Lengths } from "../../../utilities/lengths";

function validateNumber(_: any, value: any) {
  if (value && isNaN(Number(value))) {
    return Promise.reject(new Error('Ingresa un número válido'));
  }
  return Promise.resolve();
}

const rulesPhone =  [
  {
    required: true,
    message: 'Campo obligatorio',
  },
  {
    min: Lengths.phone.min,
    message: `Ingresa mínimo ${Lengths.phone.min} caracteres`
  },
  {
    max: Lengths.phone.max,
    message: `Ingresa máximo ${Lengths.phone.max} caracteres`
  },
  { 
    validator: validateNumber
  }
];

export default function Phone() {

  

  return (
    <Form.Item
      label="Teléfono"
      name="phone"
      rules={rulesPhone}
    >
      <Space.Compact>
        <Input style={{ width: '20%' }} readOnly={true} defaultValue='+51'/>
        <Input style={{ width: '80%' }}  />
      </Space.Compact>
    </Form.Item>
  )
}
