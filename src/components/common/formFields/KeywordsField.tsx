import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { ReactNode } from "react";
import { Lengths } from "../../../utilities/lengths";
import { formFieldKeyword } from "../../../utilities/globals";

interface KeywordsFieldProps {
  value?: string;
}

export default function KeywordsField(props: KeywordsFieldProps) {
  const { t } = useTranslation();
  const item: ReactNode = (
    <Form.Item
      label={t("keywords")}
      name={formFieldKeyword}
      labelCol={{ span: 0 }}
      // rules={[{ required: true }]}
      initialValue={props.value}
    >
      <InputContainer
        type="text"
        className="form-control"
        placeholder={t("keywords")}
        count={{
          max: Lengths.keywords.max,
          exceedFormatter: (txt, { max }) => txt.slice(0, max),
        }}
      />
    </Form.Item>
  );

  return item;
}
