import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../../containers/TextAreaContainer";
import { Form } from "antd";

export default function DescriptionCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("description")}</div>

      <Form.Item
        label={t("description")}
        name="description"
        labelCol={{ span: 0 }}
      >
        <TextAreaContainer className="form-control" />
      </Form.Item>
    </>
  );
}
