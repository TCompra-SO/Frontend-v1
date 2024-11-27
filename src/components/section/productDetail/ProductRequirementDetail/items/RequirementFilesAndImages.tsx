import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../../../containers/ImagePreviewGroupContainer";
import { openDocument } from "../../../../../utilities/globalFunctions";

interface RequirementFilesAndImagesProps {
  images: string[] | undefined;
  docs: string[] | undefined;
}

export default function RequirementFilesAndImages(
  props: RequirementFilesAndImagesProps
) {
  const { t } = useTranslation();
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);

  function handleOpenPreview() {
    if (props.images && props.images.length > 0)
      if (childRef.current) {
        childRef.current.openPreview();
      }
  }

  function showDocument() {
    props.docs?.forEach((documentUrl) => {
      openDocument(documentUrl);
    });
  }

  return (
    <div className="card-white cbl-5">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-paperclip sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("files")}</div>
        </div>
      </div>
      <div className="t-flex f-column gap-15 archivos-view">
        {props.images && props.images.length > 0 ? (
          <div
            className="multimedia-files t-flex j-conten f-column gap-10"
            onClick={handleOpenPreview}
          >
            <i className="fa-regular fa-images fa-2x"></i>
            <div className="name-file">{t("images")}</div>
          </div>
        ) : (
          <div className="multimedia-nula t-flex j-conten f-column gap-10">
            <i className="fa-regular fa-image-slash fa-2x"></i>
            <div className="name-file">{t("noImages")}</div>
          </div>
        )}

        {props.docs && props.docs.length > 0 ? (
          <div
            className="multimedia-files t-flex j-conten f-column gap-10"
            onClick={showDocument}
          >
            <i className="fa-regular fa-file-lines fa-2x"></i>
            <div className="name-file">{t("documents")}</div>
          </div>
        ) : (
          <div className="multimedia-nula t-flex j-conten f-column gap-10">
            <i className="fa-regular fa-file-slash fa-2x"></i>
            <div className="name-file">{t("noDocuments")}</div>
          </div>
        )}
      </div>
      <ImagePreviewGroupContainer ref={childRef} image={props.images} />
    </div>
  );
}
