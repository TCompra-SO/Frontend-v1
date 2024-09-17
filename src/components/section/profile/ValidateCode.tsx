import {
  CheckCircleOutlined,
  EditOutlined,
  SendOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { App, Divider, Flex, Form, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import {
  RecoverPasswordRequest,
  SendCodeRecoveryRequest,
  SendCodeRequest,
  ValidateCodeRequest,
} from "../../../models/Requests";
import showNotification from "../../../utilities/notification/showNotification";
import { StepsItemContent, useApiParams } from "../../../models/Interfaces";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import useApi from "../../../hooks/useApi";
import {
  recoverPasswordService,
  sendCodeRecoveryService,
  sendCodeService,
  validateCodeService,
} from "../../../services/authService";
import OTPInputContainer from "../../containers/OTPInputContainer";
import { equalServices } from "../../../utilities/globalFunctions";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { commonModalWidth, mediumModalWidth } from "../../../utilities/globals";

const stepsIni: StepsItemContent[] = [
  {
    key: "sent",
    title: "sending",
    status: "wait",
    icon: <SendOutlined />,
    text: "willSendVerificationCode",
    showInput: false,
  },
  {
    key: "val",
    title: "validation",
    status: "wait",
    icon: <SolutionOutlined />,
    text: "inputVerificationCode",
    showInput: true,
  },
  {
    key: "done",
    title: "end",
    status: "wait",
    icon: <CheckCircleOutlined />,
    text: "accountHasBeenValidated",
    showInput: false,
  },
];

const stepsForgotPass: StepsItemContent[] = [
  stepsIni[0],
  stepsIni[1],
  {
    key: "val",
    title: "password",
    status: "wait",
    icon: <EditOutlined />,
    text: "inputNewPassword",
    showInput: true,
  },
  {
    key: "done",
    title: "end",
    status: "wait",
    icon: <CheckCircleOutlined />,
    text: "passwordHasBeenUpdated",
    showInput: false,
  },
];

const expireInSeconds = 60;
const timeoutToValidate = 5;

interface ValidateCodeProps {
  isOpen: boolean;
  onClose: (validationSuccess: boolean) => void;
  email: string;
  isForgotPassword: boolean;
}

export default function ValidateCode({
  isOpen,
  onClose,
  email,
  isForgotPassword,
}: ValidateCodeProps) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [timer, setTimer] = useState(expireInSeconds);
  const [timerToValidate, setTimerToValidate] = useState(timeoutToValidate);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [apiParams, setApiParams] = useState<
    useApiParams<
      | SendCodeRequest
      | ValidateCodeRequest
      | SendCodeRecoveryRequest
      | RecoverPasswordRequest
    >
  >({
    service: null,
    method: "get",
  });
  const { responseData, error, errorMsg, fetchData, loading } = useApi<
    | ValidateCodeRequest
    | SendCodeRequest
    | SendCodeRecoveryRequest
    | RecoverPasswordRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });
  let intervalId: any = 0;
  let intervalIdValidate: any = 0;
  let steps: StepsProps["items"] = [];

  steps = (isForgotPassword ? stepsForgotPass : stepsIni).map((item) => ({
    key: item.key,
    title: t(item.title),
    icon: item.icon,
  }));

  useEffect(() => {
    if (isOpen) {
      setCurrent(0);
      clearInterval(intervalId);
      clearInterval(intervalIdValidate);
      setTimer(expireInSeconds);
      setTimerToValidate(timeoutToValidate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (
        equalServices(apiParams.service, sendCodeService()) ||
        equalServices(apiParams.service, sendCodeRecoveryService())
      ) {
        beginTimer();
        showNotification(notification, "success", t("sentValidationCode"));
        if (current == 0) next();
      } else if (
        equalServices(apiParams.service, validateCodeService()) ||
        equalServices(apiParams.service, recoverPasswordService())
      ) {
        setValidationSuccess(true);
        next();
        form.resetFields();
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
      if (
        equalServices(apiParams.service, validateCodeService()) ||
        equalServices(apiParams.service, recoverPasswordService())
      ) {
        setValidationSuccess(false);
        form.resetFields();
      } else if (
        equalServices(apiParams.service, sendCodeService()) ||
        equalServices(apiParams.service, sendCodeRecoveryService())
      ) {
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function next() {
    setCurrent((current) => {
      const next: number = current + 1;

      return next;
    });
  }

  function handleClose() {
    onClose(validationSuccess);
  }

  function ValidateCode() {
    const code = form.getFieldValue("code");
    if (!code) return;
    beginTimerToValidate();

    const data: ValidateCodeRequest = {
      email: email,
      type: "identity_verified",
      code: code,
    };
    setApiParams({
      service: validateCodeService(),
      method: "post",
      dataToSend: data,
    });
  }

  function ResendCode() {
    setWaiting(true);
    if (isForgotPassword) {
      const data: SendCodeRecoveryRequest = {
        email: email,
      };
      setApiParams({
        service: sendCodeRecoveryService(),
        method: "post",
        dataToSend: data,
      });
    } else {
      const data: SendCodeRequest = {
        email: email,
        type: "identity_verified",
      };
      setApiParams({
        service: sendCodeService(),
        method: "post",
        dataToSend: data,
      });
    }
  }

  function beginTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer - 1 === 0) {
          clearInterval(intervalId);
          setTimer(expireInSeconds);
          setWaiting(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  }

  function beginTimerToValidate() {
    intervalIdValidate = setInterval(() => {
      setTimerToValidate((prevTimer) => {
        if (Number((prevTimer - 0.1).toFixed(1)) === 0) {
          clearInterval(intervalIdValidate);
          setTimerToValidate(timeoutToValidate);
        }
        return Number((prevTimer - 0.1).toFixed(1));
      });
    }, 100);
  }

  return (
    <NoContentModalContainer
      centered
      open={isOpen}
      closable={false}
      showFooter={false}
      width={isForgotPassword ? commonModalWidth : mediumModalWidth}
    >
      <div className="modal-card">
        <Flex gap="middle" align="center" justify="space-around" vertical>
          <Steps items={steps} current={current} />
          <Divider style={{ margin: "0" }} />
          <div style={{ padding: "12px" }}>
            {stepsIni[current].key == "sent"
              ? t(stepsIni[current].text) + email
              : t(stepsIni[current].text)}
          </div>

          {stepsIni[current].showInput && (
            <>
              <Form form={form}>
                <Form.Item name="code">
                  <OTPInputContainer length={6} />
                </Form.Item>
              </Form>

              <a
                style={{
                  float: "right",
                  marginBottom: "24px",
                  pointerEvents: waiting ? "none" : "all",
                  cursor: waiting ? "not-allowed" : "",
                }}
                onClick={ResendCode}
              >
                {waiting
                  ? `${t("timerResendValidationCode")}(${timer}) ${t(
                      "seconds"
                    )}`
                  : t("resendValidationCode")}
              </a>
            </>
          )}

          <div className="t-flex wd-100">
            <ButtonContainer
              key="back"
              className="btn btn-default"
              onClick={handleClose}
              children={t("cancelButton")}
              style={{ flex: 1, marginRight: "5px" }}
            />
            <ButtonContainer
              key="submit"
              loading={loading}
              className="btn btn-default"
              style={{ flex: 1, marginLeft: "5px" }}
              onClick={
                stepsIni[current].key == "val"
                  ? ValidateCode
                  : stepsIni[current].key == "done"
                  ? handleClose
                  : ResendCode
              }
              disabled={
                stepsIni[current].key != "val"
                  ? false
                  : timerToValidate != timeoutToValidate
              }
              children={
                stepsIni[current].key == "val"
                  ? `${t("validate")}${
                      timerToValidate != timeoutToValidate
                        ? ` (${timerToValidate.toFixed(0)})`
                        : ""
                    }`
                  : stepsIni[current].key == "done"
                  ? t("acceptButton")
                  : t("next")
              }
            />
          </div>
        </Flex>
      </div>
    </NoContentModalContainer>
  );
}
