import { Form } from 'antd';
import './search.css';
import SelectContainer from '../../containers/SelectContainer';

export default function Company() {
  return (
    <Form.Item
      name='companySearch'
      style={{width: '100%'}}
    >
      <SelectContainer
        showSearch={true}
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
        }}
      />
    </Form.Item>
  )
}
