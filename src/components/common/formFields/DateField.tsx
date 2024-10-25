import { useTranslation } from "react-i18next";
import { Form } from "antd";
import DatePickerContainer from "../../containers/DatePickerContainer";
import dayjs from "dayjs";

interface DateFieldProps {
  disabledDate?: (date: dayjs.Dayjs) => boolean;
  name: string;
}

export default function DateField(props: DateFieldProps) {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t(props.name)}
      name={props.name}
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <DatePickerContainer
        style={{ width: "100%" }}
        className="form-control"
        placeholder={t("select")}
        disabledDate={props.disabledDate}
      ></DatePickerContainer>
    </Form.Item>
  );
}
