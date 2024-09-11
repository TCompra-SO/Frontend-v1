import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";

export default function DeliveryTimeCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("deliveryTime")}</div>
      <Form.Item
        label={t("deliveryTime")}
        name="deliveryTime"
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
