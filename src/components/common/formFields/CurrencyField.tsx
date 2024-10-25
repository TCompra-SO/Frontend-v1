import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../contexts/listsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";

export default function CurrencyField() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyData } = context;

  return (
    <Form.Item
      label={t("currency")}
      name="currency"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <SelectContainer
        placeholder={t("select")}
        className="form-control"
        options={getListForSelectIdValueMap(currencyData)}
      />
    </Form.Item>
  );
}
