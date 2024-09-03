import { LoginFormPage } from "@ant-design/pro-components";
import backgroundImage from "../assets/images/silder-tc-04.jpg";
import logo from "../assets/images/logo_vertical.svg";
import video from "../assets/videos/video-login.webm";
import { App, Form, Tabs } from "antd";
import Email from "../components/section/login/Email";
import Password from "../components/section/login/Password";
import { useContext, useEffect, useState } from "react";
import Dni from "../components/section/login/Dni";
import { TabsProps } from "antd/lib";
import { LoginRequest, RegisterRequest } from "../models/Requests";
import { useDispatch } from "react-redux";
import { setUser, setUid } from "../redux/userSlice";
import { DocType } from "../utilities/types";
import { useNavigate } from "react-router-dom";
import showNotification from "../utilities/notification/showNotification";
import { setIsLoading } from "../redux/loadingSlice";
import { linkColor } from "../utilities/colors";
import useApi from "../hooks/useApi";
import { loginService, registerService } from "../services/authService";
import { useApiParams } from "../models/Interfaces";

import { useTranslation } from "react-i18next";
import { pageRoutes } from "../utilities/routes";
import { ListsContext } from "../contexts/ListsContext";

const LoginType = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function Login2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const context = useContext(ListsContext);
  const { tlds } = context;
  const [loginType, setLoginType] = useState(LoginType.LOGIN);
  const [docType, setDocType] = useState(DocType.DNI);
  const [form] = Form.useForm();
  const [apiParams, setApiParams] = useState<
    useApiParams<RegisterRequest | LoginRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    RegisterRequest | LoginRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  const tabItems: TabsProps["items"] = [
    {
      key: LoginType.LOGIN,
      label: t("login"),
    },
    {
      key: LoginType.REGISTER,
      label: t("register"),
    },
  ];

  useEffect(() => {
    if (responseData) {
      if (
        apiParams.service == loginService ||
        apiParams.service == registerService
      )
        afterSubmit();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
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

  function HandleSubmit(values: any) {
    if (loginType == LoginType.LOGIN) {
      const data: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      setApiParams({
        service: loginService,
        method: "post",
        dataToSend: data,
      });
    } else {
      const data: RegisterRequest = {
        email: values.email,
        password: values.password,
        profileType: "Premium",
        userType: "admin",
      };
      if (docType == DocType.DNI) data.dni = values.document;
      else data.ruc = values.document;
      setApiParams({
        service: registerService,
        method: "post",
        dataToSend: data,
      });
    }
  }

  function afterSubmit() {
    if (loginType == LoginType.REGISTER) {
      dispatch(setUid(responseData));
      showNotification(notification, "success", t("registerUserSuccess"));
      navigate(`/${pageRoutes.profile}`, {
        state: { email: form.getFieldValue("email"), type: docType },
      });
    } else {
      dispatch(setUser(responseData));
      showNotification(notification, "success", t("welcome"));
      localStorage.setItem("token", responseData.token);
      navigate(`/${pageRoutes.myRequirements}`);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <LoginFormPage
          form={form}
          onFinish={HandleSubmit}
          backgroundImageUrl={backgroundImage}
          backgroundVideoUrl={video}
          logo={logo}
          title="TCompra"
          subTitle="Tu mejor proveedor"
          containerStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
          }}
          submitter={{
            searchConfig: {
              submitText: changeLabel(loginType),
              resetText: changeLabel(loginType),
            },
            submitButtonProps: {
              style: {
                width: "100%",
              },
            },
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(pressedKey) => {
              setLoginType(pressedKey);
              resetFields();
            }}
            items={tabItems}
          />
          {loginType == LoginType.LOGIN && (
            <>
              <Email tlds={tlds}></Email>
              <Password></Password>
              <a
                style={{
                  float: "right",
                  marginBottom: "24px",
                  fontWeight: "bold",
                  color: linkColor,
                }}
              >
                {t("forgotPassword")}
              </a>
            </>
          )}
          {loginType == LoginType.REGISTER && (
            <>
              <Dni onChangeTypeDoc={handleChangeTypeDoc}></Dni>
              <Email tlds={tlds}></Email>
              <Password></Password>
            </>
          )}
        </LoginFormPage>
      </div>
    </>
  );
}
