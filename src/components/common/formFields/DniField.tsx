import { useDniRules, useRucRules } from "../../../hooks/validators";
import { DocType } from "../../../utilities/types";
import { Form } from "antd";
import InputContainer from "../../containers/InputContainer";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface DniFieldProps {
  getUserName?: () => void;
  onChange?: () => void;
  edit?: boolean;
  value?: string;
  onlyItem?: boolean;
  isDni: boolean;
  fromMyPerfil?: boolean;
  includeSearch?: boolean;
}

export default function DniField(props: DniFieldProps) {
  const { t } = useTranslation();
  const { dniRules } = useDniRules(true);
  const { rucRules } = useRucRules(true);

  const item: ReactNode = (
    <Form.Item
      label={t("document")}
      name="document"
      labelCol={{ span: 0 }}
      rules={props.isDni ? dniRules : rucRules}
      // initialValue={props.value}
    >
      <div className="t-flex" style={{ alignItems: "center" }}>
        <InputContainer
          type="text"
          className="form-control"
          onChange={props.onChange}
          disabled={props.edit}
          placeholder={props.isDni ? DocType.DNI : DocType.RUC}
          value={props.value}
        />
        {props.includeSearch && (
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
        )}
      </div>
    </Form.Item>
  );

  if (props.onlyItem) return item;
  return (
    <div className={`t-flex ${props.fromMyPerfil ? "datos-input" : "ad-user"}`}>
      <div className="titulo-input">
        {props.isDni ? DocType.DNI : DocType.RUC}
      </div>
      {item}
    </div>
  );
}
