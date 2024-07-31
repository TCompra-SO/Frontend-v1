import { Form } from "antd";
import { Category, RequirementSearchItem } from "../../../models/Interfaces";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";

interface KeywordProps {
  categories: Category[];
  requirements: RequirementSearchItem[];
}

export default function Keyword(props: KeywordProps) {
  const { t } = useTranslation();

  return (
    <Form.Item name="keyWordSearch" style={{ width: "100%" }}>
      <SelectContainer
        showSearch
        suffixIcon={null}
        placeholder={`${t("search")}...`}
        optionFilterProp="label"
        style={{ marginBottom: "10px", height: "60px" }}
        options={[
          {
            label: <span>{t("categoryColumn")}</span>,
            title: "categories",
            options: props.categories.map((category: Category) => {
              return { value: category.id, label: category.name };
            }),
          },
          {
            label: <span>{t("requirements")}</span>,
            title: "requirements",
            options: props.requirements.map((req: RequirementSearchItem) => {
              return { value: req.id, label: req.title };
            }),
          },
        ]}
      ></SelectContainer>
    </Form.Item>
  );
}
