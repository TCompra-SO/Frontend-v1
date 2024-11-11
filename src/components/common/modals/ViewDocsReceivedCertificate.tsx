import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import SelectContainer from "../../containers/SelectContainer";
import { CertificationState } from "../../../utilities/types";
import {
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import { useState } from "react";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";

interface ViewDocsReceivedCertificateProps {
  data: CertificationItem;
  docs: CertificateFile[];
  readOnly?: boolean;
}

export default function ViewDocsReceivedCertificate(
  props: ViewDocsReceivedCertificateProps
) {
  const { t } = useTranslation();
  const [options, setOptions] = useState(
    Array(props.docs.length).fill(CertificationState.PENDING)
  );

  function setOptionValue(value: any, index: number) {
    setOptions((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  }

  function submit(approve: boolean) {
    console.log(options, approve);
  }

  return (
    <div className="modal-card img-bg-certificado">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("certificates")}</div>
          <div className="calificar-detalle">{t("receivedDocuments")}</div>
        </div>
      </div>
      <div className="t-flex gap-15 preguntas">
        {((props.readOnly && props.data.note) || !props.readOnly) && (
          <div className="t-flex gap-15">
            <div className="card-ofertas cert-datos">
              <div className="dato-empresa">
                {!props.readOnly && (
                  <TextAreaContainer
                    className="form-control wd-100"
                    autoSize
                    placeholder={`${t("notes")}...`}
                    maxLength={Lengths.certificationNotes.max}
                  />
                )}
                {props.readOnly && <>{props.data.note}</>}
              </div>
            </div>
          </div>
        )}
        {props.docs.map((obj, index) => (
          <div key={index} className="card-ofertas certificado-bloque">
            <div className="t-flex oferta-titulo gap-10">
              <div className="icon-doc-estado">
                <i className="fa-regular fa-file-lines"></i>
              </div>
              <div className="oferta-usuario col-documento">
                <div className="oferta-datos t-wrap m-0">
                  <div className="text-truncate doc-name">
                    {obj.documentName}
                  </div>
                </div>
                <div className="t-flex oferta-descripcion">
                  <div className="text-truncate detalles-oferta">
                    {obj.name}
                  </div>
                </div>
              </div>
              {!props.readOnly && (
                <SelectContainer
                  className="btn-certificados"
                  defaultValue={CertificationState.PENDING}
                  style={{ height: "3rem", marginRight: "4px" }}
                  options={[
                    { label: t("pending"), value: CertificationState.PENDING },
                    {
                      label: t("approve"),
                      value: CertificationState.CERTIFIED,
                    },
                    { label: t("reject"), value: CertificationState.REJECTED },
                  ]}
                  onChange={(value) => setOptionValue(value, index)}
                />
              )}
              {props.readOnly &&
                obj.state &&
                (obj.state == CertificationState.CERTIFIED ? (
                  <i className="fa-regular fa-circle-check estado-green"></i>
                ) : obj.state == CertificationState.REJECTED ? (
                  <i className="fa-regular fa-circle-xmark estado-red"></i>
                ) : (
                  <i className="fa-regular fa-clock estado-gray"></i>
                ))}
            </div>
          </div>
        ))}
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            className="btn alert-boton btn-green"
            onClick={() => submit(false)}
          >
            {t("certify")}
          </ButtonContainer>
          {/* </div>
        <div className="text-right "> */}
          <ButtonContainer
            className="btn alert-boton btn-green-o"
            onClick={() => submit(true)}
          >
            {t("reject")}
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
}
