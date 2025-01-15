import { useTranslation } from "react-i18next";
import { useOfferDescriptionRules } from "../../../hooks/validatorHooks";
import { Form } from "antd";
import InputContainer from "../../containers/InputContainer";

export default function OfferDescriptionField() {
  const { t } = useTranslation();
  const { offerDescriptionRules } = useOfferDescriptionRules(false);

  return (
    <Form.Item
      label={t("description")}
      name="description"
      labelCol={{ span: 0 }}
      rules={offerDescriptionRules}
    >
      <InputContainer className="form-control" placeholder={t("description")} />
    </Form.Item>
  );
}
