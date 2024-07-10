import { Form } from 'antd';
import SelectContainer from '../../containers/SelectContainer';

export default function CitySearch() {
  return (
    <Form.Item
      name='citySearch'
    >
      <SelectContainer
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
      </SelectContainer>
    </Form.Item>
  )
}
