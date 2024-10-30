import { useRef, useState } from "react";
import {
  defaultRequirementImage,
  defaultUserImage,
} from "../../utilities/globals";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../containers/ImagePreviewGroupContainer";

interface FrontImageProps {
  image: string | string[] | undefined;
  isUser: boolean;
  small?: boolean;
}

export default function FrontImage(props: FrontImageProps) {
  const [imgList, setImgList] = useState<string[]>([]);
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  let src = props.isUser ? defaultUserImage : defaultRequirementImage;

  function handleOpenPreview() {
    if (props.image && props.image.length > 0)
      if (childRef.current) {
        childRef.current.openPreview();
      }
  }

  if (props.image)
    if (typeof props.image === "string") {
      src = props.image;
      setImgList([props.image]);
    } else if (props.image.length > 0) {
      src = props.image[0];
      setImgList(props.image);
    }

  return (
    <>
      <ImagePreviewGroupContainer ref={childRef} image={imgList} />
      <img
        src={src}
        className={props.small ? "img-oferta" : "portada-detalle"}
        onClick={handleOpenPreview}
      />
    </>
  );
}
