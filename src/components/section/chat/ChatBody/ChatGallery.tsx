import { useRef, useState } from "react";
import AddDocumentField, {
  AddDocumentFieldRef,
} from "../../../common/formFields/AddDocumentField";
import AddImagesField, {
  AddImagesFieldRef,
} from "../../../common/formFields/AddImagesField";
import { PlusOutlined } from "@ant-design/icons";
import ButtonContainer from "../../../containers/ButtonContainer";
import { defaultRequirementImage } from "../../../../utilities/globals";
import { useTranslation } from "react-i18next";

interface ChatGalleryProps {
  forImages: boolean;
  onClose: () => void;
}

export default function ChatGallery(props: ChatGalleryProps) {
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState(defaultRequirementImage);
  const [fileName, setFileName] = useState("");
  const docRef = useRef<AddDocumentFieldRef>(null);
  const imgRef = useRef<AddImagesFieldRef>(null);

  return (
    <div className="galeria-upload">
      <div className="content-galeria gap-20">
        <div className="text-truncate name-documento">{fileName}</div>
        <div className="archivo-preview">
          {props.forImages ? (
            <img src={previewImage} alt="" className="imagen-preview" />
          ) : (
            <i className="fa-regular fa-file-doc fa-8x c-default"></i>
          )}
        </div>
        {props.forImages ? (
          <AddImagesField
            ref={imgRef}
            customChildToUpload={{
              child: (
                <ButtonContainer style={{ border: 0, background: "none" }}>
                  <PlusOutlined />
                </ButtonContainer>
              ),
              handlePreview: (filePreview, fileName) => {
                setPreviewImage(filePreview);
                setFileName(fileName);
              },
            }}
          />
        ) : (
          <AddDocumentField
            ref={docRef}
            customChildToUpload={{
              child: (
                <ButtonContainer style={{ border: 0, background: "none" }}>
                  <PlusOutlined />
                </ButtonContainer>
              ),
              handleChange: (fileName) => {
                setFileName(fileName);
              },
            }}
          />
        )}
        {/* <div className="t-flex galeria-min m-0">
          <div>
            <img src="img/back-01.jpg" className="img-min" />
            <i className="fa-solid fa-circle-xmark img-trash"></i>
          </div>
          <div>
            <img src="img/back-02.jpg" className="img-min" />
            <i className="fa-solid fa-circle-xmark img-trash"></i>
          </div>
          <div>
            <img src="img/back-03.jpg" className="img-min" />
            <i className="fa-solid fa-circle-xmark img-trash"></i>
          </div>
          <div>
            <img src="img/back-04.jpg" className="img-min" />
            <i className="fa-solid fa-circle-xmark img-trash"></i>
          </div>
        </div> */}
        <div className="t-flex gap-10">
          <ButtonContainer
            className="btn btn-pm btn-white"
            onClick={() => props.onClose()}
          >
            {t("cancelButton")}
          </ButtonContainer>
          <ButtonContainer className="btn btn-pm btn-default">
            {t("send")}
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
}
