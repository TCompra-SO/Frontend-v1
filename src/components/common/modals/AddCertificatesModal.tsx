import { t } from "i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import InputContainer from "../../containers/InputContainer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { App, Input, InputRef } from "antd";
import { checkDoc } from "../../../utilities/globalFunctions";
import showNotification, {
  showLoadingMessage,
} from "../../../utilities/notification/showNotification";
import { maxDocSizeMb } from "../../../utilities/globals";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import { Action, UploadCertificateLabels } from "../../../utilities/types";
import { uploadCertificateService } from "../../../services/requests/certificateService";

interface AddCertificatesModalProps {
  onDocumentAdded?: () => void;
  onClose: () => any;
}

export default function AddCertificatesModal(props: AddCertificatesModalProps) {
  const { notification, message } = App.useApp();
  const [docList, setDocList] = useState<(File | null)[]>([null]);
  const [nameList, setNameList] = useState<string[]>([""]);
  const uid = useSelector((state: MainState) => state.mainUser.uid);
  const name = useSelector((state: MainState) => state.mainUser.name);
  const doc = useSelector((state: MainState) => state.mainUser.document);
  const fileInputRefs = useRef<(InputRef | null)[]>([]);

  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, docList.length);
  }, [docList.length]);

  /** Subir archivos */

  const [apiParamsUpload, setApiParamsUpload] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingUpload,
    responseData: responseDataUpload,
    error: errorUpload,
    errorMsg: errorMsgUpload,
    fetchData: fetchDataUpload,
  } = useApi(
    {
      service: apiParamsUpload.service,
      method: apiParamsUpload.method,
      dataToSend: apiParamsUpload.dataToSend,
    },
    {
      saveInQueue: true,
      action: Action.NONE,
      functionToExecute: xx,
      notificationData: {
        type: "success",
        description: t("documentsUploadedSuccessfully"),
      },
    }
  );

  useEffect(() => {
    return () => {
      showLoadingMessage(message, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showLoadingMessage(message, loadingUpload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUpload]);

  useEffect(() => {
    if (apiParamsUpload.service) fetchDataUpload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsUpload]);

  // useEffect(() => {
  //   if (responseDataUpload) {
  //     showNotification(
  //       notification,
  //       "success",
  //       t("documentsUploadedSuccessfully")
  //     );
  //     if (props.onDocumentAdded) props.onDocumentAdded();
  //     console.log("already closed");
  //     props.onClose();
  //   } else if (errorUpload) {
  //     console.log(errorMsgUpload);
  //     showNotification(notification, "error", errorMsgUpload);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [responseDataUpload, errorUpload]);

  function xx() {
    // showNotification(
    //   notification,
    //   "success",
    //   t("documentsUploadedSuccessfully")
    // );
    // if (props.onDocumentAdded) props.onDocumentAdded();
    console.log("already closed");
    props.onClose();
  }

  /** Funciones */

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
        showNotification(notification, "error", `${t("onlyPdfs")}`);
        return;
      } else if (!validSizeDoc) {
        showNotification(
          notification,
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
          notification,
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
    setApiParamsUpload({
      service: uploadCertificateService(),
      method: "post",
      dataToSend: formData,
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
            {t("document")}: {doc}
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
