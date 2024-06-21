import { LockOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { Lengths } from '../../../utilities/lengths';
import './items.css';

export default function Password() {
  return (
    <ProFormText.Password
      name="password"
      fieldProps={{
        size: 'large',
        prefix: (
          <LockOutlined
            className={'prefixIcon'}
          />
        ),
      }}
      placeholder={'Contraseña'}
      rules={[
        {
          required: true,
          message: 'Campo obligatorio',
        },
        {
          min: Lengths.password.min,
          message: `Ingresa mínimo ${Lengths.password.min} caracteres`
        },
        {
          max: Lengths.password.max,
          message: `Ingresa máximo ${Lengths.password.max} caracteres`
        }
      ]}
    />
  )
}
