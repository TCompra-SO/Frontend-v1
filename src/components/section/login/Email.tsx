import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";

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
          message: 'Campo obligatorio',
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
