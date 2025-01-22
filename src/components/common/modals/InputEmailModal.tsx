import { Flex, Form } from "antd";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";
import { useEmailRules } from "../../../hooks/validatorHooks";

interface InputEmailModalProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
  buttonText?: ReactNode;
  onAnswer: (email: string) => any;
  onClose: () => any;
}

export default function InputEmailModal(props: InputEmailModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { emailRules } = useEmailRules(true);

  function handleSubmit(values: any) {
    props.onAnswer(values.email);
  }

  return (
    <>
      <div className="modal-card">
        {props.title && (
          <div className="t-flex t-wrap mr-sub">
            <div className="sub-titulo" style={{ fontSize: "26px" }}>
              <i
                className="fa-regular fa-envelope sub-icon"
                style={{ fontSize: "24px" }}
              ></i>{" "}
              {props.title}
            </div>
          </div>
        )}

        <Flex vertical>
          {props.text}
          <Form form={form} onFinish={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
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

              <ButtonContainer
                htmlType="submit"
                className="btn btn-default wd-100"
                children={props.buttonText ?? t("acceptButton")}
              />
            </div>
          </Form>
        </Flex>
      </div>
    </>
  );
}
