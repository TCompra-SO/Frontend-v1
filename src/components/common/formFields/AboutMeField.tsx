import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useAboutMeRules } from "../../../hooks/validatorHooks";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";

interface AboutMeFieldProps {
  edit?: boolean;
  value?: string;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function AboutMeField(props: AboutMeFieldProps) {
  const { t } = useTranslation();
  const { aboutMeRules } = useAboutMeRules(false);
  const item: ReactNode = (
    <Form.Item
      label={t("field")}
      labelCol={{ span: 0 }}
      name="aboutMe"
      rules={aboutMeRules}
    >
      <InputContainer className="form-control" placeholder={t("aboutMe")} />
    </Form.Item>
  );
  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("aboutMe")}</div>
      {item}
    </div>
  );
}
