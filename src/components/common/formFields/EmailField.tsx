import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { useEmailRules } from "../../../hooks/validators";
import { ReactNode } from "react";

interface EmailFieldProps {
  edit?: boolean;
  value?: string;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function EmailField(props: EmailFieldProps) {
  const { t } = useTranslation();
  const { emailRules } = useEmailRules(true);
  const item: ReactNode = (
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
        placeholder={t("email")}
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("email")}</div>
      {item}
    </div>
  );
}
