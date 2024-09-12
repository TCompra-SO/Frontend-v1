import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { IdValueObj } from "../../../../models/Interfaces";
import { Form } from "antd";
import { defaultCountry } from "../../../../utilities/globals";

export default function LocationCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;

  const showCountry = countryData[defaultCountry]
    ? defaultCountry
    : Object.keys(countryData)[0];

  return (
    <>
      <div className="titulo-input">{t("location")}</div>
      <Form.Item
        label={t("location")}
        name="location"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          options={countryData[showCountry].cities.map((cit: IdValueObj) => {
            return { label: cit.value, value: cit.id };
          })}
          className="form-control"
        />
      </Form.Item>
    </>
  );
}
