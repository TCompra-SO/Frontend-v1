import { Form, Select } from "antd";

interface CityProps {
  cities: string[]
}

const rulesCity =  [
  {
    required: true,
    message: 'Campo obligatorio',
  }
];

export default function City({cities}: CityProps) {
  return (
    <Form.Item 
      label="Ciudad" 
      name="city" 
      rules={rulesCity}>
      <Select placeholder='Seleccionar'>
        {cities.map(city => (
          <Select.Option key={city} value={city}>
            {city}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
