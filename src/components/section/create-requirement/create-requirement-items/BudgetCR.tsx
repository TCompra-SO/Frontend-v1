import { useTranslation } from "react-i18next";
import InputNumberContainer from "../../../containers/InputNumberContainer";
import { Form } from "antd";

export default function BudgetCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("budget")}</div>
      <Form.Item label={t("budget")} name="budget" labelCol={{ span: 0 }}>
        <InputNumberContainer
          min={0}
          step={0.1}
          precision={1}
          className="form-control"
          placeholder="0"
        />
      </Form.Item>
    </>
  );
}
