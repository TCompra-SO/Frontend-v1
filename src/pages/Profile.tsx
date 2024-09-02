import { App, Col, Flex, Form, Input, Row, Space } from "antd";
import { ProfileRequest, SendCodeRequest } from "../models/Requests";
import moment from "moment";
import { dateFormat } from "../utilities/globals";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useContext, useEffect, useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import ValidateCode from "../components/section/profile/ValidateCode";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/silder-tc-04.jpg";
import Title from "antd/es/typography/Title";

import {
  CountriesRequest,
  CountryObj,
  useApiParams,
} from "../models/Interfaces";
import { setIsLoading } from "../redux/loadingSlice";
import ButtonContainer from "../components/containers/ButtonContainer";
// import DatePickerContainer from "../components/containers/DatePickerContainer";
import InputContainer from "../components/containers/InputContainer";
import SelectContainer from "../components/containers/SelectContainer";
import useApi from "../hooks/useApi";
import { countriesService } from "../services/utilService";
import { profileService, sendCodeService } from "../services/authService";
import { useTranslation } from "react-i18next";
import { CountriesRequestType, DocType } from "../utilities/types";
import ImageContainer from "../components/containers/ImageContainer";
import {
  useAddressRules,
  usePhoneRules,
  useSpecialtyRules,
} from "../hooks/validators";
import { ListsContext } from "../contexts/ListsContext";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(ListsContext);
  const { countryList } = context;
  console.log("..........", countryList);
  // const { state } = useLocation();
  // const { email, type } = state;
  const email = "aall@gmail.com";
  const type = DocType.RUC;
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [countryObj, setCountryObj] = useState<{ [key: string]: string[] }>({});
  const [apiParams, setApiParams] = useState<
    useApiParams<CountriesRequest | ProfileRequest | SendCodeRequest>
  >({
    service: countriesService,
    method: "post",
    dataToSend: { verify: CountriesRequestType.COUNTRY_CITY },
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    CountriesRequest | ProfileRequest | SendCodeRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  const { addressRules } = useAddressRules(true);
  const { phoneRules } = usePhoneRules(true);
  const { specialtyRules } = useSpecialtyRules(true);

  useEffect(() => {
    if (apiParams.service == profileService) dispatch(setIsLoading(loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (apiParams.service == countriesService) {
        SetCountriesAndCities();
      } else if (apiParams.service == profileService) {
        showNotification(notification, "success", t("createProfileSuccess"));
        setProfileSuccess(true);
      } else if (apiParams.service == sendCodeService) {
        showNotification(notification, "success", t("sendCodeSuccess"));
      }
    } else if (error) {
      if (
        apiParams.service == profileService ||
        apiParams.service == sendCodeService
      ) {
        showNotification(notification, "error", errorMsg);
        if (apiParams.service == profileService) setProfileSuccess(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function SetCountriesAndCities() {
    let cityList: string[] = [];

    const countryList: string[] = responseData.map(
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
    console.log(values);
    const data: ProfileRequest = {
      // uid: uid,
      // birthdate: moment(values.birthdate).format(dateFormat),
      // country: values.country,
      // city: values.city,
      // phone: values.phone,
      uid,
      phone: values.phone.trim(),
      address: values.address.trim(),
      country: values.country,
      city: values.city,
      categories: [],
      plan: "planId1", // r3v
    };

    if (values.specialty) data.specialty = values.specialty.trim();
    if (values.aboutMe) data.aboutMe = values.aboutMe.trim();

    setApiParams({
      service: profileService,
      method: "post",
      dataToSend: data,
    });
  }

  async function SendValidationCode() {
    const data: SendCodeRequest = {
      email: email,
      type: "identity_verified",
    };
    setApiParams({
      service: sendCodeService,
      method: "post",
      dataToSend: data,
    });
  }

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
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
              // layout="vertical"
              colon={false}
              requiredMark={false}
              onFinish={HandleSubmit}
            >
              <Title style={{ marginBottom: "50px" }}>
                {t("createYourProfile")}
              </Title>
              {/* <Form.Item
                label={t("birthdate")}
                name="birthdate"
                rules={rulesBirthdate}
              >
                <DatePickerContainer
                  disabled={profileSuccess}
                  format={dateFormat}
                  style={{ width: "100%" }}
                />
              </Form.Item> */}
              <ImageContainer
                fallback="https://placehold.co/100x100"
                style={{
                  borderRadius: 50,
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                }}
                src={imageSrc}
                preview={false}
              />
              <Form.Item name="image">
                <Input
                  accept="image/*"
                  type="file"
                  onChange={handleChangeImage}
                />
              </Form.Item>
              <Form.Item label={t("phone")} name="phone" rules={phoneRules}>
                <Space.Compact>
                  <InputContainer
                    style={{ width: "20%" }}
                    readOnly={true}
                    defaultValue="+51"
                  />
                  <InputContainer style={{ width: "80%" }} />
                </Space.Compact>
              </Form.Item>

              <Form.Item
                label={t("address")}
                name="address"
                rules={addressRules}
              >
                <InputContainer />
              </Form.Item>

              <Form.Item
                label={t("country")}
                name="country"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectContainer
                  placeholder={t("select")}
                  onChange={handleCountryChange}
                  options={countries.map((country) => {
                    return { label: country, value: country };
                  })}
                />
              </Form.Item>
              <Form.Item
                label={t("city")}
                name="city"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectContainer
                  placeholder={t("select")}
                  options={cities.map((city) => {
                    return { label: city, value: city, key: city };
                  })}
                />
              </Form.Item>

              {type == DocType.RUC && (
                <>
                  <Form.Item
                    name="tenure"
                    label={t("tenure")}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <SelectContainer placeholder={t("select")} />
                  </Form.Item>
                  <Form.Item
                    label={t("specialty")}
                    name="specialty"
                    rules={specialtyRules}
                  >
                    <InputContainer />
                  </Form.Item>
                  <Form.Item label={t("aboutMe")} name="aboutMe">
                    <InputContainer />
                  </Form.Item>
                </>
              )}

              {t("categories")}
              <Form.Item
                name="category1"
                label={t("category")}
                labelCol={{ span: 0 }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectContainer placeholder={t("select")} />
              </Form.Item>

              <Form.Item
                name="category2"
                label={t("category")}
                labelCol={{ span: 0 }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectContainer placeholder={t("select")} />
              </Form.Item>

              <Form.Item
                name="category3"
                label={t("category")}
                labelCol={{ span: 0 }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectContainer placeholder={t("select")} />
              </Form.Item>

              <Form.Item style={{}} wrapperCol={{ span: "24" }}>
                {!profileSuccess && (
                  <ButtonContainer
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "30px", height: "50px" }}
                    shape="round"
                    block={true}
                    children={t("saveButton")}
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
                    children={t("sendValidationCode")}
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
