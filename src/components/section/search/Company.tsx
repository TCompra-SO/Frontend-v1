import { Form, Select } from 'antd';
import './search.css';

export default function Company() {
  return (
    <Form.Item
      name='companySearch'
      style={{width: '100%'}}
    >
      <Select
        showSearch
        placeholder='Empresa'
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
        style={{
          marginBottom: '10px',
          borderRadius: '50px !important'
        }}
      >
      </Select>
    </Form.Item>
  )
}
