import { ColumnType } from "antd/es/table";
import { TableRecordType } from "../../../../models/MainInterfaces";
import AvatarContainer from "../../../containers/AvatarContainer";

export default function ImageColumn(hidden: boolean = false) {
  const col: ColumnType<TableRecordType> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 40,
    render: (_, { image }) => (
      <AvatarContainer
        src={image ?? "https://placehold.co/100x100"}
      ></AvatarContainer>
    ),
  };
  return col;
}
