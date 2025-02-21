import { useTranslation } from "react-i18next";
import { Form } from "antd";
import InputNumberContainer from "../../containers/InputNumberContainer";
import { useBudgetRules } from "../../../hooks/validatorHooks";

interface BudgetFieldProps {
  required: boolean;
  greaterThanZero?: boolean;
  usePriceLabel?: boolean;
}

export default function BudgetField(props: BudgetFieldProps) {
  const { t } = useTranslation();
  const { budgetRules } = useBudgetRules(props.required, props.greaterThanZero);

  return (
    <Form.Item
      label={t(props.usePriceLabel ? "price" : "budget")}
      name="budget"
      labelCol={{ span: 0 }}
      rules={budgetRules}
    >
      <InputNumberContainer
        min={0}
        max={99999}
        step={0.1}
        precision={1}
        className="form-control"
        placeholder={t(props.usePriceLabel ? "price" : "budget")}
        onFocus={(event) => event.target.select()}
      />
    </Form.Item>
  );
}
