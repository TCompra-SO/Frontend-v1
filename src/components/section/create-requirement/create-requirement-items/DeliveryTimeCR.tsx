import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";

export default function DeliveryTimeCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { deliveryTimeList } = context;

  return (
    <>
      <div className="titulo-input">{t("deliveryTime")}</div>
      <Form.Item
        label={t("deliveryTime")}
        name="deliveryTime"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          options={Object.entries(deliveryTimeList).map(([id, { value }]) => ({
            label: value,
            value: Number(id),
          }))}
        />
      </Form.Item>
    </>
  );
}
