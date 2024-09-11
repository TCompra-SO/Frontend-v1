import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { Form } from "antd";

export default function TitleCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("title")}</div>
      <Form.Item label={t("title")} name="title" labelCol={{ span: 0 }}>
        <InputContainer className="form-control" />
      </Form.Item>
    </>
  );
}
