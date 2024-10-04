import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { useContext } from "react";
import { Form } from "antd";
import { ListsContext } from "../../../../contexts/listsContext";
import { getCityListForSelect } from "../../../../utilities/globalFunctions";

export default function LocationCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;

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
          options={getCityListForSelect(countryData)}
          className="form-control"
        />
      </Form.Item>
    </>
  );
}
