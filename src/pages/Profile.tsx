import { App, Col, Flex, Form, Row, Space } from "antd";
import usePost from "../hooks/usePost";
import { ProfileRequest, SendCodeRequest } from "../models/Requests";
import createProfile from "../services/auth/profile.service";
import moment from "moment";
import { dateFormat } from "../utilities/globals";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useEffect, useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import ValidateCode from "../components/section/profile/ValidateCode";
import { useLocation, useNavigate } from "react-router-dom";
import sendCode from "../services/auth/sendCode.service";
import backgroundImage from "../assets/images/silder-tc-04.jpg";
import Title from "antd/es/typography/Title";
import getCountries from "../services/utils/country.service";
import { CountriesRequest, CountryObj, HttpObject } from "../models/Interfaces";
import { setIsLoading } from "../redux/loadingSlice";
import ButtonContainer from "../components/containers/ButtonContainer";
import DatePickerContainer from "../components/containers/DatePickerContainer";
import InputContainer from "../components/containers/InputContainer";
import { Lengths } from "../utilities/lengths";
import { validateNumber } from "../utilities/globalFunctions";
import SelectContainer from "../components/containers/SelectContainer";

const rulesBirthdate = [
  {
    required: true,
    message: "Campo obligatorio",
  },
];

const rulesPhone = [
  {
    required: true,
    message: "Campo obligatorio",
  },
  {
    min: Lengths.phone.min,
    message: `Ingresa mínimo ${Lengths.phone.min} caracteres`,
  },
  {
    max: Lengths.phone.max,
    message: `Ingresa máximo ${Lengths.phone.max} caracteres`,
  },
  {
    validator: validateNumber,
  },
];

const rulesCountry = [
  {
    required: true,
    message: "Campo obligatorio",
  },
];

const rulesCity = [
  {
    required: true,
    message: "Campo obligatorio",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { email } = state;
  // const email = 'aall@gmail.com';
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [countryObj, setCountryObj] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    GetCountriesAndCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function GetCountriesAndCities() {
    const request: CountriesRequest = { verify: 2 };
    const response: HttpObject = await usePost<CountriesRequest>(
      getCountries,
      request
    );
    let cityList: string[] = [];

    if (!response.error) {
      const countryList: string[] = response.data.map(
        (country: CountryObj, i: number) => {
          setCountryObj((prevCountryObj) => ({
            ...prevCountryObj,
            [country.country]: country.cities!,
          }));
          if (i == 0) cityList = country.cities!;
          return country.country;
        }
      );
      setCountries(countryList);
      setCities(cityList);
      if (countryList.length) form.setFieldValue("country", countryList[0]);
    }
  }

  function handleCountryChange(newCountry: string) {
    setCities(countryObj[newCountry]);
    form.setFieldsValue({ city: null });
  }

  function handleOpenModal() {
    setIsCodeModalVisible(true);
    SendValidationCode();
  }

  function handleCloseModal(validationSuccess: boolean) {
    setIsCodeModalVisible(false);
    if (validationSuccess) navigate("/");
  }

  async function HandleSubmit(values: any) {
    dispatch(setIsLoading(true));

    const data: ProfileRequest = {
      uid: uid,
      birthdate: moment(values.birthdate).format(dateFormat),
      country: values.country,
      city: values.city,
      phone: values.phone,
    };
    const profileResponse = await usePost<ProfileRequest>(createProfile, data);
    dispatch(setIsLoading(false));

    if (!profileResponse.error) {
      showNotification(notification, "success", "Perfil creado con éxito");
      setProfileSuccess(true);
    } else {
      showNotification(notification, "error", profileResponse.error);
      setProfileSuccess(false);
    }
  }

  async function SendValidationCode() {
    const data: SendCodeRequest = {
      email: email,
      type: "identity_verified",
    };
    const sendCodeResp = await usePost<SendCodeRequest>(sendCode, data);
    if (!sendCodeResp.error) {
      showNotification(notification, "success", "Se envió el código con éxito");
    } else {
      showNotification(notification, "error", sendCodeResp.error);
    }
  }

  return (
    <>
      <Row
        style={{
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Col xs={0} sm={0} md={12} lg={12} xl={14}></Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <Flex
            align="center"
            justify="center"
            style={{
              height: "100vh",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 2px 18px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "0 60px",
            }}
          >
            <Form
              form={form}
              disabled={profileSuccess}
              layout="vertical"
              colon={false}
              requiredMark={false}
              onFinish={HandleSubmit}
            >
              <Title style={{ marginBottom: "50px" }}>Crea tu perfil</Title>
              <Form.Item
                label="Fecha de nacimiento"
                name="birthdate"
                rules={rulesBirthdate}
              >
                <DatePickerContainer
                  disabled={profileSuccess}
                  format={dateFormat}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Teléfono" name="phone" rules={rulesPhone}>
                <Space.Compact>
                  <InputContainer
                    style={{ width: "20%" }}
                    readOnly={true}
                    defaultValue="+51"
                  />
                  <InputContainer style={{ width: "80%" }} />
                </Space.Compact>
              </Form.Item>

              <Form.Item label="País" name="country" rules={rulesCountry}>
                <SelectContainer
                  placeholder="Seleccionar"
                  onChange={handleCountryChange}
                  options={countries.map((country) => {
                    return { label: country, value: country };
                  })}
                />
              </Form.Item>
              <Form.Item label="Ciudad" name="city" rules={rulesCity}>
                <SelectContainer
                  placeholder="Seleccionar"
                  options={cities.map((city) => {
                    return { label: city, value: city, key: city };
                  })}
                />
              </Form.Item>

              <Form.Item style={{}} wrapperCol={{ span: "24" }}>
                {!profileSuccess && (
                  <ButtonContainer
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "30px", height: "50px" }}
                    shape="round"
                    block={true}
                    text="Guardar"
                  />
                )}
                {profileSuccess && (
                  <ButtonContainer
                    type="primary"
                    onClick={handleOpenModal}
                    style={{ marginTop: "30px", height: "50px" }}
                    shape="round"
                    block={true}
                    disabled={false}
                    text="Enviar código de validación"
                  />
                )}
              </Form.Item>
            </Form>
          </Flex>
        </Col>
      </Row>
      {/* <ModalContainer
        type={ModalTypes.VALIDATE_CODE}
        data={null}
        isOpen={isCodeModalOpen}
        onClose={handleCloseModal}
        email={email}
      ></ModalContainer> */}
      <ValidateCode
        isOpen={isCodeModalOpen}
        onClose={handleCloseModal}
        email={email}
      />
    </>
  );
}
