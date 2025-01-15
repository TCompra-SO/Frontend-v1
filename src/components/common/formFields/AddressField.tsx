import { Form } from "antd";
import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import { useAddressRules } from "../../../hooks/validatorHooks";
import { ReactNode } from "react";

interface AddressFieldProps {
  value?: string;
  edit?: boolean;
  fromMyPerfil?: boolean;
  onlyItem?: boolean;
}

export default function AddressField(props: AddressFieldProps) {
  const { t } = useTranslation();
  const { addressRules } = useAddressRules(true);
  const item: ReactNode = (
    <Form.Item
      label={t("address")}
      name="address"
      labelCol={{ span: 0 }}
      rules={addressRules}
      initialValue={props.value}
    >
      <InputContainer
        type="text"
        className="form-control"
        placeholder={t("address")}
      />
    </Form.Item>
  );

  if (props.onlyItem) return item;

  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">{t("address")}</div>
      {item}
    </div>
  );
}
