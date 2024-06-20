import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import './items.css';

export default function Email() {
  return (
    <ProFormText
      name="email"
      fieldProps={{
        size: 'large',
        prefix: (
          <UserOutlined
            className={'prefixIcon'}
          />
        ),
      }}
      placeholder={'Correo electrónico'}
      rules={[
        {
          required: true,
          message: 'Ingresa un email válido',
          type: "email",
        },
        {
          min: Lengths.email.min,
          message: `Ingresa mínimo ${Lengths.email.min} caracteres`
        },
        {
          max: Lengths.email.max,
          message: `Ingresa máximo ${Lengths.email.max} caracteres`
        }
      ]}
    />
  )
}
