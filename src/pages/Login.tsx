import { LoginFormPage } from '@ant-design/pro-components'
import backgroundImage from '../assets/images/silder-tc-04.jpg';
import logo from '../assets/images/logo_vertical.svg';
import video from '../assets/videos/video-login.webm';
import { Form, Tabs } from 'antd';
import Email from '../components/section/login/Email';
import Password from '../components/section/login/Password';
import { useState } from 'react';
import Dni from '../components/section/login/Dni';
import { TabsProps } from 'antd/lib';
import usePost from '../hooks/auth/usePost';
import { RegisterRequest } from '../models/Auth';
import login from '../services/auth/login.service';
import { useDispatch } from 'react-redux';
import { setUser, setUid } from '../redux/userSlice';
import { DocType } from '../utilities/types';
import ValidateCode from '../components/modals/ValidateCode';
import register from '../services/auth/register.service';

interface LoginProps {
  onChangeLoadingPage: (isLoading: boolean) => void; 
}

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

export default function Login(props: LoginProps) {
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  const [docType, setDocType] = useState(DocType.DNI);
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showCodeValidation, setShowCodeValidation] = useState(false);
  const [form] = Form.useForm();

  function changeLabel(loginType: string) {
    return loginType == LoginType.LOGIN ? 'Iniciar sesión' : 'Registrarse';
  }

  function resetFields() {
    form.resetFields();
  }

  function handleChangeTypeDoc(type: string) {
    form.setFieldsValue({document: ''});
    setDocType(type);
  }

  function handleOpenModal() {
    setIsCodeModalVisible(true);
  }

  function handleCloseModal() {
    setIsCodeModalVisible(false);
  }

  function handleValidationSuccess() {
    setShowCodeValidation(false);
  }

  async function HandleSubmit(values: any) {
    let data: RegisterRequest;
    let callbackFn = null;
    setEmail(values.email);

    if (loginType == LoginType.LOGIN) {
      data = { email: values.email, password: values.password };
      callbackFn = login;
    } else {
      data = { email: values.email, password: values.password, profileType: 'Premium', userType: 'admin' };
      if (docType == DocType.DNI) data.dni = values.document;
      else data.ruc = values.document;
      callbackFn = register;
    }

    props.onChangeLoadingPage(true);
    try {
      const registerResp = await usePost<RegisterRequest>(callbackFn, data);
      props.onChangeLoadingPage(false);
      console.log(registerResp);
      if (!registerResp.error) {
        if (loginType == LoginType.REGISTER) {
          dispatch(setUid(registerResp.data));
          setRegistrationSuccess(true);
          setShowCodeValidation(true);
        } else {
          dispatch(setUser(registerResp.data));
          localStorage.setItem('token', registerResp.data.token);
        }
      }
    } catch(error) {
      console.error('Error en login:', error);
      props.onChangeLoadingPage(false);
    }
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
        onFinish={HandleSubmit}
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
            },
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
            {registrationSuccess && (
              <>
                {showCodeValidation && (
                  <a onClick={handleOpenModal} style={{ float: 'right', marginBottom: '24px', fontWeight: 'bold' }}>
                    Validar código
                  </a>
                )}
                
                <ValidateCode 
                  isOpen={isCodeModalOpen}
                  onClose={handleCloseModal}
                  onValidationSucces={handleValidationSuccess}
                  email={email}
                />
              </>
            )}
          </>
        )}
      </LoginFormPage>
    </div>
    </>
  )
}
