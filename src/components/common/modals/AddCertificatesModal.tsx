import { t } from "i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import InputContainer from "../../containers/InputContainer";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { App, Input, InputRef } from "antd";
import { checkDoc, checkImage } from "../../../utilities/globalFunctions";
import showNotification from "../../../utilities/notification/showNotification";
import { maxDocSizeMb, maxImageSizeMb } from "../../../utilities/globals";

export default function AddCertificatesModal() {
  const { notification } = App.useApp();
  const [docList, setDocList] = useState<(File | null)[]>([null]);
  const [nameList, setNameList] = useState<string[]>([""]);
  const uid = useSelector((state: MainState) => state.mainUser.uid);
  const name = useSelector((state: MainState) => state.mainUser.name);
  // const doc = useSelector((state: MainState) => state.mainUser.document); //r3v
  const fileInputRef = useRef<InputRef>(null);

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

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.input!.click();
    }
  }

  function handleChangeImage(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const file = e.target.files?.[0];
    if (file) {
      const { validImage, validSize } = checkImage(file);
      const { validSize: validSizeDoc } = checkDoc(file);
      if (validImage) {
        if (validSize) {
          showNotification(
            notification,
            "error",
            t("invalidImageSize") + maxImageSizeMb + " mb"
          );
          return;
        }
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
      setNameList((prev) => {
        const newArray = [...prev];
        newArray[index] = file.name;
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
      if (!docList[i] || !nameList[i]) {
        showNotification(
          notification,
          "error",
          t("mustUploadAFileAndProvideNameForEachItem")
        );
        return;
      }
    }
    console.log(uid);
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
            {t("document")}: 12346598779
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
                ref={fileInputRef}
              />
              <InputContainer
                type="text"
                className="form-control f-white"
                placeholder="Nombre del Documento"
                value={nameList[index]}
                onChange={(e) => handleInputChange(e, index)}
              />
              <div className="t-flex doc-botones">
                <ButtonContainer
                  className="btn btn-opaco btn-sm wd-100"
                  onClick={handleClick}
                >
                  <i
                    className="fa-regular fa-images"
                    style={{ marginRight: "5px" }}
                  ></i>
                  {t("uploadFile")}
                </ButtonContainer>
                <ButtonContainer
                  className="btn btn-black btn-sm wd-100"
                  onClick={() => deleteBlock(index)}
                >
                  {t("delete")}
                </ButtonContainer>
              </div>
            </div>
          </div>
        ))}

        <div className="text-right">
          <ButtonContainer className="btn btn-green" onClick={sendDocuments}>
            {t("uploadDocuments")}
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
}
