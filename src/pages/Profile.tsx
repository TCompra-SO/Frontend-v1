import { App, Button, Col, Flex, Form, Row } from "antd";
import Birthdate from "../components/section/profile/Birthdate";
import Phone from "../components/section/profile/Phone";
import Country from "../components/section/profile/Country";
import City from "../components/section/profile/City";
import usePost from "../hooks/auth/usePost";
import { ProfileRequest, SendCodeRequest } from "../models/Auth";
import createProfile from "../services/auth/profile.service";
import moment from 'moment';
import { dateFormat } from "../utilities/globals";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import ValidateCode from "../components/modals/ValidateCode";
import { useLocation } from "react-router-dom";
import sendCode from "../services/auth/sendCode.service";
import backImage from "../assets/images/back-modal.svg";
import Title from "antd/es/typography/Title";

interface ProfileProps {
  onChangeLoadingPage: (isLoading: boolean) => void; 
}

export default function Profile(props: ProfileProps) {
  const {state} = useLocation();
  const { email } = state;
  const { notification } = App.useApp();
  // const email='al.h8500@gmail.com';
  const [uid, setUid] = useState(useSelector((state: MainState) => state.user.uid));  
  console.log(email, uid);
  const [showCodeValidation, setShowCodeValidation] = useState(false);
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  function handleValidationSuccess() {
    setShowCodeValidation(false);
  }

  function handleOpenModal() {
    setIsCodeModalVisible(true);
    SendValidationCode();
  }

  function handleCloseModal() {
    setIsCodeModalVisible(false);
  }

  async function HandleSubmit(values: any) {
    props.onChangeLoadingPage(true);
    
    const data: ProfileRequest = {
      uid: uid,
      birthdate: moment(values.birthdate).format(dateFormat),
      country: values.country,
      city: values.city,
      phone: values.phone
    }
    console.log(data);
    const profileResponse = await usePost<ProfileRequest>(createProfile, data);
    props.onChangeLoadingPage(false);
    console.log(profileResponse);
    
    if (!profileResponse.error) {
      showNotification(notification, 'success', 'Perfil creado con éxito');
      setProfileSuccess(true);
    } else {
      showNotification(notification, 'error', 'Hubo un error al crear su perfil');
    }
  }

  async function SendValidationCode() {
    const data: SendCodeRequest = {
      email: email, type: 'identity_verified'
    };
    const sendCodeResp = await usePost<SendCodeRequest>(sendCode, data);
    if (!sendCodeResp.error) {
      showNotification(notification, 'success', 'Se envió el código con éxito');
      setProfileSuccess(true);
    } else {
      showNotification(notification, 'error', 'Hubo un error al enviar el código');
    }
  }

  return (
    <>
      <Row style={{height: '100vh', backgroundColor: 'rgb(253 252 253)'}}>
        <Col xs={0} sm={0} md={7} lg={8} xl={8}></Col>
        <Col xs={24} sm={24} md={10} lg={8} xl={8}>
          <Flex align="center" justify="center" 
            style={{
              height: '100%', 
              backgroundColor: '#FAFAFA', 
              boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
              backgroundImage: `url(${backImage})`,
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat'
          }}>
            <Form 
              layout="vertical"
              colon={false} 
              requiredMark={false}
              onFinish={HandleSubmit}
            >
              <Title>Crea tu perfil</Title>
              <Birthdate></Birthdate>
              <Phone></Phone>
              <Country></Country>
              <City></City>

              {/* {showCodeValidation && (
                <a onClick={handleOpenModal} style={{ float: 'right', marginBottom: '24px', fontWeight: 'bold' }}>
                  Validar código
                </a>
              )} */}              
              <Form.Item style={{}} wrapperCol={{span: '24'}}>
                {!profileSuccess && (
                  <Button type="primary" htmlType="submit" style={{backgroundColor: '#BC1373'}}>
                    Guardar
                  </Button>
                )}
                {profileSuccess && (
                  <Button type="default" onClick={handleOpenModal} style={{backgroundColor: '#BC1373'}}>
                    Enviar código de validación
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Flex>
          
        </Col>
        <Col xs={0} sm={0} md={7} lg={8} xl={8}></Col>
      </Row>
      <ValidateCode 
        isOpen={isCodeModalOpen}
        onClose={handleCloseModal}
        onValidationSucces={handleValidationSuccess}
        email={email}
      />
    </>
  )
}

