import { Form, Space } from "antd";
import { Lengths } from "../../../utilities/lengths";
import { RuleObject } from "antd/es/form";
import InputContainer from "../../containers/InputContainer";

function validateNumber(_: RuleObject, value: string) {
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
        <InputContainer 
          style={{ width: '20%' }} 
          readOnly={true}
          defaultValue='+51'
        />
        <InputContainer style={{ width: '80%' }}/>
      </Space.Compact>
    </Form.Item>
  )
}
