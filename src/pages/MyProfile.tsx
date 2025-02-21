import { useTranslation } from "react-i18next";
import { FullUser, SubUserProfile } from "../models/MainInterfaces";
import { EntityType, ImageRequestLabels } from "../utilities/types";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ListsContext } from "../contexts/ListsContext";
import PhoneField from "../components/common/formFields/PhoneField";
import LocationField from "../components/common/formFields/LocationField";
import AddressField from "../components/common/formFields/AddressField";
import EmailField from "../components/common/formFields/EmailField";
import { Form, Input, InputRef } from "antd";
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
import {
  NewPasswordRequest,
  UpdateProfileRequest,
  UpdateProfileSubUserRequest,
  UploadAvatarRequest,
} from "../models/Requests";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import useApi from "../hooks/useApi";
import {
  getUserService,
  newPasswordService,
  updateProfileCompanyService,
  updateProfileUserService,
} from "../services/requests/authService";
import { equalServices } from "../utilities/globalFunctions";
import {
  transformToFullUser,
  transformToSubUserProfile,
} from "../utilities/transform";
import { uploadAvatarService } from "../services/requests/imageService";
import {
  getSubUserService,
  updateProfileSubUserService,
} from "../services/requests/subUserService";
import useShowNotification from "../hooks/utilHooks";
import { setUserImage } from "../redux/userSlice";

