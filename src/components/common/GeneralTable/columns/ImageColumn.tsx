import { ColumnType } from "antd/es/table";
import { Requirement } from "../../../../models/MainInterfaces";
import AvatarImage from "../../AvatarImage";
import { SubUserBase } from "../../../../models/Responses";

export default function ImageColumn(isUser: boolean, hidden: boolean = false) {
  const col: ColumnType<Requirement | SubUserBase> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 60,
    render: (_, record) => <AvatarImage image={record.image} isUser={isUser} />,
  };
  return col;
}
