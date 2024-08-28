import { Avatar } from "antd";
import { AvatarProps } from "antd/lib";

interface AvatarContainer extends AvatarProps {}

export default function AvatarContainer(props: AvatarContainer) {
  return <Avatar {...props}></Avatar>;
}
