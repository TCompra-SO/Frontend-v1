import { useTranslation } from "react-i18next";
import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { TimeMeasurement } from "../../../utilities/types";

interface DurationFieldProps {
  required: boolean;
  name: string;
}

export default function DurationField(props: DurationFieldProps) {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t(props.name)}
      name={props.name}
      labelCol={{ span: 0 }}
      rules={[{ required: props.required }]}
    >
      <SelectContainer
        placeholder={t("select")}
        className="form-control"
        style={{ width: "100%" }}
        options={[
          { label: t("years"), value: TimeMeasurement.YEARS },
          { label: t("months"), value: TimeMeasurement.MONTHS },
          { label: t("days"), value: TimeMeasurement.DAYS },
        ]}
      />
    </Form.Item>
  );
}
