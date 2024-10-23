import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import InputNumberContainer from "../../containers/InputNumberContainer";

export default function SupportField() {
  const { t } = useTranslation();
  const item: ReactNode = (
    <Form.Item
      name="support"
      label={t("support")}
      labelCol={{ span: 0 }}
      rules={[{ required: false }]}
    >
      <InputNumberContainer
        min={0}
        parser={(value) => parseInt(value || "0", 10)}
        className="form-control"
        placeholder={t("support") + ` (${t("months").toLowerCase()})`}
      />
    </Form.Item>
  );

  return item;
}
