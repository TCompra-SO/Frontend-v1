import { useTranslation } from "react-i18next";
import { FullUser, PlanData } from "../models/MainInterfaces";
import { EntityType, ImageRequestLabels } from "../utilities/types";
import { useContext, useEffect, useRef, useState } from "react";
import { ListsContext } from "../contexts/ListsContext";
import PhoneField from "../components/common/formFields/PhoneField";
import LocationField from "../components/common/formFields/LocationField";
import AddressField from "../components/common/formFields/AddressField";
import EmailField from "../components/common/formFields/EmailField";
import { App, Form, Input, InputRef } from "antd";
import NameField from "../components/common/formFields/NameField";
import DniField from "../components/common/formFields/DniField";
import TenureField from "../components/common/formFields/TenureField";
import SpecialtyField from "../components/common/formFields/SpecialtyField";
import AboutMeField from "../components/common/formFields/AboutMeField";
import ButtonContainer from "../components/containers/ButtonContainer";
import { defaultUserImage } from "../utilities/globals";
import { useHandleChangeImage } from "../hooks/useHandleChangeImage";
import PasswordField from "../components/common/formFields/PasswordField";
import { useApiParams } from "../models/Interfaces";
import { NewPasswordRequest, UploadAvatarRequest } from "../models/Requests";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import useApi from "../hooks/useApi";
import {
  getUserService,
  newPasswordService,
} from "../services/requests/authService";
import showNotification from "../utilities/notification/showNotification";
import { equalServices } from "../utilities/globalFunctions";
import { transformToFullUser } from "../utilities/transform";
import { uploadAvatarService } from "../services/requests/imageService";

const planData1: PlanData = {
  goods: 9982,
  services: 1213,
  sales: 34,
  offers: 1394,
};

