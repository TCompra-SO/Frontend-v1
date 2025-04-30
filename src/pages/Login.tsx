import { Checkbox, Form } from "antd";
import { useEffect, useState } from "react";
import {
  GetNameReniecRequest,
  LoginRequest,
  RegisterRequest,
} from "../models/Requests";
import { useDispatch } from "react-redux";
import { setUid, setEmail, setUserName } from "../redux/userSlice";
import {
  Action,
  DocType,
  ModalTypes,
  RegisterTypeId,
} from "../utilities/types";
import useApi from "../hooks/useApi";
import {
  loginService,
  registerService,
} from "../services/requests/authService";
import { useApiParams } from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import {
  useDniRules,
  useEmailRules,
  usePasswordRules,
  useRucRules,
} from "../hooks/validatorHooks";
import InputContainer from "../components/containers/InputContainer";
import SelectContainer from "../components/containers/SelectContainer";
import ButtonContainer from "../components/containers/ButtonContainer";
import { getNameReniecService } from "../services/requests/utilService";
import { equalServices } from "../utilities/globalFunctions";
import ModalContainer from "../components/containers/ModalContainer";
import { AxiosError } from "axios";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useLogin, useRegister } from "../hooks/authHooks";
import useShowNotification from "../hooks/utilHooks";
import TermsAndConditionsModal from "../components/common/modals/TermsAndConditionsModal";
import { browserIdKey } from "../utilities/globals";

const LoginType = {
  LOGIN: "login",
  REGISTER: "register",
};

interface LoginProps {
  onRegisterSuccess: (docType: string) => void;
  changeIsFromForgotPassword: (type: boolean) => void;
  openValidateCodeModal: () => void;
  closeLoginModal: () => void;
}

