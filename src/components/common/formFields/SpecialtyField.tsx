import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useSpecialtyRules } from "../../../hooks/validatorHooks";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";

interface SpecialtyFieldProps {
  edit?: boolean;
  value?: string;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function SpecialtyField(props: SpecialtyFieldProps) {
  const { t } = useTranslation();
  const { specialtyRules } = useSpecialtyRules(true);
  const item: ReactNode = (
    <Form.Item
      label={t("specialty")}
      labelCol={{ span: 0 }}
      name="specialty"
      rules={specialtyRules}
    >
      <InputContainer className="form-control" placeholder={t("specialty")} />
    </Form.Item>
  );
  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("specialty")}</div>
      {item}
    </div>
  );
}
