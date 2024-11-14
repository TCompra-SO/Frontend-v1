import { Image } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";

interface ImagePreviewGroupContainerProps {
  image: string[] | undefined;
}

export interface ImagePreviewGroupContainerRef {
  openPreview: () => void;
}

export const ImagePreviewGroupContainer = forwardRef<
  ImagePreviewGroupContainerRef,
  ImagePreviewGroupContainerProps
>(function ImagePreviewGroupContainer(props, ref) {
  const [previewOpen, setPreviewOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openPreview: () => setPreviewOpen(true),
  }));

  return (
    <Image.PreviewGroup
      items={props.image}
      preview={{
        visible: previewOpen,
        onVisibleChange: (visible) => setPreviewOpen(visible),
      }}
    />
  );
});
