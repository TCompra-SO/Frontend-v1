import { Form } from 'antd';
import { Category, RequirementSearchItem } from '../../../models/Interfaces';
import SelectContainer from '../../containers/SelectContainer';

interface KeywordProps {
  categories: Category[],
  requirements: RequirementSearchItem[]
}

export default function Keyword(props: KeywordProps) {
  return (
    <Form.Item
      name='keyWordSearch'
      style={{width: '100%'}}
    >
      <SelectContainer
        showSearch
        suffixIcon={null}
        placeholder='Buscar...' 
        optionFilterProp="label"
        style={{marginBottom: '10px', height: '60px'}}
        options={[
          {
            label: <span>Rubros</span>,
            title: 'categories',
            options: props.categories.map((category: Category) => { return { value: category.id, label: category.name }})
          },
          {
            label: <span>Requerimientos</span>,
            title: 'requirements',
            options: props.requirements.map((req: RequirementSearchItem) => { return { value: req.id, label: req.title }})
          }
        ]}
      >
      </SelectContainer>
    </Form.Item>
  )
}
