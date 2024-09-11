import { Form } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { useTranslation } from "react-i18next";

export default function PaymentMethodCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("paymentMethod")}</div>
      <Form.Item
        label={t("paymentMethod")}
        name="paymentMethod"
        labelCol={{ span: 0 }}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          // options={categoryList.map((cat: IdValueObj) => {
          //   return { id: cat.id, label: cat.value, value: cat.id };
          // })}
        />
      </Form.Item>
    </>
  );
}
