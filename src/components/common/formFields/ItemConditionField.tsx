import { Form } from "antd";
import { useTranslation } from "react-i18next";
import SelectContainer from "../../containers/SelectContainer";
import { Usage } from "../../../utilities/types";

export default function ItemConditionField() {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("itemCondition")}
      name="itemCondition"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <SelectContainer
        placeholder={t("select")}
        className="form-control"
        style={{ width: "100%" }}
        options={[
          { label: t("new"), value: Usage.NEW },
          { label: t("used"), value: Usage.USED },
        ]}
      />
    </Form.Item>
  );
}
