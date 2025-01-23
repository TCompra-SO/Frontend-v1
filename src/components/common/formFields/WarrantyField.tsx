import { useTranslation } from "react-i18next";
import { Form } from "antd";
import InputNumberContainer from "../../containers/InputNumberContainer";

interface WarrantyFieldProps {
  required: boolean;
  onChange?: (val: any) => void;
}

export default function WarrantyField(props: WarrantyFieldProps) {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("warranty")}
      name="warranty"
      labelCol={{ span: 0 }}
      rules={[{ required: props.required }]}
    >
      <InputNumberContainer
        min={1}
        parser={(value) => (value ? parseInt(value || "0", 10) : "")}
        className="form-control"
        placeholder={t("warranty")}
        onChange={(val) => props.onChange?.(val)}
        max={999}
      />
    </Form.Item>
  );
}
