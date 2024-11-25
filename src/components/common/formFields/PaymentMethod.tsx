import { Form } from "antd";

import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../contexts/ListsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";

export default function PaymentMethodField() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { paymentMethodData } = context;

  return (
    <Form.Item
      label={t("paymentMethod")}
      name="paymentMethod"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <SelectContainer
        placeholder={t("select")}
        className="form-control"
        options={getListForSelectIdValueMap(paymentMethodData)}
      />
    </Form.Item>
  );
}
