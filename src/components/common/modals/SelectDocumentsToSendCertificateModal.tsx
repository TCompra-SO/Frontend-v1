import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import SelectContainer from "../../containers/SelectContainer";
import { CertificationState, ModalTypes } from "../../../utilities/types";
import {
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import { useState } from "react";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";
import { ModalContent, SelectDocsModalData } from "../../../models/Interfaces";
import { Checkbox, notification } from "antd";
import ModalContainer from "../../containers/ModalContainer";
import { mainModalScrollStyle } from "../../../utilities/globals";
import showNotification from "../../../utilities/notification/showNotification";

const cert: CertificateFile[] = [
  {
    name: "sadasd dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka dhjahdjh sjh djhasjkdhka ",
    documentName:
      "ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds-ffdfds.jpeg",
    url: "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
  },
  {
    name: "ddddddddd ssssssssssssss sss ssssssssss",
    documentName: "dummy.pdf",
    url: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
  },
  {
    name: "ddddddddd ssssssssssssss sss ssssssssss",
    documentName: "dummy.pdf",
    url: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
  },
];

interface SelectDocumentsToSendCertificateModalProps {
  data: SelectDocsModalData;
}

export default function SelectDocumentsToSendCertificateModal(
  props: SelectDocumentsToSendCertificateModalProps
) {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [docs, setDocs] = useState<CertificateFile[]>(cert);
  const [dataModal] = useState<ModalContent>({
    type: ModalTypes.ADD_CERTIFICATES,
  });
  const [checked, setChecked] = useState<boolean[]>(
    Array(docs.length).fill(false)
  );

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function setCheckedDoc(value: boolean, index: number) {
    setChecked((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  }

  function submit() {
    console.log(checked);
    if (!checked.reduce((a, b) => a && b)) {
      showNotification(
        notification,
        "error",
        t("mustSelectAtLeastOneDocument")
      );
      return;
    }
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />

      <div className="modal-card img-bg-certificado">
        <div className="t-flex mr-sub-2">
          <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
          <div className="sub-titulo sub-calificar">
            <div>{t("certifyYourCompany")}</div>
            <div className="calificar-detalle">
              {t("GetYourCertificationFrom")} {props.data.userName}
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 preguntas">
          <div className="t-flex gap-15">
            <div className="card-ofertas cert-datos">
              <div className="dato-empresa">
                <TextAreaContainer
                  className="form-control wd-100"
                  autoSize
                  readOnly
                  placeholder={`${t("notes")}...`}
                  value={props.data.text}
                />
              </div>
            </div>
          </div>

          {docs.map((obj, index) => (
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

                <Checkbox
                  onChange={(e) => setCheckedDoc(e.target.checked, index)}
                  value={checked[index]}
                ></Checkbox>
              </div>
            </div>
          ))}
          <div className="t-flex gap-15 wd-100 alert-btn">
            <ButtonContainer
              className="btn alert-boton btn-green"
              onClick={() => submit()}
            >
              {t("send")}
            </ButtonContainer>
            <ButtonContainer
              className="btn alert-boton btn-green-o"
              onClick={() => setIsOpenModal(true)}
            >
              {t("addCertificates")}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </>
  );
}
