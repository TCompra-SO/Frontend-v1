import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import './items.css';
import { RuleObject } from "antd/es/form";

interface EmailProps {
  tlds: string []
}

export default function Email({ tlds }: EmailProps) {

  function validateDomain(_: RuleObject, value: string) {
    if (value && tlds.length > 0) {
      const lastDotIndex: number = value.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        const segment = value.substring(lastDotIndex + 1).toUpperCase();
        if (!tlds.includes(segment))
          return Promise.reject(new Error('Ingresa un email válido '));
      }
    }
    return Promise.resolve();
  }

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
        },
        {
          validator: validateDomain
        }
      ]}
    />
  )
}
