import {
  defaultRequirementImage,
  defaultUserImage,
} from "../../utilities/globals";

interface FrontImageProps {
  image: string | string[] | undefined;
  isUser: boolean;
  small?: boolean;
}

export default function FrontImage(props: FrontImageProps) {
  let src = props.isUser ? defaultUserImage : defaultRequirementImage;
  if (props.image)
    if (typeof props.image === "string") src = props.image;
    else if (props.image.length > 0) src = props.image[0];

  return (
    <img src={src} className={props.small ? "img-oferta" : "portada-detalle"} />
  );
}
