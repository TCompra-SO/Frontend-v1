import { Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { usePhoneRules } from "../../../../hooks/validators";
import { phoneCode } from "../../../../utilities/globals";

interface PhoneAUProps {
  edit?: boolean;
  value?: string;
}

export default function PhoneAU(props: PhoneAUProps) {
  const { t } = useTranslation();
  const { phoneRules } = usePhoneRules(true);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("phone")}</div>

      <Space.Compact style={{ width: "100%" }}>
        <InputContainer
          style={{ width: "25%" }}
          readOnly={true}
          defaultValue={phoneCode}
          className="form-control"
        />
        <Form.Item
          label={t("phone")}
          name="phone"
          labelCol={{ span: 0 }}
          rules={phoneRules}
          initialValue={props.value}
        >
          <InputContainer
            className="form-control"
            style={{ width: "75%" }}
            placeholder={t("phone")}
          />
        </Form.Item>
      </Space.Compact>
    </div>
  );
}
