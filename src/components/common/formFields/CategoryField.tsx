import { useTranslation } from "react-i18next";
import { useContext } from "react";

import { Form } from "antd";
import { ListsContext } from "../../../contexts/ListsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";

interface CategoryFieldProps {
  showLabelPlaceholder?: boolean;
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
      rules={[{ required: true }]}
    >
      <SelectContainer
        showSearch
        optionFilterProp="label"
        placeholder={t(props.showLabelPlaceholder ? "category" : "select")}
        className="form-control"
        options={getListForSelectIdValueMap(categoryData)}
      />
    </Form.Item>
  );
}
