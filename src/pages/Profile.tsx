import { App, Col, Form, Input, InputRef, Row, Space } from "antd";
import { ProfileRequest, SendCodeRequest } from "../models/Requests";
import { defaultCountry, maxImageSizeMb } from "../utilities/globals";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useContext, useEffect, useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import ValidateCode from "../components/section/profile/ValidateCode";
import { useNavigate } from "react-router-dom";
import { IdValueObj, useApiParams } from "../models/Interfaces";
import { setIsLoading } from "../redux/loadingSlice";
import ButtonContainer from "../components/containers/ButtonContainer";
import InputContainer from "../components/containers/InputContainer";
import SelectContainer from "../components/containers/SelectContainer";
import useApi from "../hooks/useApi";
import {
  profileCompanyService,
  profileUserService,
  sendCodeService,
} from "../services/authService";
import { useTranslation } from "react-i18next";
import { DocType } from "../utilities/types";
import {
  useAboutMeRules,
  useAddressRules,
  usePhoneRules,
  useSpecialtyRules,
} from "../hooks/validators";
import { DefaultOptionType } from "antd/es/select";
import React from "react";
import { checkImage, equalServices } from "../utilities/globalFunctions";
import InputNumberContainer from "../components/containers/InputNumberContainer";
import { ListsContext } from "../contexts/listsContext";

interface ProfileProps {
  email: string;
  docType: string;
}

