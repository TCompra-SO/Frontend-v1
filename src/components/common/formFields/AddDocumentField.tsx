import { Form, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { maxDocSizeMb, maxDocsQuantity } from "../../../utilities/globals";
import { checkDoc } from "../../../utilities/globalFunctions";
import useShowNotification from "../../../hooks/utilHooks";

interface AddDocumentFieldProps {
  forOffer?: boolean;
  onlyUpload?: {
    child: ReactNode;
    onChange: (files: UploadFile[]) => void;
  };
  multiple?: boolean;
  customChildToUpload?: {
    child: ReactNode;
    handleChange: (fileName: string) => void;
  };
}

export interface AddDocumentFieldRef {
  reset: () => void;
  fileList: UploadFile[];
}

export const AddDocumentField = forwardRef<
  AddDocumentFieldRef,
  AddDocumentFieldProps
>(function AddDocumentField(
  { forOffer = false, onlyUpload, multiple, customChildToUpload },
  ref
) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const fileInputRefDoc = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    onlyUpload?.onChange(fileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFileList([]);
    },
    fileList,
  }));

  function handleClick() {
    if (fileInputRefDoc.current) {
      fileInputRefDoc.current.click();
    }
  }

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    // let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // newFileList = newFileList.slice(-maxDocsQuantity);

    if (customChildToUpload && info.fileList.length > 0) {
      customChildToUpload.handleChange(info.fileList[0].name);
    } else if (customChildToUpload && info.fileList.length == 0)
      customChildToUpload.handleChange("");
    setFileList(info.fileList);
  }

  function checkDocBeforeUpload(file: RcFile) {
    if (fileList.length == maxDocsQuantity && maxDocsQuantity > 1) {
      showNotification("error", `${file.name}${t("maxNumberDocsReached")}`);
      return Upload.LIST_IGNORE;
    }
    const { validSize, validFile } = checkDoc(file);
    if (!validFile) showNotification("error", `${t("onlyPdfs")}`);
    else if (!validSize)
      showNotification(
        "error",
        `${file.name} ${t("nameInvalidImageSize")}${maxDocSizeMb} mb`
      );
    if (!validFile || !validSize) return Upload.LIST_IGNORE;
    return false;
  }

  function renderUploadComponent(customChild?: ReactNode) {
    return (
      <Upload
        multiple={multiple}
        accept=".pdf"
        onChange={handleChange}
        fileList={fileList}
        maxCount={maxDocsQuantity}
        listType="picture-card"
        style={{ display: "none" }}
        beforeUpload={checkDocBeforeUpload}
        showUploadList={!onlyUpload}
        // iconRender={() => <img src={logoBlack}></img>}
        iconRender={() => (
          <i
            style={{ color: "rgba(34, 139, 34, 0.6)", fontSize: "35px" }}
            className="fa-regular fa-file-circle-check"
          ></i>
        )}
      >
        <div style={{ display: "none" }} ref={fileInputRefDoc} />
        {customChild
          ? fileList.length >= maxDocsQuantity
            ? null
            : customChild
          : null}
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
  ) : customChildToUpload ? (
    <div
      className={
        customChildToUpload && fileList.length >= maxDocsQuantity
          ? "hide-upload"
          : ""
      }
    >
      {renderUploadComponent(customChildToUpload.child)}
    </div>
  ) : (
    <>
      <div className="hide-upload" style={forOffer ? { width: "100%" } : {}}>
        <div
          className={forOffer ? "multimedia-files" : "multimedia-subir"}
          style={forOffer ? {} : { marginBottom: "15px" }}
          onClick={handleClick}
        >
          <i className="fa-regular fa-file-lines"></i> {t("addDocument")}
        </div>
        <Form.Item name="doc">{renderUploadComponent()}</Form.Item>
      </div>
    </>
  );
});

export default AddDocumentField;
