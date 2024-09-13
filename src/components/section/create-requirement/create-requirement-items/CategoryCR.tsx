import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { useContext } from "react";
import { IdValueObj } from "../../../../models/Interfaces";
import { Form } from "antd";
import { ListsContext } from "../../../../contexts/listsContext";

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
          options={categoryList.map((cat: IdValueObj) => {
            return { id: cat.id, label: cat.value, value: cat.id };
          })}
        />
      </Form.Item>
    </>
  );
}
