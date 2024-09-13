import { App, Form, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { maxDocSizeMb } from "../../../../utilities/globals";
import { checkDoc } from "../../../../utilities/globalFunctions";
import showNotification from "../../../../utilities/notification/showNotification";

export default function AddDocument() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const fileInputRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<UploadFile>();

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    setFile(info.file);
  }

  function checkImageBeforeUpload(file: RcFile) {
    const { validSize } = checkDoc(file);
    if (!validSize)
      showNotification(
        notification,
        "error",
        `${file.name}${t("nameInvalidImageSize")}${maxDocSizeMb} mb`
      );
    if (!validSize) return Upload.LIST_IGNORE;
    return false;
  }

  return (
    <>
      <div className="hide-upload">
        <div
          className="multimedia-subir"
          style={{ marginBottom: "15px" }}
          onClick={handleClick}
        >
          <i className="fa-regular fa-file-lines"></i> {t("addDocument")}
        </div>
        <Form.Item name="doc">
          <Upload
            multiple={false}
            onChange={handleChange}
            listType="picture-card"
            style={{ display: "none" }}
            beforeUpload={checkImageBeforeUpload}
          >
            <div style={{ display: "none" }} ref={fileInputRef} />
          </Upload>
        </Form.Item>
      </div>
    </>
  );
}
