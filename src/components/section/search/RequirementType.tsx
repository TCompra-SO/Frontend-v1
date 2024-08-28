import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";

export default function RequirementType() {
  const { t } = useTranslation();
  return (
    <Form.Item name="reqTypeSearch">
      <SelectContainer
        placeholder={t("requirementType")}
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
        style={{ width: "100%" }}
      ></SelectContainer>
    </Form.Item>
  );
}
