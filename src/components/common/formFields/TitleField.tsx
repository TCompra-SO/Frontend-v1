import { useTranslation } from "react-i18next";
import { useTitleRules } from "../../../hooks/validatorHooks";
import { Form } from "antd";
import InputContainer from "../../containers/InputContainer";

export default function TitleField() {
  const { t } = useTranslation();
  const { titleRules } = useTitleRules(true);

  return (
    <Form.Item
      label={t("title")}
      name="title"
      labelCol={{ span: 0 }}
      rules={titleRules}
    >
      <InputContainer className="form-control" placeholder={t("title")} />
    </Form.Item>
  );
}
