import { LoginFormPage } from '@ant-design/pro-components'
import backgroundImage from '../assets/images/silder-tc-04.jpg';
import logo from '../assets/images/logo_vertical.svg';
import video from '../assets/videos/video-login.webm';
import { Form, Tabs } from 'antd';
import Email from '../components/section/login/Email';
import Password from '../components/section/login/Password';
import { useEffect, useState } from 'react';
import Dni from '../components/section/login/Dni';
import { TabsProps } from 'antd/lib';
import usePost from '../hooks/auth/usePost';
import { LoginRequest } from '../models/Auth';
import login from '../services/auth/login.service';

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

  async function HandleLogin() {
    try {
      const res = await usePost<LoginRequest>(login, {email: 'tygrejesus8@gmail.com', password: '123456789'});
      console.log(res);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  useEffect(() => {
    HandleLogin(); 
  }, []);
  

  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  const [form] = Form.useForm();

  function changeLabel(loginType: string) {
    return loginType == LoginType.LOGIN ? 'Iniciar sesión' : 'Registrarse';
  }

  function resetFields() {
    form.resetFields();
  }

  function handleChangeTypeDoc() {
    form.setFieldsValue({document: ''})
  }

  return (
    <>
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl={backgroundImage}
        backgroundVideoUrl={video}
        logo={logo}
        title="TCompra"
        subTitle="Tu mejor proveedor"
        containerStyle={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',

        }}
        submitter={{ searchConfig: { 
            submitText: changeLabel(loginType), 
            resetText: changeLabel(loginType),
          },
          submitButtonProps: {
            style: {
              background: '#BC1373',
              width: '100%'
            }
          }
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(pressedKey) => {setLoginType(pressedKey); resetFields()}}
          items={tabItems}
          style={{color: '#BC1373'}}
        />
        {loginType == LoginType.LOGIN && (
          <>
            <Email></Email>
            <Password></Password>
            <a style={{ float: 'right', marginBottom: '24px', fontWeight: 'bold' }}>
              ¿Olvidó su contraseña?
            </a>
          </>
        )}
        {loginType == LoginType.REGISTER && (
          <>
            <Dni onChangeTypeDoc={handleChangeTypeDoc}></Dni>
            <Email></Email>
            <Password></Password>
          </>
        )}
      </LoginFormPage>
    </div>
    </>
  )
}
