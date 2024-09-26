import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useAddressRules } from "../../../../hooks/validators";

export default function AddressAU() {
  const { t } = useTranslation();
  const { addressRules } = useAddressRules(true);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("address")}</div>
      <Form.Item
        label={t("address")}
        name="address"
        labelCol={{ span: 0 }}
        rules={addressRules}
      >
        <InputContainer type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
