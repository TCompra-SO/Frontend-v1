import {
  App,
  Form,
  GetProp,
  Image,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  maxImageSizeMb,
  maxImagesQuantity,
} from "../../../../utilities/globals";
import { checkImage } from "../../../../utilities/globalFunctions";
import showNotification from "../../../../utilities/notification/showNotification";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function AddImagesRC() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  function handleClick() {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-maxImagesQuantity);
    setFileList(newFileList);
  }

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }

  function checkImageBeforeUpload(file: RcFile) {
    const { validImage, validSize } = checkImage(file);
    if (!validImage)
      showNotification(
        notification,
        "error",
        `${file.name}${t("nameInvalidImage")}`
      );
    else if (!validSize)
      showNotification(
        notification,
        "error",
        `${file.name}${t("nameInvalidImageSize")}${maxImageSizeMb} mb`
      );
    if (!validImage || !validSize) return Upload.LIST_IGNORE;
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
          <i className="fa-regular fa-images"></i> {t("addImages")}
        </div>
        <Form.Item name="images">
          <Upload
            accept="image/*"
            multiple={true}
            onChange={handleChange}
            fileList={fileList}
            listType="picture-card"
            onPreview={handlePreview}
            style={{ display: "none" }}
            beforeUpload={checkImageBeforeUpload}
          >
            <div style={{ display: "none" }} ref={fileInputRef} />
          </Upload>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </>
  );
}
