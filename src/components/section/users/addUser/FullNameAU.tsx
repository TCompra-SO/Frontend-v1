import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useState } from "react";

interface FullNameAUProps {
  edit?: boolean;
  value?: string;
}

export default function FullNameAU(props: FullNameAUProps) {
  const { t } = useTranslation();
  const [value] = useState(props.value);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("fullname")}</div>
      <Form.Item
        label={t("fullname")}
        name="fullname"
        labelCol={{ span: 0 }}
        rules={[{ required: true, message: t("clickOnSearchIcon") }]}
        initialValue={value}
      >
        <InputContainer disabled type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
