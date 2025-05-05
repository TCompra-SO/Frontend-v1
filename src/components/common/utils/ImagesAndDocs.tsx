import { useRef } from "react";
import { openDocument } from "../../../utilities/globalFunctions";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../containers/ImagePreviewGroupContainer";
import { RequirementType } from "../../../utilities/types";
import { useDownloadPdfOrder } from "../../../hooks/utilHooks";

interface ImagesAndDocsProps {
  image: string[] | undefined;
  document: string[] | undefined;
  showChat?: boolean;
  goToChat?: () => void;
  orderData?: { id: string; type: RequirementType };
}

export default function ImagesAndDocs(props: ImagesAndDocsProps) {
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  const downloadPdfOrder = useDownloadPdfOrder();

  function handleOpenPreview() {
    if (childRef.current) {
      childRef.current.openPreview();
    }
  }

  function showDocument() {
    props.document?.forEach((documentUrl) => {
      openDocument(documentUrl);
    });
  }

  return (
    <div className="t-flex multimedia">
      {props.image && props.image.length > 0 && (
        <ImagePreviewGroupContainer ref={childRef} image={props.image} />
      )}
      <div className="t-flex">
        <i
          className="fa-regular fa-images multi-datos"
          onClick={() => {
            if (props.image && props.image.length > 0) handleOpenPreview();
          }}
        ></i>
        <div className="multi-back"></div>
        <div className="multi-cantidad">
          {props.image ? props.image.length : 0}
        </div>
      </div>
      <div className="t-flex">
        <i
          className="fa-regular fa-file-lines multi-datos"
          onClick={() => {
            if (props.document && props.document.length > 0) showDocument();
          }}
        ></i>
        <div className="multi-back"></div>
        <div className="multi-cantidad">
          {props.document ? props.document.length : 0}
        </div>
      </div>
      {props.showChat && props.goToChat && (
        <div className="t-flex">
          <i
            className="fa-regular fa-comment multi-chat"
            onClick={props.goToChat}
          ></i>
        </div>
      )}
      {props.orderData && (
        <div className="t-flex">
          <i
            className="fa-regular fa-arrow-down-to-line multi-download"
            onClick={() => {
              if (props.orderData)
                downloadPdfOrder(props.orderData.id, props.orderData.type);
            }}
          ></i>
        </div>
      )}
    </div>
  );
}
