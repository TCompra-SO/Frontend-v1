import { App, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  GetNameReniecRequest,
  LoginRequest,
  RegisterRequest,
  SendCodeRequest,
} from "../models/Requests";
import { useDispatch } from "react-redux";
import { setUid, setUser } from "../redux/userSlice";
import { DocType, ModalTypes, RegisterTypeId } from "../utilities/types";
import { useNavigate } from "react-router-dom";
import showNotification from "../utilities/notification/showNotification";
import { setIsLoading } from "../redux/loadingSlice";
import useApi from "../hooks/useApi";
import {
  loginService,
  registerService,
  sendCodeService,
} from "../services/authService";
import { useApiParams } from "../models/Interfaces";

import { useTranslation } from "react-i18next";
import { pageRoutes } from "../utilities/routes";
import { ListsContext } from "../contexts/ListsContext";
import {
  useDniRules,
  useEmailRules,
  usePasswordRules,
  useRucRules,
} from "../hooks/validators";
import InputContainer from "../components/containers/InputContainer";
import SelectContainer from "../components/containers/SelectContainer";
import ButtonContainer from "../components/containers/ButtonContainer";
import { getNameReniecService } from "../services/utilService";
import { equalServices } from "../utilities/globalFunctions";
import ModalContainer from "../components/containers/ModalContainer";
import ValidateCode from "../components/section/profile/ValidateCode";
import { AxiosError } from "axios";

const LoginType = {
  LOGIN: "login",
  REGISTER: "register",
};

interface LoginProps {
  onRegisterSuccess: (email: string, docType: string) => void;
}

