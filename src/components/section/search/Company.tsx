import { Form } from "antd";
import "./search.css";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";

export default function Company() {
  const { t } = useTranslation();

  return (
    <Form.Item name="companySearch" style={{ width: "100%" }}>
      <SelectContainer
        showSearch={true}
        placeholder={t("company")}
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
        style={{
          marginBottom: "10px",
        }}
      />
    </Form.Item>
  );
}
