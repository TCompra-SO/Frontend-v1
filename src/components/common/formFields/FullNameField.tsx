import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { ReactNode, useState } from "react";

interface FullNameFieldProps {
  edit?: boolean;
  value?: string;
  onlyItem?: boolean;
}

export default function FullNameField(props: FullNameFieldProps) {
  const { t } = useTranslation();
  const [value] = useState(props.value);
  const item: ReactNode = (
    <Form.Item
      label={t("fullname")}
      name="fullname"
      labelCol={{ span: 0 }}
      rules={[{ required: true, message: t("clickOnSearchIcon") }]}
      initialValue={value}
    >
      <InputContainer
        disabled
        type="text"
        className="form-control"
        placeholder={t("name")}
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("fullname")}</div>
      {item}
    </div>
  );
}
