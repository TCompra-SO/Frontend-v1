import { useTranslation } from "react-i18next";
import { useContext } from "react";

import { Form } from "antd";
import { ListsContext } from "../../../contexts/listsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";

export default function CategoryField() {
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
        placeholder={t("select")}
        className="form-control"
        options={getListForSelectIdValueMap(categoryData)}
      />
    </Form.Item>
  );
}