export default function Login(props: LoginProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const login = useLogin();
  const register = useRegister();
  const { emailRules } = useEmailRules(true);
  const { passwordRules } = usePasswordRules(true);
  const { dniRules } = useDniRules(true);
  const { rucRules } = useRucRules(true);
  const [checkedTermsConditions, setCheckedTermsConditions] = useState(false);
  const [validDoc, setValidDoc] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalTerms, setIsOpenModalTerms] = useState(false);
  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  const [docType, setDocType] = useState(DocType.DNI);
  const [form] = Form.useForm();
  const [apiParams, setApiParams] = useState<
    useApiParams<RegisterRequest | LoginRequest | GetNameReniecRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    RegisterRequest | LoginRequest | GetNameReniecRequest
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
        setValidDoc(true);
      }
    } else if (error) {
      showNotification("error", errorMsg);

      if (equalServices(apiParams.service, getNameReniecService(""))) {
        setValidDoc(false);
      }

      if (equalServices(apiParams.service, loginService())) {
        checkToOpenCreateProfileModal(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

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
      if (error.response?.data.name)
        dispatch(setUserName(error.response?.data.name));
      else dispatch(setUserName(""));
      dispatch(setEmail(form.getFieldValue("email")));
      props.onRegisterSuccess(
        error.response?.data.entity == "User" ? DocType.DNI : DocType.RUC
      );
      props.changeIsFromForgotPassword(false);
    }
  }

  function changeLabel(loginType: string) {
    return loginType == LoginType.LOGIN ? t("login") : t("register");
  }

  function resetFields(fields?: string[]) {
    if (fields) form.resetFields(fields);
    else form.resetFields();
  }

  function handleChangeTypeDoc(type: string) {
    form.resetFields(["document", "name"]);
    setDocType(type);
  }

  function getUserName() {
    form
      .validateFields(["document"])
      .then((value) => {
        setApiParams({
          service: getNameReniecService(value["document"].trim()),
          method: "get",
        });
      })
      .catch(() => {});
  }

  function HandleSubmit(values: any) {
    if (loginType == LoginType.LOGIN) {
      let browserId = localStorage.getItem(browserIdKey);
      if (!browserId) {
        browserId = crypto.randomUUID();
        localStorage.setItem(browserIdKey, browserId);
      }
      const data: LoginRequest = {
        email: values.email,
        password: values.password,
        browserId,
      };
      setApiParams({
        service: loginService(),
        method: "post",
        dataToSend: data,
      });
    } else {
      if (!validDoc) {
        showNotification("error", t("mustProvideValidDoc"));
        return;
      }

      if (!checkedTermsConditions) {
        showNotification("error", t("mustAgreeToTermsAndConditions"));
        return;
      }

      const data: RegisterRequest = {
        email: values.email,
        password: values.password,
        typeID: RegisterTypeId.PRINC,
      };
      if (docType == DocType.DNI) data.dni = values.document.trim();
      else data.ruc = values.document.trim();

      setApiParams({
        service: registerService(),
        method: "post",
        dataToSend: data,
      });
    }
  }

  async function afterSubmit() {
    if (loginType == LoginType.REGISTER) {
      register(responseData, form.getFieldValue("email"));
      props.onRegisterSuccess(docType);
    } else {
      login(responseData);
      props.closeLoginModal();
    }
  }

  async function SendValidationCode(email: string) {
    handleCloseModal();
    dispatch(setEmail(email));
    props.closeLoginModal();
    props.openValidateCodeModal();
  }

  function handleOpenModal(fromForgotPassword: boolean) {
    props.changeIsFromForgotPassword(fromForgotPassword);
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function onChangeAgreeToTermsAndConditions(e: CheckboxChangeEvent) {
    setCheckedTermsConditions(e.target.checked);
  }

  return (
    <>
      <ModalContainer
        content={{
          type: ModalTypes.INPUT_EMAIL,
          data: {
            onAnswer: (email: string) => {
              SendValidationCode(email);
            },
            buttonText: t("acceptButton"),
          },
          title: t("inputYourEmail"),
          action: Action.NONE,
        }}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      />

      <TermsAndConditionsModal
        isOpen={isOpenModalTerms}
        onClose={() => setIsOpenModalTerms(false)}
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
              className={`btn btn-border ${
                loginType == LoginType.LOGIN ? "active" : ""
              }`}
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
              className={`btn btn-border ${
                loginType == LoginType.REGISTER ? "active" : ""
              }`}
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
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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

                  <div className="t-flex" style={{ alignItems: "center" }}>
                    <Form.Item
                      name="document"
                      label={docType}
                      labelCol={{ span: 0 }}
                      style={{ width: "100%" }}
                      rules={docType == DocType.DNI ? dniRules : rucRules}
                    >
                      <div className="t-flex" style={{ alignItems: "center" }}>
                        <InputContainer
                          type="text"
                          className="form-control"
                          style={{ flexGrow: 1 }}
                          placeholder={docType}
                          onChange={() => resetFields(["name"])}
                        />
                        <i
                          className="fas fa-search"
                          style={{
                            marginLeft: "7px",
                            cursor: "pointer",
                            background: "#ffe9f7",
                            color: "#bc1373",
                            padding: "13px",
                            borderRadius: "0.6rem",
                          }}
                          onClick={getUserName}
                        ></i>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="t-flex">
                    <Form.Item
                      name="name"
                      style={{ width: "100%" }}
                      label={t("name")}
                      labelCol={{ span: 0 }}
                      rules={[
                        { required: true, message: t("clickOnSearchIcon") },
                      ]}
                    >
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
                    id="email-login"
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
              <div>
                {loginType == LoginType.LOGIN && (
                  <>
                    <a
                      onClick={() => handleOpenModal(true)}
                      className="forgot-password text-right"
                      style={{ width: "100%" }}
                    >
                      {t("forgotPassword")}
                    </a>
                    <a
                      onClick={() => handleOpenModal(false)}
                      className="forgot-password text-right"
                      style={{ width: "100%" }}
                    >
                      {t("sendValidationCodeLogin")}
                    </a>
                  </>
                )}
                {loginType == LoginType.REGISTER && (
                  <Checkbox
                    onChange={onChangeAgreeToTermsAndConditions}
                    style={{}}
                  >
                    <a
                      onClick={() => setIsOpenModalTerms(true)}
                      className="forgot-password text-left"
                      style={{ width: "100%" }}
                    >
                      {t("agreeToTermsAndConditions")}
                    </a>
                  </Checkbox>
                )}
              </div>
              <ButtonContainer
                htmlType="submit"
                loading={loading}
                className="btn btn-default wd-100"
              >
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
