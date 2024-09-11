import { useTranslation } from "react-i18next";
import DatePickerContainer from "../../../containers/DatePickerContainer";
import { Form } from "antd";

export default function FinalDateCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("expirationDate")}</div>
      <Form.Item
        label={t("expirationDate")}
        name="expirationDate"
        labelCol={{ span: 0 }}
      >
        <DatePickerContainer
          style={{ width: "100%" }}
          className="form-control"
          placeholder={t("select")}
        ></DatePickerContainer>
      </Form.Item>
    </>
  );
}