export default function Login(props: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const context = useContext(ListsContext);
  const { tlds } = context;
  const { emailRules } = useEmailRules(true, tlds);
  const { passwordRules } = usePasswordRules(true);
  const { dniRules } = useDniRules(true);
  const { rucRules } = useRucRules(true);
  const [email, setEmail] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCodeModal, setIsOpenCodeModal] = useState(false);
  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  const [docType, setDocType] = useState(DocType.DNI);
  const [form] = Form.useForm();
  const [apiParams, setApiParams] = useState<
    useApiParams<
      RegisterRequest | LoginRequest | GetNameReniecRequest | SendCodeRequest
    >
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    RegisterRequest | LoginRequest | GetNameReniecRequest | SendCodeRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (responseData) {
      if (
        equalServices(apiParams.service, loginService()) ||
        equalServices(apiParams.service, registerService())
      )
        afterSubmit();
      else if (equalServices(apiParams.service, getNameReniecService(""))) {
        form.setFieldValue("name", responseData.data);
      } else if (equalServices(apiParams.service, sendCodeService())) {
        showNotification(notification, "success", t("sendCodeSuccess"));
        setIsOpenCodeModal(true);
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);

      if (equalServices(apiParams.service, sendCodeService())) {
        setEmail("");
      } else if (equalServices(apiParams.service, loginService())) {
        checkToOpenCreateProfileModal(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    dispatch(setIsLoading(loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  function checkToOpenCreateProfileModal(error: AxiosError<any, any>) {
    if (
      error.response?.status == 409 &&
      error.response?.data &&
      error.response?.data.uid &&
      error.response?.data.entity
    ) {
      dispatch(setUid(error.response?.data.uid));
      props.onRegisterSuccess(
        email,
        error.response?.data.entity == "User" ? DocType.DNI : DocType.RUC
      );
    }
  }

  function changeLabel(loginType: string) {
    return loginType == LoginType.LOGIN ? t("login") : t("register");
  }

  function resetFields() {
    form.resetFields();
  }

  function handleChangeTypeDoc(type: string) {
    form.setFieldsValue({ document: "" });
    setDocType(type);
  }

  async function getUserName() {
    form
      .validateFields(["document"])
      .then((value) => {
        setApiParams({
          service: getNameReniecService(value["document"]),
          method: "get",
        });
      })
      .catch(() => {});
  }

  function HandleSubmit(values: any) {
    // afterSubmit();
    // return;
    if (loginType == LoginType.LOGIN) {
      const data: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      console.log(data);
      setApiParams({
        service: loginService(),
        method: "post",
        dataToSend: data,
      });
    } else {
      const data: RegisterRequest = {
        email: values.email,
        password: values.password,
        typeID: RegisterTypeId.PRINC,
      };
      if (docType == DocType.DNI) data.dni = values.document;
      else data.ruc = values.document;
      console.log(data);
      setApiParams({
        service: registerService(),
        method: "post",
        dataToSend: data,
      });
    }
  }

  function afterSubmit() {
    if (loginType == LoginType.REGISTER) {
      dispatch(setUid(responseData.res.uid));
      showNotification(notification, "success", t("registerUserSuccess"));
      props.onRegisterSuccess(form.getFieldValue("email"), docType);
    } else {
      dispatch(setUser(responseData));
      showNotification(notification, "success", t("welcome"));
      localStorage.setItem("token", responseData.token);
      navigate(`/${pageRoutes.myRequirements}`);
    }
  }

  async function SendValidationCode(email: string) {
    handleCloseModal();
    setEmail(email);
    const data: SendCodeRequest = {
      email,
      type: "identity_verified",
    };
    setApiParams({
      service: sendCodeService(),
      method: "post",
      dataToSend: data,
    });
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleCloseCodeModal() {
    setIsOpenCodeModal(false);
  }

  return (
    <>
      <ModalContainer
        className=""
        title={t("inputYourEmail")}
        content={{
          type: ModalTypes.INPUT_EMAIL,
          data: {
            onAnswer: (email: string) => {
              SendValidationCode(email);
            },
          },
        }}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      />

      <ValidateCode
        isOpen={isOpenCodeModal}
        onClose={handleCloseCodeModal}
        email={email}
      />

      <div className="modal-login">
        <div className="login-box text-center">
          <img
            src="/src/assets/images/logo-black.svg"
            alt=""
            style={{ padding: "0 70px", marginBottom: "15px" }}
          />
          <p>{t("loginText")}</p>
          <div className="t-flex" style={{ gap: "10px", marginBottom: "15px" }}>
            <ButtonContainer
              common
              className="btn btn-border active"
              style={{ width: "50%" }}
              onClick={() => {
                setLoginType(LoginType.LOGIN);
                resetFields();
              }}
            >
              {t("login")}
            </ButtonContainer>
            <ButtonContainer
              common
              className="btn btn-border"
              style={{ width: "50%" }}
              onClick={() => {
                setLoginType(LoginType.REGISTER);
                resetFields();
              }}
            >
              {t("register")}
            </ButtonContainer>
          </div>

          <Form form={form} onFinish={HandleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {loginType == LoginType.REGISTER && (
                <>
                  <Form.Item>
                    <SelectContainer
                      className="form-control"
                      defaultValue={DocType.DNI}
                      onChange={handleChangeTypeDoc}
                      options={[
                        { label: DocType.DNI, value: DocType.DNI },
                        { label: DocType.RUC, value: DocType.RUC },
                      ]}
                    ></SelectContainer>
                  </Form.Item>

                  <div className="t-flex">
                    <Form.Item
                      name="document"
                      label={docType}
                      labelCol={{ span: 0 }}
                      style={{ width: "100%" }}
                      rules={docType == DocType.DNI ? dniRules : rucRules}
                    >
                      <InputContainer
                        type="text"
                        className="form-control"
                        style={{ flexGrow: 1 }}
                        placeholder={docType}
                        onBlur={getUserName}
                      />
                    </Form.Item>
                  </div>
                  <div className="t-flex">
                    <Form.Item name="name" style={{ width: "100%" }}>
                      <InputContainer
                        disabled
                        className="form-control"
                        placeholder={t("name")}
                        style={{ flexGrow: 1 }}
                      />
                    </Form.Item>
                  </div>
                </>
              )}
              <div className="t-flex">
                <Form.Item
                  name="email"
                  label={t("email")}
                  rules={emailRules}
                  labelCol={{ span: 0 }}
                  style={{ width: "100%" }}
                >
                  <InputContainer
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    style={{ flexGrow: 1 }}
                  />
                </Form.Item>
              </div>
              <div className="t-flex">
                <Form.Item
                  name="password"
                  label={t("password")}
                  labelCol={{ span: 0 }}
                  style={{ width: "100%" }}
                  rules={passwordRules}
                >
                  <InputContainer
                    password={true}
                    className="form-control"
                    placeholder="•••••••••"
                    style={{ flexGrow: 1 }}
                  />
                </Form.Item>
              </div>
              <a
                href="#"
                className="forgot-password text-right"
                style={{ width: "100%" }}
              >
                {t("forgotPassword")}
              </a>
              <a
                onClick={handleOpenModal}
                className="forgot-password text-right"
                style={{ width: "100%" }}
              >
                {t("sendValidationCodeLogin")}
              </a>
              <ButtonContainer common className="btn btn-default wd-100">
                {changeLabel(loginType)}
              </ButtonContainer>
            </div>
          </Form>
        </div>
        <div className="image-box"></div>
      </div>
    </>
  );
}
