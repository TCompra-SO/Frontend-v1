import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";

interface KeywordsFieldProps {
  value?: string;
}

export default function KeywordsField(props: KeywordsFieldProps) {
  const { t } = useTranslation();
  const item: ReactNode = (
    <Form.Item
      label={t("keywords")}
      name="keywords"
      labelCol={{ span: 0 }}
      // rules={[{ required: true }]}
      initialValue={props.value}
    >
      <InputContainer
        type="text"
        className="form-control"
        placeholder={t("keywords")}
      />
    </Form.Item>
  );

  return item;
}
