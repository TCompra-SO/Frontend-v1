import { Form, GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { maxImageSizeMb, maxImagesQuantity } from "../../../utilities/globals";
import { checkImage } from "../../../utilities/globalFunctions";
import useShowNotification from "../../../hooks/utilHooks";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface AddImagesFieldProps {
  forOffer?: boolean;
  onlyUpload?: {
    child: ReactNode;
    onChange: (files: UploadFile[]) => void;
  };
}

export default function AddImagesField({
  forOffer = false,
  onlyUpload,
}: AddImagesFieldProps) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function getBase64(file: FileType): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    setFileList(info.fileList);
    onlyUpload?.onChange(info.fileList);
  }

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  }

  function checkImageBeforeUpload(file: RcFile) {
    if (fileList.length === maxImagesQuantity) {
      showNotification("error", t("maxNumberImagesReached"));
      return Upload.LIST_IGNORE;
    }
    const { validImage, validSize } = checkImage(file);
    if (!validImage) {
      showNotification("error", `${file.name}${t("nameInvalidImage")}`);
    } else if (!validSize) {
      showNotification(
        "error",
        `${file.name}${t("nameInvalidImageSize")}${maxImageSizeMb} mb`
      );
    }
    return validImage && validSize ? false : Upload.LIST_IGNORE;
  }

  function renderUploadComponent() {
    return (
      <Upload
        accept="image/*"
        multiple
        onChange={handleChange}
        fileList={fileList}
        maxCount={maxImagesQuantity}
        listType="picture-card"
        showUploadList={!onlyUpload}
        onPreview={onlyUpload ? undefined : handlePreview}
        beforeUpload={checkImageBeforeUpload}
      >
        <div style={{ display: "none" }} ref={fileInputRef} />
      </Upload>
    );
  }

  return onlyUpload ? (
    <>
      <div
        className="hide-upload"
        style={{ marginBottom: "-4px" }}
        onClick={handleClick}
      >
        {onlyUpload.child}
        {renderUploadComponent()}
      </div>
    </>
  ) : (
    <>
      <div className="hide-upload" style={forOffer ? { width: "100%" } : {}}>
        <div
          className={forOffer ? "multimedia-files" : "multimedia-subir"}
          style={forOffer ? {} : { marginBottom: "15px" }}
          onClick={handleClick}
        >
          <i className="fa-regular fa-images"></i> {t("addImages")}
        </div>
        <Form.Item name="images">{renderUploadComponent()}</Form.Item>

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
