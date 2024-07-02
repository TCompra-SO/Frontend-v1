import { App, Button, Col, Flex, Form, Row } from "antd";
import Birthdate from "../components/section/profile/Birthdate";
import Phone from "../components/section/profile/Phone";
import Country from "../components/section/profile/Country";
import City from "../components/section/profile/City";
import usePost from "../hooks/usePost";
import { ProfileRequest, SendCodeRequest } from "../models/Auth";
import createProfile from "../services/auth/profile.service";
import moment from 'moment';
import { dateFormat } from "../utilities/globals";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useEffect, useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import ValidateCode from "../components/modals/ValidateCode";
import { useLocation, useNavigate } from "react-router-dom";
import sendCode from "../services/auth/sendCode.service";
import backgroundImage from "../assets/images/silder-tc-04.jpg";
import Title from "antd/es/typography/Title";
import getCountries from "../services/utils/country.service";
import { CountriesRequest, CountryObj } from "../models/Interfaces";
import { HttpObject } from "../models/HttpObject";

interface ProfileProps {
  onChangeLoadingPage: (isLoading: boolean) => void; 
}

export default function Profile(props: ProfileProps) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const uid = useSelector((state: MainState) => state.user.uid);  
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [countryObj, setCountryObj] = useState<{[key: string]: string[]}>({});

  useEffect(() => {
    GetCountriesAndCities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  async function GetCountriesAndCities() {
    const request: CountriesRequest = { verify: 2 };
    const response: HttpObject = await usePost<CountriesRequest>(getCountries, request);
    let cityList: string[] = [];

    if (!response.error) {
      const countryList: string[] = response.data.map((country: CountryObj, i: number) => {
        setCountryObj(prevCountryObj => ({
          ...prevCountryObj,
          [country.country]: country.cities!
        }));
        if (i == 0) cityList = country.cities!;
        return country.country;
      });
      setCountries(countryList);
      setCities(cityList);
      if (countryList.length) form.setFieldValue('country', countryList[0]);
    }
  }

  function handleCountryChange(newCountry: string) {
    setCities(countryObj[newCountry]);
    form.setFieldsValue({city: null});
  }

  function handleOpenModal() {
    setIsCodeModalVisible(true);
    SendValidationCode();
  }

  function handleCloseModal(validationSuccess: boolean) {
    setIsCodeModalVisible(false);
    if (validationSuccess) navigate('/');
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
    const profileResponse = await usePost<ProfileRequest>(createProfile, data);
    props.onChangeLoadingPage(false);
    
    if (!profileResponse.error) {
      showNotification(notification, 'success', 'Perfil creado con éxito');
      setProfileSuccess(true);
    } else {
      showNotification(notification, 'error', profileResponse.error);
      setProfileSuccess(false);
    }
  }

  async function SendValidationCode() {
    const data: SendCodeRequest = {
      email: email, type: 'identity_verified'
    };
    const sendCodeResp = await usePost<SendCodeRequest>(sendCode, data);
    if (!sendCodeResp.error) {
      showNotification(notification, 'success', 'Se envió el código con éxito');
    } else {
      showNotification(notification, 'error', sendCodeResp.error);
    }
  }

  return (
    <>
      <Row style={{
        height: '100vh', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Col xs={0} sm={0} md={12} lg={12} xl={14}></Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <Flex align="center" justify="center" 
            style={{
              height: '100vh', 
              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '0 60px',
          }}>
            <Form 
              form={form}
              layout="vertical"
              colon={false} 
              requiredMark={false}
              onFinish={HandleSubmit}
            >
              <Title style={{marginBottom: '50px'}}>Crea tu perfil</Title>
              <Birthdate></Birthdate>
              <Phone></Phone>
              <Country 
                countries={countries}
                onChangeCountry={handleCountryChange}>
              </Country>
              <City cities={cities}></City>
             
              <Form.Item style={{}} wrapperCol={{span: '24'}}>
                {!profileSuccess && (
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    style={{marginTop: '30px', height: '50px'}} 
                    shape="round"
                    block={true}>
                      Guardar
                  </Button>
                )}
                {profileSuccess && (
                  <Button 
                    type="primary" 
                    onClick={handleOpenModal} 
                    style={{marginTop: '30px', height: '50px'}} 
                    shape="round"
                    block={true}
                    >
                      Enviar código de validación
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Flex>
          
        </Col>
      </Row>
      <ValidateCode 
        isOpen={isCodeModalOpen}
        onClose={handleCloseModal}
        email={email}
      />
    </>
  )
}

