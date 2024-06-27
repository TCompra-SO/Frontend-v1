import { Form, Select } from "antd";

const rulesCity =  [
  {
    required: true,
    message: 'Campo obligatorio',
  }
];

const cities = [
  {
    label: 'Arequipa',
    value: 1
  }
]

export default function City() {
  return (
    <Form.Item 
      label="Ciudad" 
      name="city" 
      rules={rulesCity}>
      <Select placeholder='Seleccionar'>
        {cities.map(city => (
          <Select.Option key={city.value} value={city.label}>
            {city.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
