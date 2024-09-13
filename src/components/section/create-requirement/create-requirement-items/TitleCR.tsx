import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { Form } from "antd";
import { useTitleRules } from "../../../../hooks/validators";

export default function TitleCR() {
  const { t } = useTranslation();
  const { titleRules } = useTitleRules(true);

  return (
    <>
      <div className="titulo-input">{t("title")}</div>
      <Form.Item
        label={t("title")}
        name="title"
        labelCol={{ span: 0 }}
        rules={titleRules}
      >
        <InputContainer className="form-control" />
      </Form.Item>
    </>
  );
}
