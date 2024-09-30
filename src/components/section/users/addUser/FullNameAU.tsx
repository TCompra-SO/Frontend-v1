import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";

interface FullNameAUProps {
  disabled?: boolean;
}

export default function FullNameAU(props: FullNameAUProps) {
  const { t } = useTranslation();

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("fullname")}</div>
      <Form.Item
        label={t("fullname")}
        name="fullname"
        labelCol={{ span: 0 }}
        rules={[{ required: true, message: t("clickOnSearchIcon") }]}
      >
        <InputContainer
          disabled={props.disabled}
          type="text"
          className="form-control"
        />
      </Form.Item>
    </div>
  );
}
