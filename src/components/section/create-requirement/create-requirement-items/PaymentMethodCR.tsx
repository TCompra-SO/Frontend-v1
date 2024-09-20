import { Form } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";

export default function PaymentMethodCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { paymentMethodList } = context;

  return (
    <>
      <div className="titulo-input">{t("paymentMethod")}</div>
      <Form.Item
        label={t("paymentMethod")}
        name="paymentMethod"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          options={Object.entries(paymentMethodList).map(([id, { value }]) => ({
            label: value,
            value: Number(id),
          }))}
        />
      </Form.Item>
    </>
  );
}
