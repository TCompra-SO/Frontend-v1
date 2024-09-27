import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useEmailRules } from "../../../../hooks/validators";

export default function EmailAU() {
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
      >
        <InputContainer type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
