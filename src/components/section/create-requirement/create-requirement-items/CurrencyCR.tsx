import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { getListForSelectIdValueMap } from "../../../../utilities/globalFunctions";

export default function CurrencyCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyList } = context;

  return (
    <>
      <div className="titulo-input">{t("currency")}</div>
      <Form.Item
        label={t("currency")}
        name="currency"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          options={getListForSelectIdValueMap(currencyList)}
        />
      </Form.Item>
    </>
  );
}
