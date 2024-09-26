import { useDniRules } from "../../../../hooks/validators";
import { DocType } from "../../../../utilities/types";
import { Form } from "antd";
import InputContainer from "../../../containers/InputContainer";
import { useTranslation } from "react-i18next";

export default function DniAU() {
  const { t } = useTranslation();
  const { dniRules } = useDniRules(true);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{DocType.DNI}</div>
      <Form.Item
        label={t("document")}
        name="document"
        labelCol={{ span: 0 }}
        rules={dniRules}
      >
        <InputContainer type="text" className="form-control" />
      </Form.Item>
    </div>
  );
}
