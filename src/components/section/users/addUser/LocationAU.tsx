import { Form } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { getCityListForSelect } from "../../../../utilities/globalFunctions";

export default function LocationAU() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;

  return (
    <div className="t-flex ad-user">
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
    </div>
  );
}
