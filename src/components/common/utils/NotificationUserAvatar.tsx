import { Avatar } from "antd";
import { primaryColor } from "../../../utilities/colors";
import { AvatarSize } from "antd/lib/avatar/AvatarContext";

interface NotificationUserAvatarProps {
  senderImage: string | undefined;
  senderName: string;
  size?: AvatarSize;
}
export default function NotificationUserAvatar(
  props: NotificationUserAvatarProps
) {
  return (
    <Avatar
      src={props.senderImage ?? undefined}
      style={props.senderImage ? {} : { backgroundColor: primaryColor }}
      size={props.size}
    >
      {props.senderImage ? null : props.senderName[0]}
    </Avatar>
  );
}
