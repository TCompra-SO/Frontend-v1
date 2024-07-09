import { DatePicker, Form } from "antd";

interface DateSearchProps {
  placeholder: string,
  name: string
}

export default function DateSearch(props: DateSearchProps) {
  return (
    <Form.Item
      name={props.name}
    >
      <DatePicker 
        placeholder={props.placeholder}
        style={{width: '100%'}}/>
    </Form.Item>
  )
}
