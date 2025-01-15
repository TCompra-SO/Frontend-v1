import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { Form } from "antd";
import { usePasswordRules } from "../../../hooks/validatorHooks";
import { ReactNode } from "react";

interface PasswordFieldProps {
  name: string;
  confirmPassword?: boolean;
  onlyItem?: boolean;
  fromMyPerfil?: boolean;
}

export default function PasswordField(props: PasswordFieldProps) {
  const { t } = useTranslation();
  const { passwordRules } = usePasswordRules(false);
  const item: ReactNode = (
    <Form.Item
      name={props.name}
      label={t("password")}
      labelCol={{ span: 0 }}
      rules={passwordRules}
    >
      <InputContainer
        password={true}
        className="form-control"
        placeholder="•••••••••"
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "f-column" : "ad-user"}`}>
      <div className="titulo-input">
        {props.confirmPassword ? t("confirmPassword") : t("newPassword")}
      </div>
      {item}
    </div>
  );
}
