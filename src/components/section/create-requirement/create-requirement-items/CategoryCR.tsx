import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { useContext } from "react";

import { Form } from "antd";
import { ListsContext } from "../../../../contexts/listsContext";
import { getListForSelectIdValueMap } from "../../../../utilities/globalFunctions";

export default function CategoryCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { categoryList } = context;

  return (
    <>
      <div className="titulo-input">{t("category")}</div>
      <Form.Item
        label={t("category")}
        name="category"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          options={getListForSelectIdValueMap(categoryList)}
        />
      </Form.Item>
    </>
  );
}
