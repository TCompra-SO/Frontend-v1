import ButtonContainer from "../../containers/ButtonContainer";
import InputContainer from "../../containers/InputContainer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { Input, InputRef } from "antd";
import { checkDoc } from "../../../utilities/globalFunctions";
import { maxDocSizeMb } from "../../../utilities/globals";
import { CommonModalProps } from "../../../models/Interfaces";
import {
  DocType,
  ErrorMsgRequestType,
  ErrorRequestType,
  ResponseRequestType,
  UploadCertificateLabels,
} from "../../../utilities/types";
import { uploadCertificateService } from "../../../services/requests/certificateService";
import useShowNotification from "../../../hooks/utilHooks";
import { useTranslation } from "react-i18next";

interface AddCertificatesModalProps extends CommonModalProps {
  onDocumentAdded?: () => void;
  onClose: () => any;
}

export default function AddCertificatesModal(props: AddCertificatesModalProps) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [docList, setDocList] = useState<(File | null)[]>([null]);
  const [nameList, setNameList] = useState<string[]>([""]);
  const uid = useSelector((state: MainState) => state.mainUser.uid);
  const name = useSelector((state: MainState) => state.mainUser.name);
  const doc = useSelector((state: MainState) => state.mainUser.document);
  const fileInputRefs = useRef<(InputRef | null)[]>([]);
  const { loading: loadingUpload } = props.useApiHook;

  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, docList.length);
  }, [docList.length]);

  /** Subir archivos */

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: processRequestResult,
    });

    return () => {
      props.setAdditionalApiParams({ functionToExecute: () => {} });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function processRequestResult(
    responseDataUpload: ResponseRequestType,
    errorUpload: ErrorRequestType,
    errorMsgUpload: ErrorMsgRequestType
  ) {
    if (responseDataUpload) {
      showNotification("success", t("documentsUploadedSuccessfully"));
      if (props.onDocumentAdded) props.onDocumentAdded();
      props.onClose();
    } else if (errorUpload) {
      showNotification("error", errorMsgUpload);
    }
  }

  function deleteBlock(index: number) {
    setDocList((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });
    setNameList((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });
  }

  function addBlockForDoc() {
    setDocList((array) => [...array, null]);
    setNameList((array) => [...array, ""]);
  }

  function handleClick(_: React.MouseEvent<HTMLElement>, index: number) {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.input!.click();
    }
  }

  function handleChangeImage(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const file = e.target.files?.[0];
    if (file) {
      // const { validImage, validSize } = checkImage(file);
      const { validSize: validSizeDoc, validFile } = checkDoc(file);

      // if (validImage) {
      //   if (!validSize) {
      //     showNotification(
      //       notification,
      //       "error",
      //       t("invalidImageSize") + maxImageSizeMb + " mb"
      //     );
      //     return;
      //   }
      // } else
      if (!validFile) {
        showNotification("error", `${t("onlyPdfs")}`);
        return;
      } else if (!validSizeDoc) {
        showNotification(
          "error",
          file.name + t("nameInvalidImageSize") + maxDocSizeMb + " mb"
        );
        return;
      }
      setDocList((prev) => {
        const newArray = [...prev];
        newArray[index] = file;
        return newArray;
      });
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const newNameList = [...nameList];
    newNameList[index] = e.target.value;
    setNameList(newNameList);
  }

  function sendDocuments() {
    for (let i = 0; i < docList.length; i++) {
      if (!docList[i] || !nameList[i].trim()) {
        showNotification(
          "error",
          t("mustUploadAFileAndProvideNameForEachItem")
        );
        return;
      }
    }
    const formData: FormData = new FormData();
    formData.append(UploadCertificateLabels.companyId, uid);
    docList.forEach((file: File | null, i) => {
      if (file) {
        formData.append(UploadCertificateLabels.documenst, file);
        formData.append(UploadCertificateLabels.name, nameList[i].trim());
      }
    });
    props.setApiParams({
      service: uploadCertificateService(),
      method: "post",
      dataToSend: formData,
      includeHeader: false,
    });
  }

  return (
    <div className="modal-card img-bg-certificado">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("certifyYourCompany")}</div>
          <div className="calificar-detalle">
            {t("improveYourCompanysImage")}
          </div>
        </div>
      </div>
      <div className="t-flex gap-15 preguntas">
        <div className="t-flex gap-15 datos-empresa">
          <div className="card-ofertas cert-datos dato-empresa">{name}</div>
          <div className="card-ofertas cert-datos dato-empresa">
            {DocType.RUC}: {doc}
          </div>
        </div>
        <div className="t-flex t-wrap up-footer">
          <div className="t-flex cert-documentos">
            <div className="footer-text">{t("documents")}</div>
            <div className="oferta-cant-doc">{docList.length}</div>
          </div>
          <div className="">
            <ButtonContainer
              className="btn btn-green wd-100"
              onClick={addBlockForDoc}
            >
              {t("addDocument")}
            </ButtonContainer>
          </div>
        </div>
        {docList.map((_, index) => (
          <div key={index} className="card-ofertas t-flex doc-upload">
            <div>
              <i className="fa-regular fa-file-lines icon-doc"></i>
            </div>
            <div className="t-flex wd-100 doc-datos">
              <Input
                type="file"
                multiple={false}
                onChange={(e) => handleChangeImage(e, index)}
                style={{ display: "none" }}
                ref={(el) => (fileInputRefs.current[index] = el)}
              />
              <InputContainer
                type="text"
                className="form-control f-white"
                placeholder="Nombre del Documento"
                value={nameList[index]}
                onChange={(e) => handleInputChange(e, index)}
              />
              <div className="t-flex doc-botones">
                {docList[index]?.name && (
                  <div className="name-doc text-truncate wd-100">
                    {docList[index]?.name}
                  </div>
                )}
                <ButtonContainer
                  className="btn btn-opaco btn-sm wd-100"
                  onClick={(e) => handleClick(e, index)}
                >
                  <i
                    className="fa-regular fa-images"
                    style={{ marginRight: "5px" }}
                  ></i>
                  {t("uploadFile")}
                </ButtonContainer>
                <ButtonContainer
                  className="btn btn-black btn-sm btn-trash"
                  onClick={() => deleteBlock(index)}
                >
                  <i
                    className="fa-regular fa-trash"
                    style={{ marginRight: "5px" }}
                  ></i>
                  {t("delete")}
                </ButtonContainer>
              </div>
            </div>
          </div>
        ))}

        <div className="text-right">
          <ButtonContainer
            className="btn btn-green"
            onClick={sendDocuments}
            loading={loadingUpload}
          >
            {t("uploadDocuments")}
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
}
