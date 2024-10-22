import { App, Col, Form, Input, InputRef, Row } from "antd";
import { ProfileRequest } from "../models/Requests";
import {
  defaultCountry,
  defaultUserImage,
  phoneCode,
} from "../utilities/globals";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { useContext, useEffect, useState } from "react";
import showNotification from "../utilities/notification/showNotification";
import { IdValueObj, useApiParams } from "../models/Interfaces";
import ButtonContainer from "../components/containers/ButtonContainer";
import SelectContainer from "../components/containers/SelectContainer";
import useApi from "../hooks/useApi";
import {
  profileCompanyService,
  profileUserService,
} from "../services/requests/authService";
import { useTranslation } from "react-i18next";
import { DocType } from "../utilities/types";
import { DefaultOptionType } from "antd/es/select";
import React from "react";
import {
  equalServices,
  getListForSelectIdValueMap,
} from "../utilities/globalFunctions";
import { ListsContext } from "../contexts/listsContext";
import PhoneField from "../components/common/formFields/PhoneField";
import AddressField from "../components/common/formFields/AddressField";
import TenureField from "../components/common/formFields/TenureField";
import SpecialtyField from "../components/common/formFields/SpecialtyField";
import AboutMeField from "../components/common/formFields/AboutMeField";
import { useHandleChangeImage } from "../hooks/useHandleChangeImage";
// import LocationField from "../components/common/formFields/LocationField";

interface ProfileProps {
  docType: string;
  openValidateCodeModal: () => void;
  closeProfileModal: () => void;
}

export default function Profile(props: ProfileProps) {
  const context = useContext(ListsContext);
  const { countryList, countryData, categoryData } = context;
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const fileInputRef = React.useRef<InputRef>(null);
  const uid = useSelector((state: MainState) => state.user.uid);
  const [imageSrc, setImageSrc] = useState(defaultUserImage);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [cities, setCities] = useState<IdValueObj[]>([]);
  const handleChangeImage = useHandleChangeImage(notification);
  const [apiParams, setApiParams] = useState<useApiParams<ProfileRequest>>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<ProfileRequest>({
      service: apiParams.service,
      method: apiParams.method,
      dataToSend: apiParams.dataToSend,
    });

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
      }
    } else if (error) {
      if (
        equalServices(apiParams.service, profileUserService()) ||
        equalServices(apiParams.service, profileCompanyService())
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

  async function HandleSubmit(values: any) {
    if (!checkDifferentCategories(values)) {
      showNotification(notification, "error", t("selectDifferentCategories"));
      return;
    }
    const data: ProfileRequest = {
      uid,
      phone: phoneCode + values.phone.trim(),
      address: values.address.trim(),
      countryID: values.country,
      cityID: values.location,
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

  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = handleChangeImage(e);
    if (file) setImageSrc(URL.createObjectURL(file));
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
                  onChange={changeImage}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </Form.Item>
              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <PhoneField onlyItem />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <AddressField onlyItem />
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
                      <TenureField onlyItem />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <SpecialtyField onlyItem />
                    </Col>
                  </Row>

                  <AboutMeField onlyItem />
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
                      options={getListForSelectIdValueMap(categoryData)}
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
                      options={getListForSelectIdValueMap(categoryData)}
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
                      options={getListForSelectIdValueMap(categoryData)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{}} wrapperCol={{ span: "24" }}>
                {!profileSuccess && (
                  <ButtonContainer
                    loading={loading}
                    htmlType="submit"
                    children={t("saveButton")}
                    className="btn btn-default wd-100"
                  />
                )}
                {profileSuccess && (
                  <ButtonContainer
                    onClick={() => {
                      props.openValidateCodeModal();
                      props.closeProfileModal();
                    }}
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
    </>
  );
}
