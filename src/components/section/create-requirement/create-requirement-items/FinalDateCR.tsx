import { useTranslation } from "react-i18next";
import DatePickerContainer from "../../../containers/DatePickerContainer";
import { Form } from "antd";
import { isDateEarlierThanToday } from "../../../../utilities/globalFunctions";

export default function FinalDateCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("expirationDate")}</div>
      <Form.Item
        label={t("expirationDate")}
        name="expirationDate"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <DatePickerContainer
          style={{ width: "100%" }}
          className="form-control"
          placeholder={t("select")}
          disabledDate={isDateEarlierThanToday}
        ></DatePickerContainer>
      </Form.Item>
    </>
  );
}
