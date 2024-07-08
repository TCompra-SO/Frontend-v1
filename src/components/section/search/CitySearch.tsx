import { Form, Select } from 'antd';

export default function CitySearch() {
  return (
    <Form.Item
      name='citySearch'
    >
      <Select
        showSearch
        placeholder='Departamento'
        optionFilterProp="label"
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      >
      </Select>
    </Form.Item>
  )
}
