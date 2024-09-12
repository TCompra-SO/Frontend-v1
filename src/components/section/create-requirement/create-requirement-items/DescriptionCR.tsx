import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../../containers/TextAreaContainer";
import { Form } from "antd";
import { useDescriptionCRRules } from "../../../../hooks/validators";

export default function DescriptionCR() {
  const { t } = useTranslation();
  const { descriptionCRRules } = useDescriptionCRRules(true);

  return (
    <>
      <div className="titulo-input">{t("description")}</div>

      <Form.Item
        label={t("description")}
        name="description"
        labelCol={{ span: 0 }}
        rules={descriptionCRRules}
      >
        <TextAreaContainer className="form-control" />
      </Form.Item>
    </>
  );
}
