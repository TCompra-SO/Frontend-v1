import { IdcardOutlined } from "@ant-design/icons";
import { ProFormSegmented, ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import { useState } from "react";
import { DocType } from "../../../utilities/types";

interface DniProps {
  onChangeTypeDoc: (type: string) => void;
}

export default function Dni({ onChangeTypeDoc }: DniProps) {
  const [docLabel, setDocLabel] = useState(DocType.DNI);

  const rulesDni = [
    {
      required: true,
    },
    {
      min: Lengths.dni.min,
    },
    {
      max: Lengths.dni.max,
    },
  ];

  const rulesRuc = [
    {
      required: true,
    },
    {
      min: Lengths.ruc.min,
    },
    {
      max: Lengths.ruc.max,
    },
  ];

  return (
    <>
      <ProFormSegmented
        name="selectType"
        valueEnum={{
          open: DocType.DNI,
          closed: DocType.RUC,
        }}
        fieldProps={{
          block: true,
        }}
        getValueFromEvent={(label) => {
          label == "open" ? setDocLabel(DocType.DNI) : setDocLabel(DocType.RUC);
          onChangeTypeDoc(label == "open" ? DocType.DNI : DocType.RUC);
        }}
      />
      <ProFormText
        name="document"
        label={docLabel == DocType.DNI ? "DNI" : "RUC"}
        style={{ display: "none" }}
        labelCol={{ span: 0 }}
        fieldProps={{
          size: "large",
          prefix: <IdcardOutlined className={"prefixIcon"} />,
        }}
        placeholder={docLabel}
        rules={docLabel == DocType.DNI ? rulesDni : rulesRuc}
      />
    </>
  );
}
