import { IdcardOutlined } from "@ant-design/icons";
import { ProFormSegmented, ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import { useState } from "react";

interface DniProps {
  onChangeTypeDoc: () => void; 
}

const docType = {
  DNI: 'DNI',
  RUC: 'RUC'
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
    message: 'Campo obligatorioee',
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
  const [docLabel, setDocLabel] = useState(docType.DNI);
  
  return (
    <>
      <ProFormSegmented 
        name="selectType"
        valueEnum={{
          open: docType.DNI,
          closed: docType.RUC,
        }}
        fieldProps={{
          block: true,
        }}
        getValueFromEvent={(label) => { 
          onChangeTypeDoc();
          label == 'open' ? setDocLabel(docType.DNI) : setDocLabel(docType.RUC);  
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
        rules={docLabel == docType.DNI ? rulesDni : rulesRuc}
      />
    </>
  )
}
