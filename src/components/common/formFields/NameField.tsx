import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";

interface NameFieldProps {
  edit?: boolean;
  value?: string;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function NameField(props: NameFieldProps) {
  const { t } = useTranslation();
  const item: ReactNode = (
    <Form.Item
      label={t("name")}
      name="name"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
      initialValue={props.value}
    >
      <InputContainer
        disabled={props.edit}
        type="text"
        className="form-control"
        placeholder={t("name")}
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("name")}</div>
      {item}
    </div>
  );
}
