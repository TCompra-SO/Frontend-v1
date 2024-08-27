import { ColumnType } from "antd/es/table";
import AvatarContainer from "../../../containers/AvatarContainer";

export default function ImageColumn(hidden: boolean = false) {
  const col: ColumnType<any> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 40,
    render: (_, record) => (
      <AvatarContainer
        src={record.image ?? "https://placehold.co/100x100"}
      ></AvatarContainer>
    ),
  };
  return col;
}
