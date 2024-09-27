import { useDniRules } from "../../../../hooks/validators";
import { DocType } from "../../../../utilities/types";
import { Form } from "antd";
import InputContainer from "../../../containers/InputContainer";
import { useTranslation } from "react-i18next";

interface DniAUProps {
  getUserName: () => void;
}

export default function DniAU(props: DniAUProps) {
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
        <div className="t-flex" style={{ alignItems: "center" }}>
          <InputContainer type="text" className="form-control" />
          <i
            className="fas fa-search"
            style={{
              marginLeft: "7px",
              cursor: "pointer",
              background: "#ffe9f7",
              color: "#bc1373",
              padding: "13px",
              borderRadius: "0.6rem",
            }}
            onClick={props.getUserName}
          ></i>
        </div>
      </Form.Item>
    </div>
  );
}
