import { IdcardOutlined } from "@ant-design/icons";
import { ProFormSegmented, ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import { useState } from "react";
import './items.css';
import { DocType } from "../../../utilities/types";

interface DniProps {
  onChangeTypeDoc: (type: string) => void; 
}

const rulesDni =  [
  {
    required: true,
    message: 'Campo obligatorio',
  },
  {
    min: Lengths.dni.min,
    message: `Ingresa mínimo ${Lengths.dni.min} caracteres`
  },
  {
    max: Lengths.dni.max,
    message: `Ingresa máximo ${Lengths.dni.max} caracteres`
  }
];

const rulesRuc =  [
  {
    required: true,
    message: 'Campo obligatorio',
  },
  {
    min: Lengths.ruc.min,
    message: `Ingresa mínimo ${Lengths.ruc.min} caracteres`
  },
  {
    max: Lengths.ruc.max,
    message: `Ingresa máximo ${Lengths.ruc.max} caracteres`
  }
];

export default function Dni({ onChangeTypeDoc }: DniProps) {
  const [docLabel, setDocLabel] = useState(DocType.DNI);
  
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
          label == 'open' ? setDocLabel(DocType.DNI) : setDocLabel(DocType.RUC);  
          onChangeTypeDoc(label == 'open' ? DocType.DNI : DocType.RUC);
        }}
      />
      <ProFormText
        name="document"
        fieldProps={{
          size: 'large',
          prefix: (
            <IdcardOutlined
              className={'prefixIcon'}
            />
          ),         
        }}
        placeholder={docLabel}
        rules={docLabel == DocType.DNI ? rulesDni : rulesRuc}
      />
    </>
  )
}
