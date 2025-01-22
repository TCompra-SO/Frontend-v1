import { useTranslation } from "react-i18next";
import { useDescriptionCRRules } from "../../../hooks/validatorHooks";
import { Form } from "antd";
import TextAreaContainer from "../../containers/TextAreaContainer";

export default function DescriptionCRField() {
  const { t } = useTranslation();
  const { descriptionCRRules } = useDescriptionCRRules(true);

  return (
    <Form.Item
      label={t("description")}
      name="description"
      labelCol={{ span: 0 }}
      rules={descriptionCRRules}
    >
      <TextAreaContainer className="form-control" />
    </Form.Item>
  );
}
