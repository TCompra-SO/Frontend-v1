import { LoginFormPage } from '@ant-design/pro-components'
import backgroundImage from '../../../assets/images/silder-tc-04.jpg';
import logo from '../../../assets/images/logo_vertical.svg';
import { Tabs } from 'antd';
import Email from './Email';
import Password from './Password';
import { useState } from 'react';
import Dni from './Dni';
import { TabsProps } from 'antd/lib';

const LoginType = {
  LOGIN: 'login',
  REGISTER: 'register'
}

const tabItems: TabsProps['items'] = [
  {
    key: LoginType.LOGIN,
    label: 'Inicia sesión'
  },
  {
    key: LoginType.REGISTER,
    label: 'Regístrate'
  },
]

export default function Login() {

  function changeLabel(loginType: string) {
    return loginType == LoginType.LOGIN ? 'Iniciar sesión' : 'Registrarse';
  }

  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  // const [submitLabel, setSubmitLabel] = useState(changeLabel(LoginType.LOGIN));

  return (
    <LoginFormPage
      backgroundImageUrl={backgroundImage}
      logo={logo}
      title="TCompra"
      subTitle="Tu mejor proveedor"
      submitter={{ searchConfig: { 
        submitText: changeLabel(loginType), 
        resetText: changeLabel(loginType)
      }}}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(pressedKey) => setLoginType(pressedKey)}
        items={tabItems}
      />
      {loginType == LoginType.LOGIN && (
        <>
          <Email></Email>
          <Password></Password>
          <a style={{ float: 'right' }}>
            ¿Olvidó su contraseña?
          </a>
        </>
      )}
      {loginType == LoginType.REGISTER && (
        <>
          <Dni></Dni>
          <Email></Email>
          <Password></Password>
        </>
      )}
    </LoginFormPage>
  )
}
