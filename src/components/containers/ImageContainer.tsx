import { ImageProps } from "antd";
import { Image } from "antd";

interface ImageContainerProps extends ImageProps {}
export default function ImageContainer(props: ImageContainerProps) {
  return <Image {...props} />;
}
