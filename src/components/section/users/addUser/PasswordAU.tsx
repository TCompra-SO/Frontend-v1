import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { Form } from "antd";
import { usePasswordRules } from "../../../../hooks/validators";

interface PasswordAUProps {
  name: string;
  confirmPassword?: boolean;
}

export default function PasswordAU(props: PasswordAUProps) {
  const { t } = useTranslation();
  const { passwordRules } = usePasswordRules(true);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">
        {props.confirmPassword ? t("confirmPassword") : t("newPassword")}
      </div>
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
    </div>
  );
}
