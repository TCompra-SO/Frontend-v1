import { useTranslation } from "react-i18next";
import { Form } from "antd";
import InputNumberContainer from "../../containers/InputNumberContainer";

interface BudgetFieldProps {
  required: boolean;
}

export default function BudgetField(props: BudgetFieldProps) {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("budget")}
      name="budget"
      labelCol={{ span: 0 }}
      rules={[{ required: props.required }]}
    >
      <InputNumberContainer
        min={0}
        max={99999}
        step={0.1}
        precision={1}
        className="form-control"
        placeholder="0"
      />
    </Form.Item>
  );
}
