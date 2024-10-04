import { ColumnType } from "antd/es/table";
import { Requirement } from "../../../../models/MainInterfaces";
import AvatarImage from "../../AvatarImage";
import { SubUserProfile } from "../../../../models/Responses";

export default function ImageColumn(isUser: boolean, hidden: boolean = false) {
  const col: ColumnType<Requirement | SubUserProfile> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 60,
    render: (_, record) => <AvatarImage image={record.image} isUser={isUser} />,
  };
  return col;
}