export default function MyProfile() {
  const { t } = useTranslation();
  const [user, setUser] = useState<FullUser>();
  const [plan, setPlan] = useState<PlanData>();
  const context = useContext(ListsContext);
  const { categoryData } = context;
  const fileInputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { notification } = App.useApp();
  const [imageSrc, setImageSrc] = useState(defaultUserImage);
  const handleChangeImage = useHandleChangeImage(notification);
  const [token] = useState(useSelector((state: MainState) => state.user.token));
  const uid = useSelector((state: MainState) => state.user.uid);

  const [apiParams, setApiParams] = useState<
    useApiParams<NewPasswordRequest | FormData>
  >({
    service: null,
    method: "get",
    token,
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    NewPasswordRequest | FormData
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
    token: apiParams.token,
  });

  const [apiParamsImage, setApiParamsImage] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
    token,
  });
  const {
    loading: loadingImage,
    responseData: responseDataImage,
    error: errorImage,
    errorMsg: errorMsgImage,
    fetchData: fetchDataImage,
  } = useApi<NewPasswordRequest | FormData>({
    service: apiParamsImage.service,
    method: apiParamsImage.method,
    dataToSend: apiParamsImage.dataToSend,
    token: apiParamsImage.token,
  });

  // const [apiParamsForm, setApiParamsForm] = useState<useApiParams<any>>({ /* r3v */
  //   service: null,
  //   method: "get",
  //   token,
  // });
  // const {
  //   loading: loadingForm,
  //   responseData: responseDataForm,
  //   error: errorForm,
  //   errorMsg: errorMsgForm,
  //   fetchData: fetchDataForm,
  // } = useApi<NewPasswordRequest | FormData>({
  //   service: apiParamsForm.service,
  //   method: apiParamsForm.method,
  //   dataToSend: apiParamsForm.dataToSend,
  //   token: apiParamsForm.token,
  // });

  useEffect(() => {
    setApiParams({
      service: getUserService(uid),
      method: "get",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user)
      form.setFieldsValue({
        address: user.address,
        name: user.name,
        location: user.cityID,
        phone: user.phone,
        email: user.email,
        document: user.document,
        tenure: user.tenure,
        specialty: user.specialty,
        aboutMe: user.aboutMe,
      });
    if (user?.avatar) setImageSrc(user.avatar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (apiParamsImage.service) {
      fetchDataImage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImage]);

  useEffect(() => {
    if (apiParams.service) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, newPasswordService()))
        changePasswordSuccess();
      else if (equalServices(apiParams.service, getUserService("")))
        setFormData(responseData);
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataImage) {
      showNotification(notification, "success", t("imageUpdatedSuccessfully"));
    } else if (errorImage) {
      showNotification(notification, "error", errorMsgImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImage, errorImage]);

  function setFormData(responseData: any) {
    const user = transformToFullUser(responseData.data);
    setUser(user);
    setPlan(planData1);
    if (user.image) setImageSrc(user.image);
  }

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.input!.click();
    }
  }

  function changePasswordSuccess() {
    showNotification(notification, "success", t("passwordHasBeenUpdated"));
  }

  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = handleChangeImage(e);

    if (file && user) {
      const data: UploadAvatarRequest = {
        uid: user.uid,
        avatar: file,
      };
      const formData = new FormData();
      formData.append(ImageRequestLabels.AVATAR, data.avatar);
      formData.append(ImageRequestLabels.UID, data.uid);
      setApiParamsImage({
        service: uploadAvatarService(),
        method: "post",
        dataToSend: formData,
      });
      setImageSrc(URL.createObjectURL(file));
    }
  }

  function saveMyProfile(values: any) {
    console.log(user?.uid, values);
    values.address.trim();
    values.phone.trim();
    values.specialty.trim();
    values.aboutMe.trim();
  }

  function saveMyPassword(values: any) {
    if (values.password1 !== values.password2) {
      showNotification(notification, "error", t("passwordsMusMatch"));
      passwordForm.resetFields();
      return;
    }
    const passwordData: NewPasswordRequest = {
      email: user?.email ?? "",
      password: values.password1,
    };
    setApiParams({
      service: newPasswordService(),
      method: "post",
      dataToSend: passwordData,
      token: token,
    });
  }

  return (
    <>
      <div className="t-flex t-wrap c-titulo">
        <div className="titulo">{t("myProfile")}</div>
      </div>
      <div className="t-flex gap-15 f-column">
        <div className="t-flex gap-15 perfil-user">
          <div className="card-white imagen-perfil">
            <img src={imageSrc} className="imagen-p" />
            <ButtonContainer
              className="bnt-filter"
              onClick={handleClick}
              loading={loadingImage}
            >
              {t("uploadImage")} <i className="fa-regular fa-images"></i>
            </ButtonContainer>
          </div>

          <div className="t-flex gap-15 card-datos">
            <div className="card-white card-d1">
              <div className="user-name">{user?.name}</div>
              <div className="t-flex gap-10 datos-conacto">
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-location-dot"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("address")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.address}
                    </div>
                  </div>
                </div>
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-mobile"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("phone")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.phone}
                    </div>
                  </div>
                </div>
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("email")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="t-flex gap-15 card-d2">
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 1
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[0]]?.value}
                  </div>
                </div>
              </div>
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 2
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[1]]?.value}
                  </div>
                </div>
              </div>
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 3
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[2]]?.value}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex t-wrap gap-15 card-d3">
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-dolly"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {user?.numGoods}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("goods")}
              </div>
            </div>
          </div>
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-hand-holding-magic"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {user?.numServices}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("services")}
              </div>
            </div>
          </div>
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-basket-shopping"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {user?.numSales}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("sales")}
              </div>
            </div>
          </div>
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-tags"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {user?.numOffers}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("offers")}
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 card-d4">
          <div className="card-white card-personal">
            <div className="t-flex mr-sub-2">
              <i className="fa-regular fa-id-card-clip sub-icon m-0"></i>
              <div className="sub-titulo sub-calificar">
                <div>{t("personalData")}</div>
              </div>
            </div>
            <Form
              form={form}
              colon={false}
              requiredMark={false}
              onFinish={saveMyProfile}
            >
              <Form.Item name="image" style={{ display: "none" }}>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeImage}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </Form.Item>
              <div className="t-flex gap-15 f-column">
                <div className="t-flex t-wrap gap-15">
                  <NameField fromMyPerfil edit />
                  <AddressField fromMyPerfil />
                  <LocationField fromMyPerfil />
                </div>
                <div className="t-flex t-wrap gap-15">
                  <PhoneField fromMyPerfil />
                  <EmailField fromMyPerfil edit />
                  <DniField
                    fromMyPerfil
                    isDni={user?.typeEntity != EntityType.COMPANY}
                    edit
                    value={user?.document}
                  />
                  {user?.typeEntity == EntityType.COMPANY && (
                    <TenureField fromMyPerfil />
                  )}
                </div>
                {user?.typeEntity == EntityType.COMPANY && (
                  <div className="t-flex t-wrap gap-15">
                    <SpecialtyField fromMyPerfil />
                    <AboutMeField fromMyPerfil />
                  </div>
                )}
                <div className="t-flex t-wrap up-footer">
                  <div className="footer-text">{t("allDataIsImportant")}</div>
                  <ButtonContainer
                    className="btn btn-default"
                    htmlType="submit"
                    // loading={
                    //   equalServices(apiParams.service, newPasswordService())
                    //     ? loading
                    //     : undefined
                    // }
                  >
                    {t("saveButton")}
                  </ButtonContainer>
                </div>
              </div>
            </Form>
          </div>
          <div className="card-white card-pass">
            <div className="t-flex mr-sub-2">
              <i className="fa-regular fa-user-lock sub-icon m-0"></i>
              <div className="sub-titulo sub-calificar">
                <div>{t("password")}</div>
              </div>
            </div>
            <Form
              form={passwordForm}
              colon={false}
              requiredMark={false}
              onFinish={saveMyPassword}
            >
              <div className="t-flex gap-15 f-column">
                <PasswordField fromMyPerfil name="password1" />
                <PasswordField fromMyPerfil name="password2" confirmPassword />
                <ButtonContainer
                  className="btn btn-default wd-100"
                  htmlType="submit"
                  loading={
                    equalServices(apiParams.service, newPasswordService())
                      ? loading
                      : undefined
                  }
                >
                  {t("saveButton")}
                </ButtonContainer>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
