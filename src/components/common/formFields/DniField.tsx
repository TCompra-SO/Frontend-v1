import { useDniRules } from "../../../hooks/validators";
import { DocType } from "../../../utilities/types";
import { Form } from "antd";
import InputContainer from "../../containers/InputContainer";
import { useTranslation } from "react-i18next";
import { ReactNode, useState } from "react";

interface DniFieldProps {
  getUserName: () => void;
  resetFields: (fields?: string[]) => void;
  edit?: boolean;
  value?: string;
  onlyItem?: boolean;
}

export default function DniField(props: DniFieldProps) {
  const { t } = useTranslation();
  const { dniRules } = useDniRules(true);
  const [value] = useState(props.value);
  const item: ReactNode = (
    <Form.Item
      label={t("document")}
      name="document"
      labelCol={{ span: 0 }}
      rules={dniRules}
      initialValue={value}
    >
      <div className="t-flex" style={{ alignItems: "center" }}>
        <InputContainer
          type="text"
          className="form-control"
          onChange={() => props.resetFields(["fullname"])}
          disabled={props.edit}
          value={value}
          placeholder={DocType.DNI}
        />
        <i
          onClick={props.edit ? () => {} : props.getUserName}
          className="fas fa-search"
          style={{
            marginLeft: "7px",
            cursor: "pointer",
            background: "#ffe9f7",
            color: "#bc1373",
            padding: "13px",
            borderRadius: "0.6rem",
          }}
        ></i>
      </div>
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{DocType.DNI}</div>
      {item}
    </div>
  );
}
