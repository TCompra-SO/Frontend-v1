import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useAddressRules } from "../../../../hooks/validators";

interface AddressAUProps {
  value?: string;
  edit?: boolean;
}

export default function AddressAU(props: AddressAUProps) {
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
        initialValue={props.value}
      >
        <InputContainer type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
