import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";

export default function FullNameAU() {
  const { t } = useTranslation();

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("fullName")}</div>
      <Form.Item
        label={t("fullName")}
        name="fullname"
        labelCol={{ span: 0 }}
        // rules={titleRules}
      >
        <InputContainer type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
