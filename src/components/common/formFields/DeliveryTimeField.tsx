import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../contexts/ListsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";

interface DeliveryTimeFieldProps {
  showDifferentPlaceholder?: boolean;
}

export default function DeliveryTimeField(props: DeliveryTimeFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { deliveryTimeData } = context;

  return (
    <Form.Item
      label={t("deliveryTime")}
      name="deliveryTime"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <SelectContainer
        placeholder={t(
          props.showDifferentPlaceholder ? "deliveryTime" : "select"
        )}
        className="form-control"
        options={getListForSelectIdValueMap(deliveryTimeData)}
      />
    </Form.Item>
  );
}
