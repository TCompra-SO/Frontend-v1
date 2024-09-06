import {
  CheckCircleOutlined,
  SendOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { App, Divider, Flex, Form, Modal, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import { SendCodeRequest, ValidateCodeRequest } from "../../../models/Requests";
import showNotification from "../../../utilities/notification/showNotification";
import { StepsItemContent, useApiParams } from "../../../models/Interfaces";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import useApi from "../../../hooks/useApi";
import {
  sendCodeService,
  validateCodeService,
} from "../../../services/authService";
import OTPInputContainer from "../../containers/OTPInputContainer";
import { equalServices } from "../../../utilities/globalFunctions";

interface ValidateCodeProps {
  isOpen: boolean;
  onClose: (validationSuccess: boolean) => void;
  email: string;
}

const stepsIni: StepsItemContent[] = [
  {
    key: "sent",
    title: "Envío",
    status: "finish",
    icon: <SendOutlined />,
    text: "Se ha enviado un código de verificación a ",
    showInput: false,
  },
  {
    key: "val",
    title: "Validación",
    status: "wait",
    icon: <SolutionOutlined />,
    text: "Ingrese el código de verificación:",
    showInput: true,
  },
  {
    key: "done",
    title: "Fin",
    status: "wait",
    icon: <CheckCircleOutlined />,
    text: "Su cuenta ha sido validada",
    showInput: false,
  },
];

const steps: StepsProps["items"] = stepsIni.map((item) => ({
  key: item.key,
  title: item.title,
  icon: item.icon,
  status: item.status,
}));

const expireInSeconds = 60;
const timeoutToValidate = 5;

export default function ValidateCode({
  isOpen,
  onClose,
  email,
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
    useApiParams<SendCodeRequest | ValidateCodeRequest>
  >({
    service: null,
    method: "get",
  });
  const { responseData, error, errorMsg, fetchData } = useApi<
    ValidateCodeRequest | SendCodeRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });
  let intervalId: number = 0;
  let intervalIdValidate: number = 0;

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
      if (equalServices(apiParams.service, sendCodeService())) {
        beginTimer();
        showNotification(notification, "success", t("sentValidationCode"));
      } else if (equalServices(apiParams.service, validateCodeService())) {
        setValidationSuccess(true);
        next();
        form.resetFields();
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
      if (equalServices(apiParams.service, validateCodeService())) {
        setValidationSuccess(false);
        form.resetFields();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function next() {
    setCurrent((current) => {
      const next: number = current + 1;
      steps![next].status = "finish";
      return next;
    });
  }

  function handleClose() {
    onClose(validationSuccess);
  }

  function ValidateCode() {
    const code = form.getFieldValue("code");
    console.log(code);
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

  function beginTimer() {
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
    <Modal
      centered
      open={isOpen}
      closable={false}
      footer={[
        <ButtonContainer
          key="back"
          onClick={handleClose}
          children={t("cancelButton")}
        />,
        <ButtonContainer
          key="submit"
          type="primary"
          onClick={
            stepsIni[current].key == "val"
              ? ValidateCode
              : stepsIni[current].key == "done"
              ? handleClose
              : next
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
        />,
      ]}
    >
      <Flex gap="middle" align="center" justify="space-around" vertical>
        <Steps current={current} items={steps} />
        <Divider style={{ margin: "0" }} />
        <div style={{ padding: "12px" }}>
          {stepsIni[current].key == "sent"
            ? stepsIni[current].text + email
            : stepsIni[current].text}
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
                ? `${t("timerResendValidationCode")}(${timer}) ${t("seconds")}`
                : t("resendValidationCode")}
            </a>
          </>
        )}
      </Flex>
    </Modal>
  );
}
