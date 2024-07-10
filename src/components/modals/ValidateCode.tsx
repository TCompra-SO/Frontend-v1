import { CheckCircleOutlined, SendOutlined, SolutionOutlined } from "@ant-design/icons";
import { App, Button, Divider, Flex, Form,  Modal, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import { SendCodeRequest, ValidateCodeRequest } from "../../models/Requests";
import validateCode from "../../services/auth/validateCode.service";
import sendCode from "../../services/auth/sendCode.service";
import showNotification from "../../utilities/notification/showNotification";
import { StepsItemContent } from "../../models/Interfaces";
import InputContainer from "../containers/InputContainer";

interface ValidateCodeProps {
  isOpen: boolean,
  onClose: (validationSuccess: boolean) => void,
  email: string,
}

const stepsIni: StepsItemContent[] =[
  {
    key: 'sent',
    title: 'Envío',
    status: 'finish',
    icon: <SendOutlined />,
    text: 'Se ha enviado un código de verificación a ',
    showInput: false
  },
  {
    key: 'val',
    title: 'Validación',
    status: 'wait',
    icon: <SolutionOutlined />,
    text: 'Ingrese el código de verificación:',
    showInput: true
  },
  {
    key: 'done',
    title: 'Fin',
    status: 'wait',
    icon: <CheckCircleOutlined />,
    text: 'Su cuenta ha sido validada',
    showInput: false
  }
];

const steps: StepsProps['items'] = stepsIni.map((item) => ({ key: item.key, title: item.title, icon: item.icon, status: item.status }));

const expireInSeconds = 60;
const timeoutToValidate = 5;

export default function ValidateCode({isOpen, onClose, email}: ValidateCodeProps) {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [timer, setTimer] = useState(expireInSeconds);
  const [timerToValidate, setTimerToValidate] = useState(timeoutToValidate);
  const [validationSuccess, setValidationSuccess] = useState(false);
  let intervalId: number = 0;
  let intervalIdValidate: number = 0;

  useEffect(() => {
    if (isOpen) {
      setCurrent(0);
      clearInterval(intervalId);
      clearInterval(intervalIdValidate);
      setTimer(expireInSeconds);
      setTimerToValidate(timeoutToValidate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  function next() {
    setCurrent((current) => {
      const next: number= current + 1;
      steps![next].status = 'finish';
      return next;
    });
  }

  function handleClose() {
    onClose(validationSuccess);
  }

  async function ValidateCode() {
    beginTimerToValidate();
    const code = form.getFieldValue('code');
    const data: ValidateCodeRequest = {
      email: email, 
      type: 'identity_verified', 
      code: code
    };
    const response = await usePost<ValidateCodeRequest>(validateCode, data);
    if (!response.error) {
      setValidationSuccess(true);
      next();
    }
    else {
      setValidationSuccess(false);
      showNotification(notification, 'error', response.error);
    }
    form.resetFields();
  }

  async function ResendCode() {
    setWaiting(true);
    const data: SendCodeRequest = {
      email: email, 
      type: 'identity_verified'
    };
    const response = await usePost<SendCodeRequest>(sendCode, data);
    beginTimer();
    if (!response.error)
        showNotification(notification, 'success', 'Se envió el código con éxito');
    else
      showNotification(notification, 'error', response.error);
  }

  function beginTimer() {
    intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer - 1 === 0) {
          clearInterval(intervalId);
          setTimer(expireInSeconds);
          setWaiting(false);
        }
        return prevTimer - 1;
      });
    }, 1000)
  }

  function beginTimerToValidate() {
    intervalIdValidate = setInterval(() => {
      setTimerToValidate(prevTimer => {
        if (Number((prevTimer - 0.1).toFixed(1)) === 0) {
          clearInterval(intervalIdValidate);
          setTimerToValidate(timeoutToValidate);
        }
        return Number((prevTimer - 0.1).toFixed(1));
      });
    }, 100)
  }


  return (
    <Modal
      centered
      open={isOpen}
      closable={false}
      footer={[
        <Button key="back" onClick={handleClose}>
          Cancelar
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={
            stepsIni[current].key == 'val' ? ValidateCode :
            stepsIni[current].key == 'done' ? handleClose :
            next
          } 
          disabled={ 
            stepsIni[current].key != 'val' ? false : 
            timerToValidate != timeoutToValidate
          }
        >
          {
            stepsIni[current].key == 'val' ? `Validar${timerToValidate != timeoutToValidate ? ` (${timerToValidate.toFixed(0)})` : ''}` : 
            stepsIni[current].key == 'done' ? 'Aceptar' : 
            'Siguiente'
          }
        </Button>,
      ]}
    >
      <Flex gap="middle" align="center" justify="space-around" vertical >
        <Steps 
          current={current}
          items={steps}
        />
        <Divider style={{margin: '0'}}/>
          <div style={{padding: '12px'}}>
            {stepsIni[current].key == 'sent' ? stepsIni[current].text + email : stepsIni[current].text}
          </div>
        
          {stepsIni[current].showInput && (
            <>
              <Form form={form}>
                <Form.Item name='code'>
                  <InputContainer otp={true} length={6}/>
                </Form.Item>
              </Form>
              
              <a 
                style={{ 
                  float: 'right', 
                  marginBottom: '24px',
                  pointerEvents: waiting ? 'none' : 'all',
                  cursor: waiting ? 'not-allowed' : ''
                }} 
                onClick={ResendCode}>
                  {waiting ? `Podrá reenviar el código en (${timer}) segundos` : 'Reenviar código'}
              </a>
            </>
          )}
        
      </Flex>
    </Modal>
  )
}
