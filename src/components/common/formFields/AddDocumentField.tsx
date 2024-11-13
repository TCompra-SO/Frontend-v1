import { App, Form, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { maxDocSizeMb, maxDocsQuantity } from "../../../utilities/globals";
import { checkDoc } from "../../../utilities/globalFunctions";
import showNotification from "../../../utilities/notification/showNotification";

export default function AddDocumentField({
  forOffer = false,
}: {
  forOffer?: boolean;
}) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const fileInputRefDoc = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRefDoc.current) {
      fileInputRefDoc.current.click();
    }
  }

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    // let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // newFileList = newFileList.slice(-maxDocsQuantity);
    setFileList(info.fileList);
  }

  function checkDocBeforeUpload(file: RcFile) {
    if (fileList.length == maxDocsQuantity && maxDocsQuantity > 1) {
      showNotification(
        notification,
        "error",
        `${file.name}${t("maxNumberDocsReached")}`
      );
      return Upload.LIST_IGNORE;
    }
    const { validSize, validFile } = checkDoc(file);
    if (!validFile) showNotification(notification, "error", `${t("onlyPdfs")}`);
    else if (!validSize)
      showNotification(
        notification,
        "error",
        `${file.name} ${t("nameInvalidImageSize")}${maxDocSizeMb} mb`
      );
    if (!validFile || !validSize) return Upload.LIST_IGNORE;
    return false;
  }

  return (
    <>
      <div className="hide-upload" style={forOffer ? { width: "100%" } : {}}>
        <div
          className={forOffer ? "multimedia-files" : "multimedia-subir"}
          style={forOffer ? {} : { marginBottom: "15px" }}
          onClick={handleClick}
        >
          <i className="fa-regular fa-file-lines"></i> {t("addDocument")}
        </div>
        <Form.Item name="doc">
          <Upload
            multiple={true}
            accept=".pdf"
            onChange={handleChange}
            fileList={fileList}
            maxCount={1}
            listType="picture-card"
            style={{ display: "none" }}
            beforeUpload={checkDocBeforeUpload}
          >
            <div style={{ display: "none" }} ref={fileInputRefDoc} />
          </Upload>
        </Form.Item>
      </div>
    </>
  );
}
