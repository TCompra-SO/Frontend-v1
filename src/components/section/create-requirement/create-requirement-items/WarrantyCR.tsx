import { useTranslation } from "react-i18next";
import InputNumberContainer from "../../../containers/InputNumberContainer";
import { Form } from "antd";

interface WarrantyCRProps {
  required: boolean;
}

export default function WarrantyCR(props: WarrantyCRProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("warranty")}</div>
      <Form.Item
        label={t("warranty")}
        name="warranty"
        labelCol={{ span: 0 }}
        rules={[{ required: props.required }]}
      >
        <InputNumberContainer
          min={0}
          parser={(value) => parseInt(value || "0", 10)}
          className="form-control"
          placeholder={t("warranty")}
        />
      </Form.Item>
    </>
  );
}
