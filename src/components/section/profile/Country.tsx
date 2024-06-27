import { Form, Select } from "antd";

const rulesCountry =  [
  {
    required: true,
    message: 'Campo obligatorio',
  }
];

const countries = [
  {
    label: 'Perú',
    value: 1
  }
]

export default function Country() {
  return (
    <Form.Item 
      label="País" 
      name="country" 
      rules={rulesCountry}>
      <Select placeholder='Seleccionar'>
        {countries.map(country => (
          <Select.Option key={country.value} value={country.label}>
            {country.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
