import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../../containers/TextAreaContainer";
import { Form } from "antd";

export default function DocumentsCertifCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("documentListCertif")}</div>
      <Form.Item
        name="docList"
        label={t("list")}
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <TextAreaContainer className="form-control" disabled />
      </Form.Item>
    </>
  );
}
