import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";

export default function CurrencyCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("currency")}</div>
      <Form.Item label={t("currency")} name="currency" labelCol={{ span: 0 }}>
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
