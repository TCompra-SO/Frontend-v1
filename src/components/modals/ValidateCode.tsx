import { CheckCircleOutlined, SendOutlined, SolutionOutlined } from "@ant-design/icons";
import { App, Button, Divider, Flex, Input, Modal, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import usePost from "../../hooks/auth/usePost";
import { SendCodeRequest, ValidateCodeRequest } from "../../models/Auth";
import validateCode from "../../services/auth/validateCode.service";
import sendCode from "../../services/auth/sendCode.service";
import showNotification from "../../utilities/notification/showNotification";

interface ValidateCodeProps {
  isOpen: boolean,
  onClose: () => void,
  email: string,
  onValidationSucces: () => void
}

interface ItemContent {
  key: string,
  title: string,
  status: "finish" | "wait" | "process" | "error" | undefined,
  icon: any,
  text: string,
  showInput: boolean
}

const stepsIni: ItemContent[] =[
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

const expireInSeconds = 10;

export default function ValidateCode({isOpen, onClose, email, onValidationSucces}: ValidateCodeProps) {
  const { notification } = App.useApp();
  const [current, setCurrent] = useState(0);
  const [validated, setValidated] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [timer, setTimer] = useState(expireInSeconds);
  let intervalId: number = 0;

  useEffect(() => {
    if (isOpen) {
      setCurrent(0);
      clearInterval(intervalId);
      setTimer(expireInSeconds);
      setValidated(false);
    }
  }, [isOpen])

  function next() {
    if (current == steps!.length - 1)
      onClose();
    else
      setCurrent((current) => {
        const next: number= current + 1;
        steps![next].status = 'finish';
        return next;
      });
  }
  
  async function ValidateCode(code: string) {
    const data: ValidateCodeRequest = {
      email: email, 
      type: 'identity_verified', 
      code: code
    };
    const response = await usePost<ValidateCodeRequest>(validateCode, data);
    if (!response.error) {
      setValidated(true);
      onValidationSucces();
      next();
    }
    else {
      showNotification(notification, 'error', response.error);
    }
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
        const newTimer = prevTimer - 1;
        return newTimer;
      });
    }, 1000)
  }


  return (
    <Modal
      centered
      open={isOpen}
      closable={false}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={next} 
          disabled={stepsIni[current].key == 'val' && !validated}
        >
          {current < steps!.length - 1 ? 'Siguiente' : 'Aceptar'}
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
              <Input.OTP length={6} onChange={ValidateCode}/>
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
