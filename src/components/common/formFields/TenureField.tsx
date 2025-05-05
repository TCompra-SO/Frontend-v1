import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import InputNumberContainer from "../../containers/InputNumberContainer";
import { useTenureRules } from "../../../hooks/validatorHooks";

interface TenureFieldProps {
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function TenureField(props: TenureFieldProps) {
  const { t } = useTranslation();
  const { tenureRules } = useTenureRules(true);
  const item: ReactNode = (
    <Form.Item
      name="tenure"
      label={t("tenure")}
      labelCol={{ span: 0 }}
      rules={tenureRules}
    >
      <InputNumberContainer
        min={0}
        parser={(value) => parseInt(value || "0", 10)}
        className="form-control"
        placeholder={t("tenure") + ` (${t("years")})`}
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">
        {t("tenure")} ({t("years").toLowerCase()})
      </div>
      {item}
    </div>
  );
}
