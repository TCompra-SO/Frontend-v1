import { Form, Select } from "antd";
// import SelectContainer from "../../containers/SelectContainer";

interface CountryProps {
  countries: string[],
  onChangeCountry: (type: string) => void; 
}

const rulesCountry =  [
  {
    required: true,
    message: 'Campo obligatorio',
  }
];

export default function Country({countries, onChangeCountry}: CountryProps) {
  return (
    <Form.Item 
      label="País" 
      name="country" 
      rules={rulesCountry}>
      <Select
        placeholder='Seleccionar'
        onChange={onChangeCountry}
      >
        {countries.map(country => (
          <Select.Option 
            key={country} 
            value={country}
          >
              {country}
          </Select.Option>
        ))}
      </Select>
      {/* <SelectContainer
        placeholder="Seleccionar"
        onChange={onChangeCountry}
        options={countries.map(country => { return {label: country, value: country}})}
      /> */}
    </Form.Item>
  )
}
