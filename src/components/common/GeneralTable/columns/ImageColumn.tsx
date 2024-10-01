import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import AvatarImage from "../../AvatarImage";
import { SubUserProfile } from "../../../../models/Responses";

export default function ImageColumn(isUser: boolean, hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem | SubUserProfile> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 60,
    render: (_, record) => <AvatarImage image={record.image} isUser={isUser} />,
  };
  return col;
}