export default function Profile(props: ProfileProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(ListsContext);
  const { countryList, countryData, categoryList } = context;
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const fileInputRef = React.useRef<InputRef>(null);
  const uid = useSelector((state: MainState) => state.user.uid);
  const [isCodeModalOpen, setIsCodeModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("https://placehold.co/100x100");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [cities, setCities] = useState<IdValueObj[]>([]);
  const [apiParams, setApiParams] = useState<
    useApiParams<ProfileRequest | SendCodeRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    ProfileRequest | SendCodeRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  const { addressRules } = useAddressRules(true);
  const { phoneRules } = usePhoneRules(true);
  const { specialtyRules } = useSpecialtyRules(true);
  const { aboutMeRules } = useAboutMeRules(false);

  useEffect(() => {
    if (
      equalServices(apiParams.service, profileUserService()) ||
      equalServices(apiParams.service, profileCompanyService())
    )
      dispatch(setIsLoading(loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (Object.keys(countryData).length > 0 && countryList.length > 0)
      SetCountriesAndCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData, countryList]);

  useEffect(() => {
    if (responseData) {
      if (
        equalServices(apiParams.service, profileUserService()) ||
        equalServices(apiParams.service, profileCompanyService())
      ) {
        showNotification(notification, "success", t("createProfileSuccess"));
        setProfileSuccess(true);
      } else if (equalServices(apiParams.service, sendCodeService())) {
        showNotification(notification, "success", t("sendCodeSuccess"));
      }
    } else if (error) {
      if (
        equalServices(apiParams.service, profileUserService()) ||
        equalServices(apiParams.service, profileCompanyService()) ||
        equalServices(apiParams.service, sendCodeService())
      ) {
        showNotification(notification, "error", errorMsg);
        if (
          equalServices(apiParams.service, profileUserService()) ||
          equalServices(apiParams.service, profileCompanyService())
        )
          setProfileSuccess(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function SetCountriesAndCities() {
    const showCountry = countryData[defaultCountry]
      ? defaultCountry
      : Object.keys(countryData)[0];
    if (countryData[showCountry]) {
      setCities(countryData[showCountry].cities);
      if (countryList.length) form.setFieldValue("country", showCountry); //countryData[showCountry]);
    }
  }

  function handleCountryChange(_: string, object: DefaultOptionType) {
    setCities(countryData[object.id].cities);
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
    if (!checkDifferentCategories(values)) {
      showNotification(notification, "error", t("selectDifferentCategories"));
      return;
    }
    const data: ProfileRequest = {
      uid,
      phone: values.phone.trim(),
      address: values.address.trim(),
      country: values.country,
      city: values.city,
      categories: [values.category1, values.category2, values.category3],
      planID: 1, // r3v
    };

    if (props.docType == DocType.RUC) {
      data.specialtyID = values.specialty.trim();
      data.age = values.tenure;
      if (values.aboutMe) data.aboutMe = values.aboutMe.trim();
    }
    console.log(values, data);
    setApiParams({
      service:
        props.docType == DocType.RUC
          ? profileCompanyService()
          : profileUserService(),
      method: "post",
      dataToSend: data,
    });
  }

  async function SendValidationCode() {
    const data: SendCodeRequest = {
      email: props.email,
      type: "identity_verified",
    };
    setApiParams({
      service: sendCodeService(),
      method: "post",
      dataToSend: data,
    });
  }

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { validImage, validSize } = checkImage(file);
      if (validImage && validSize) setImageSrc(URL.createObjectURL(file));
      else if (!validImage)
        showNotification(notification, "error", t("invalidImage"));
      else if (!validSize)
        showNotification(
          notification,
          "error",
          t("invalidImageSize") + maxImageSizeMb + " mb"
        );
    }
  }

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.input!.click();
    }
  }

  function checkDifferentCategories(values: any) {
    return (
      values.category1 !== values.category2 &&
      values.category1 !== values.category3 &&
      values.category2 !== values.category3
    );
  }

  return (
    <>
      <div className="modal-login">
        <div className="login-box text-center wd-50">
          <h1 className="text-left" style={{ margin: "0 0 5px 0" }}>
            {t("createYourProfile")}
          </h1>
          <p className="text-left" style={{ color: "#6a6a6a" }}>
            {t("subtitleProfile")}
          </p>

          <Form
            form={form}
            disabled={profileSuccess}
            // layout="vertical"
            colon={false}
            requiredMark={false}
            onFinish={HandleSubmit}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div className="t-flex" style={{ justifyContent: "center" }}>
                <img
                  src={imageSrc}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <i
                  onClick={handleClick}
                  className="fa-regular fa-image"
                  style={{
                    background: "#fff",
                    height: "30px",
                    width: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "100px",
                    boxShadow: "0 0.125rem 0.35rem rgb(0 0 0 / 30%)",
                    cursor: "pointer",
                  }}
                ></i>
              </div>

              <Form.Item name="image" style={{ display: "none" }}>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={handleChangeImage}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </Form.Item>
              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={t("phone")}
                    name="phone"
                    rules={phoneRules}
                    labelCol={{ span: 0 }}
                  >
                    <Space.Compact style={{ width: "100%" }}>
                      <InputContainer
                        style={{ width: "25%" }}
                        readOnly={true}
                        defaultValue="+51"
                        className="form-control"
                      />
                      <InputContainer
                        className="form-control"
                        style={{ width: "75%" }}
                        placeholder={t("phone")}
                      />
                    </Space.Compact>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={t("address")}
                    name="address"
                    rules={addressRules}
                    labelCol={{ span: 0 }}
                  >
                    <InputContainer
                      className="form-control"
                      placeholder={t("address")}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={t("country")}
                    labelCol={{ span: 0 }}
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
                      options={countryList.map((co: IdValueObj) => {
                        return { id: co.id, label: co.value, value: co.id };
                      })}
                      className="form-control"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={t("city")}
                    labelCol={{ span: 0 }}
                    name="city"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <SelectContainer
                      placeholder={t("city")}
                      options={cities.map((cit: IdValueObj) => {
                        return { id: cit.id, label: cit.value, value: cit.id };
                      })}
                      className="form-control"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {props.docType == DocType.RUC && (
                <>
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="tenure"
                        label={t("tenure")}
                        labelCol={{ span: 0 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        {/* <SelectContainer
                          placeholder={t("tenure")}
                          className="form-control"
                          options={tenureList.map((t: IdValueObj) => {
                            return { id: t.id, label: t.value, value: t.id };
                          })}
                        /> */}
                        <InputNumberContainer
                          min={0}
                          parser={(value) => parseInt(value || "0", 10)}
                          className="form-control"
                          placeholder={t("tenure") + ` (${t("years")})`}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label={t("specialty")}
                        labelCol={{ span: 0 }}
                        name="specialty"
                        rules={specialtyRules}
                      >
                        <InputContainer
                          className="form-control"
                          placeholder={t("specialty")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label={t("field")}
                    labelCol={{ span: 0 }}
                    name="aboutMe"
                    rules={aboutMeRules}
                  >
                    <InputContainer
                      className="form-control"
                      placeholder={t("aboutMe")}
                    />
                  </Form.Item>
                </>
              )}

              <label
                className="text-left"
                style={{ fontWeight: "500", color: "#6a6a6a" }}
              >
                {t("categories")}
              </label>

              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
                    <SelectContainer
                      placeholder={t("select")}
                      className="form-control"
                      options={categoryList.map((cat: IdValueObj) => {
                        return { id: cat.id, label: cat.value, value: cat.id };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
                    <SelectContainer
                      placeholder={t("select")}
                      className="form-control"
                      options={categoryList.map((cat: IdValueObj) => {
                        return { id: cat.id, label: cat.value, value: cat.id };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
                    <SelectContainer
                      placeholder={t("select")}
                      className="form-control"
                      options={categoryList.map((cat: IdValueObj) => {
                        return { id: cat.id, label: cat.value, value: cat.id };
                      })}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{}} wrapperCol={{ span: "24" }}>
                {!profileSuccess && (
                  <ButtonContainer
                    htmlType="submit"
                    children={t("saveButton")}
                    className="btn btn-default wd-100"
                  />
                )}
                {profileSuccess && (
                  <ButtonContainer
                    onClick={handleOpenModal}
                    disabled={false}
                    children={t("sendValidationCode")}
                    className="btn btn-default wd-100"
                  />
                )}
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className="image-box wd-50"></div>
      </div>
      <ValidateCode
        isOpen={isCodeModalOpen}
        onClose={handleCloseModal}
        email={props.email}
        isForgotPassword={false}
      />
    </>
  );
}
