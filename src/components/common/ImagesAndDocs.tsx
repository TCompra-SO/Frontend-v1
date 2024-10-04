import { useState } from "react";
import { Image } from "antd";

interface ImagesAndDocsProps {
  image: string[] | undefined;
  document: string[] | undefined;
  showChat?: boolean;
  goToChat?: () => void;
}

export default function ImagesAndDocs(props: ImagesAndDocsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  function showDocument() {
    props.document?.forEach((documentUrl) => {
      window.open(
        documentUrl,
        "_blank",
        "width=800,height=600,top=100,left=100,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes"
      );
    });
  }

  return (
    <div className="t-flex multimedia">
      {props.image && props.image.length > 0 && (
        <Image.PreviewGroup
          items={props.image}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
        />
      )}
      <div className="t-flex">
        <i
          className="fa-regular fa-images multi-datos"
          onClick={() => {
            if (props.image && props.image.length > 0) setPreviewOpen(true);
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
    </div>
  );
}
