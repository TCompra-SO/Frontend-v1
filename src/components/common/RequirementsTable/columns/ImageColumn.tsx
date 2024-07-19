import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import AvatarContainer from "../../../containers/AvatarContainer";

export default function ImageColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
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
