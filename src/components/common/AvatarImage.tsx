import AvatarContainer from "../containers/AvatarContainer";

interface FrontImageProps {
  image: string | string[] | undefined;
  isUser: boolean;
}

export default function AvatarImage(props: FrontImageProps) {
  let src = props.isUser
    ? "/src/assets/images/img-prod.svg"
    : "/src/assets/images/img-prod.svg";
  if (props.image)
    if (typeof props.image === "string") src = props.image;
    else if (props.image.length > 0) src = props.image[0];

  return <AvatarContainer src={src} className="img-prod-table" />;
}
