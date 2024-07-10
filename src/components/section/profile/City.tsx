import { Form, Select } from "antd";
// import SelectContainer from "../../containers/SelectContainer";

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
      <Select placeholder='Seleccionar'
      options={cities.map(city => { return {label: city, value: city, key: city}})}
      >
        {/* {cities.map(city => (
          <Select.Option key={city} value={city}>
            {city}
          </Select.Option>
        ))} */}
        
      </Select>
      {/* <SelectContainer
        placeholder="Seleccionar"
        options={cities.map(city => { return {label: city, value: city, key: city}})}
      /> */}
    </Form.Item>
  )
}
