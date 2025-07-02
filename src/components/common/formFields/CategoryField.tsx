import { useTranslation } from "react-i18next";
import { useContext } from "react";

import { Form } from "antd";
import { ListsContext } from "../../../contexts/ListsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectCategoryIdValueMap } from "../../../utilities/globalFunctions";

interface CategoryFieldProps {
  showLabelPlaceholder?: boolean;
  required?: boolean;
}

export default function CategoryField(props: CategoryFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { categoryData } = context;

  return (
    <Form.Item
      label={t("category")}
      name="category"
      labelCol={{ span: 0 }}
      rules={[{ required: props.required ?? true }]}
    >
      <SelectContainer
        showSearch
        allowClear
        optionFilterProp="label"
        placeholder={t(props.showLabelPlaceholder ? "category" : "select")}
        className="form-control"
        options={getListForSelectCategoryIdValueMap(categoryData)}
      />
    </Form.Item>
  );
}