export default function MyProfile() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const dispatch = useDispatch();
  const handleChangeImage = useHandleChangeImage();
  const { showNotification } = useShowNotification();
  const { categoryData } = context;
  const [user, setUser] = useState<FullUser | SubUserProfile>();
  const [mainUser, setMainUser] = useState<FullUser>();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [imageSrc, setImageSrc] = useState(defaultUserImage);
  const [token] = useState(useSelector((state: MainState) => state.user.token));
  const fileInputRef = useRef<InputRef>(null);
  const uid = useSelector((state: MainState) => state.user.uid);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);

  /** Cambiar contraseña y obtener datos iniciales */

  const [apiParams, setApiParams] = useState<useApiParams<NewPasswordRequest>>({
    service: null,
    method: "get",
    token,
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<NewPasswordRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, newPasswordService()))
        changePasswordSuccess();
      else if (
        equalServices(apiParams.service, getUserService("")) ||
        equalServices(apiParams.service, getSubUserService(""))
      )
        setFormData(responseData);
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Cambiar imagen */

  const [apiParamsImage, setApiParamsImage] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
    token,
    includeHeader: false,
  });
  const {
    loading: loadingImage,
    responseData: responseDataImage,
    error: errorImage,
    errorMsg: errorMsgImage,
    fetchData: fetchDataImage,
  } = useApi<NewPasswordRequest | FormData>(apiParamsImage);

  useEffect(() => {
    if (apiParamsImage.service) {
      fetchDataImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImage]);

  useEffect(() => {
    if (responseDataImage) {
      showNotification("success", t("imageUpdatedSuccessfully"));
      dispatch(setUserImage(responseDataImage.url));
    } else if (errorImage) {
      setImageSrc(defaultUserImage);
      // fileInputRef?.current?.value = "";
      showNotification("error", errorMsgImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImage, errorImage]);

  /** Obtener datos de usuario principal */

  const [apiParamsMainUser, setApiParamsMainUser] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const { responseData: responseDataMainUser, fetchData: fetchDataMainUser } =
    useApi({
      service: apiParamsMainUser.service,
      method: apiParamsMainUser.method,
      dataToSend: apiParamsMainUser.dataToSend,
    });

  useEffect(() => {
    if (apiParamsMainUser.service) fetchDataMainUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsMainUser]);

  useEffect(() => {
    if (responseDataMainUser) {
      setMainUser(transformToFullUser(responseDataMainUser.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataMainUser]);

  /** Actualizar perfil */

  const [apiParamsForm, setApiParamsForm] = useState<
    useApiParams<UpdateProfileRequest | UpdateProfileSubUserRequest>
  >({
    service: null,
    method: "get",
    token,
  });

  const {
    loading: loadingForm,
    responseData: responseDataForm,
    error: errorForm,
    errorMsg: errorMsgForm,
    fetchData: fetchDataForm,
  } = useApi<UpdateProfileRequest | UpdateProfileSubUserRequest>(apiParamsForm);

  useEffect(() => {
    if (apiParamsForm.service) fetchDataForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsForm]);

  useEffect(() => {
    if (responseDataForm) {
      showNotification("success", t("updateProfileSuccess"));
    } else if (errorForm) {
      showNotification("error", errorMsgForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataForm, errorForm]);

  /** Acciones iniciales */

  useEffect(() => {
    setApiParams({
      service:
        entityType == EntityType.SUBUSER
          ? getSubUserService(uid)
          : getUserService(uid),
      method: "get",
    });
    if (entityType == EntityType.SUBUSER)
      setApiParamsMainUser({
        service: getUserService(mainUid),
        method: "get",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        address: user.address,
        name: user.name,
        location: user.cityID,
        phone: user.phone,
        email: user.email,
        document: user.document,
      });
      if (entityType == EntityType.COMPANY) {
        const comp = user as FullUser;
        form.setFieldsValue({
          tenure: comp.tenure,
          specialty: comp.specialty,
          aboutMe: comp.aboutMe,
        });
      }
    }
    if (user?.image) setImageSrc(user.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /** Funciones */

  function setFormData(responseData: any) {
    if (entityType == EntityType.SUBUSER) {
      setUser(transformToSubUserProfile(responseData[0]));
    } else {
      const user = transformToFullUser(responseData.data);
      dispatch(setUserImage(user.image));
      setUser(user);
    }
  }

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.input!.click();
    }
  }

  function changePasswordSuccess() {
    showNotification("success", t("passwordHasBeenUpdated"));
  }

  function changeImage(e: ChangeEvent<HTMLInputElement>) {
    form.setFieldValue("image", null);
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
        includeHeader: false,
      });
      setImageSrc(URL.createObjectURL(file));
    }
  }

  function saveMyProfile(values: any) {
    if (entityType == EntityType.SUBUSER) {
      const profile: UpdateProfileSubUserRequest = {
        uid,
        phone: values.phone.trim(),
        address: values.address.trim(),
        cityID: values.location,
      };
      setApiParamsForm({
        service: updateProfileSubUserService(),
        method: "post",
        dataToSend: profile,
      });
    } else {
      const data: UpdateProfileRequest = {
        uid,
        phone: values.phone.trim(),
        address: values.address.trim(),
        cityID: values.location,
      };
      if (entityType == EntityType.COMPANY) {
        data.age = values.tenure;
        data.specialtyID = values.specialty.trim();
        data.about_me = values.aboutMe.trim();
      }
      setApiParamsForm({
        service:
          entityType == EntityType.COMPANY
            ? updateProfileCompanyService()
            : updateProfileUserService(),
        method: "post",
        dataToSend: data,
      });
    }
  }

  function saveMyPassword(values: any) {
    if (values.password1 !== values.password2) {
      showNotification("error", t("passwordsMusMatch"));
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
          {entityType != EntityType.SUBUSER && (
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
          )}

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
                    {entityType == EntityType.SUBUSER
                      ? mainUser && categoryData[mainUser.categories[0]]?.value
                      : user &&
                        categoryData[(user as FullUser).categories[0]]?.value}
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
                    {entityType == EntityType.SUBUSER
                      ? mainUser && categoryData[mainUser.categories[1]]?.value
                      : user &&
                        categoryData[(user as FullUser).categories[1]]?.value}
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
                    {entityType == EntityType.SUBUSER
                      ? mainUser && categoryData[mainUser.categories[2]]?.value
                      : user &&
                        categoryData[(user as FullUser).categories[2]]?.value}
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
                {user?.numGoods ?? "-"}
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
                {user?.numServices ?? "-"}
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
                {user?.numSales ?? "-"}
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
                {user
                  ? Number.isNaN(
                      user?.numOffersGoods +
                        user?.numOffersServices +
                        user?.numOffersSales
                    )
                    ? "-"
                    : user?.numOffersGoods +
                      user?.numOffersServices +
                      user?.numOffersSales
                  : "-"}
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
                    loading={loadingForm}
                  >
                    {t("saveButton")}
                  </ButtonContainer>
                </div>
              </div>
            </Form>
          </div>
          {entityType != EntityType.SUBUSER && (
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
                  <PasswordField
                    fromMyPerfil
                    name="password2"
                    confirmPassword
                  />
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
          )}
        </div>
      </div>
    </>
  );
}
