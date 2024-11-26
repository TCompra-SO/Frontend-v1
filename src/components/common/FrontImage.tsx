import { useRef, useState, useEffect } from "react";
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
  forHome?: boolean;
}

export default function FrontImage(props: FrontImageProps) {
  const [imgList, setImgList] = useState<string[]>([]);
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  const [src, setSrc] = useState(
    props.isUser ? defaultUserImage : defaultRequirementImage
  );

  function handleOpenPreview() {
    if (props.image && props.image.length > 0) {
      if (childRef.current) {
        childRef.current.openPreview();
      }
    }
  }

  useEffect(() => {
    if (props.image) {
      if (typeof props.image === "string") {
        setSrc(props.image);
        setImgList([props.image]);
      } else if (Array.isArray(props.image) && props.image.length > 0) {
        setSrc(props.image[0]);
        setImgList(props.image);
      }
    }
  }, [props.image]);

  return (
    <>
      <ImagePreviewGroupContainer ref={childRef} image={imgList} />
      <img
        src={src}
        className={
          props.small
            ? "img-oferta"
            : props.forHome
            ? "portada-detalle-2"
            : "portada-detalle"
        }
        onClick={handleOpenPreview}
        style={{
          cursor: props.image && props.image.length > 0 ? "pointer" : undefined,
        }}
      />
    </>
  );
}
