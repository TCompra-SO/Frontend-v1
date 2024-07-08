import { Form, Select } from "antd";


export default function RequirementType() {
  return (
    <Form.Item
      name='reqTypeSearch'
    >
      <Select
        placeholder='Tipo de requerimiento'
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
        style={{width: '100%'}}
        
        >
      </Select>
    </Form.Item>
  )
}
