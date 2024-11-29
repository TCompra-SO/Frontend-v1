import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { ReactNode, useContext } from "react";
import { ListsContext } from "../../../contexts/ListsContext";
import { getCityListForSelect } from "../../../utilities/globalFunctions";

interface LocationFieldProps {
  value?: number;
  edit?: boolean;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function LocationField(props: LocationFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData } = context;
  const item: ReactNode = (
    <Form.Item
      label={t("location")}
      name="location"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
      initialValue={props.value}
    >
      <SelectContainer
        placeholder={t(props.onlyItem ? "city" : "select")}
        options={getCityListForSelect(countryData)}
        className="form-control"
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("location")}</div>
      {item}
    </div>
  );
}
