import { useTranslation } from "react-i18next";
import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { TimeMeasurement } from "../../../utilities/types";

interface DurationFieldProps {
  required: boolean;
  name: string;
  onlyItem?: boolean;
  onChange?: (val: TimeMeasurement | undefined) => void;
  forWarranty?: boolean;
}

export default function DurationField(props: DurationFieldProps) {
  const { t } = useTranslation();
  const durList = [
    { label: t("years"), value: TimeMeasurement.YEARS },
    { label: t("months"), value: TimeMeasurement.MONTHS },
    { label: t("days"), value: TimeMeasurement.DAYS },
  ];

  return (
    <Form.Item
      label={t(props.name)}
      name={props.name}
      labelCol={{ span: 0 }}
      rules={[{ required: props.required }]}
    >
      <SelectContainer
        allowClear
        placeholder={
          t(props.onlyItem ? "duration" : "select") +
          `${props.forWarranty ? " - " + t("warranty") : ""}`
        }
        className="form-control"
        style={{ width: "100%" }}
        options={durList}
        onChange={(val) => props.onChange?.(val)}
      />
    </Form.Item>
  );
}
