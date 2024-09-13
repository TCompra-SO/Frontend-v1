import { Flex, Form } from "antd";
import ButtonContainer from "../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import InputContainer from "../containers/InputContainer";
import { useContext } from "react";
import { useEmailRules } from "../../hooks/validators";
import { ListsContext } from "../../contexts/listsContext";

interface InputEmailModalProps {
  text?: React.ReactNode;
  onAnswer: (email: string) => any;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function InputEmailModal(props: InputEmailModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const context = useContext(ListsContext);
  const { tlds } = context;
  const { emailRules } = useEmailRules(true, tlds);

  function handleSubmit(values: any) {
    console.log("qqqqqqq");
    props.onAnswer(values.email);
  }

  return (
    <Flex vertical>
      {props.text}
      <Form form={form} onFinish={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
            type="primary"
            children={t("sendValidationCode")}
          />
        </div>
      </Form>
    </Flex>
  );
}
