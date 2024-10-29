import { App, Form, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { maxDocSizeMb } from "../../../utilities/globals";
import { checkDoc } from "../../../utilities/globalFunctions";
import showNotification from "../../../utilities/notification/showNotification";

export default function AddDocumentField() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const fileInputRefDoc = useRef<HTMLDivElement>(null);

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRefDoc.current) {
      fileInputRefDoc.current.click();
    }
  }

  function checkDocBeforeUpload(file: RcFile) {
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
            accept=".pdf"
            // onChange={handleChange}
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
