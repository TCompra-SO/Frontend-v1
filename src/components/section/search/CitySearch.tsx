import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";

export default function CitySearch() {
  const { t } = useTranslation();

  return (
    <Form.Item name="citySearch">
      <SelectContainer
        showSearch
        placeholder={t("locationColumn")}
        optionFilterProp="label"
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      ></SelectContainer>
    </Form.Item>
  );
}
