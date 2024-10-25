import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { usePhoneRules } from "../../../hooks/validators";
import { phoneCode } from "../../../utilities/globals";
import { ReactNode } from "react";

interface PhoneFieldProps {
  edit?: boolean;
  value?: string;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function PhoneField(props: PhoneFieldProps) {
  const { t } = useTranslation();
  const { phoneRules } = usePhoneRules(true);
  const item: ReactNode = (
    <Space.Compact style={{ width: "100%" }}>
      <InputContainer
        style={{ width: "65px", height: "39.19px" }}
        readOnly={true}
        defaultValue={phoneCode}
        className="form-control"
      />
      <Form.Item
        label={t("phone")}
        name="phone"
        labelCol={{ span: 0 }}
        rules={phoneRules}
        initialValue={props.value}
        style={{ width: "100%" }}
      >
        <InputContainer className="form-control" placeholder={t("phone")} />
      </Form.Item>
    </Space.Compact>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("phone")}</div>

      {item}
    </div>
  );
}
