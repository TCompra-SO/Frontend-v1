import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useEmailRules } from "../../../../hooks/validators";

interface EmailAUProps {
  edit?: boolean;
  value?: string;
}

export default function EmailAU(props: EmailAUProps) {
  const { t } = useTranslation();
  const { emailRules } = useEmailRules(true);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("email")}</div>
      <Form.Item
        label={t("email")}
        name="email"
        labelCol={{ span: 0 }}
        rules={emailRules}
        initialValue={props.value}
      >
        <InputContainer
          type="text"
          className="form-control"
          disabled={props.edit}
        />
      </Form.Item>
    </div>
  );
}
