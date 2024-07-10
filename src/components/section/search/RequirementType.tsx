import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";


export default function RequirementType() {
  return (
    <Form.Item
      name='reqTypeSearch'
    >
      <SelectContainer
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
      </SelectContainer>
    </Form.Item>
  )
}
