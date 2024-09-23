import { ColumnType } from "antd/es/table";
import AvatarContainer from "../../../containers/AvatarContainer";
import { RequirementTableItem } from "../../../../models/MainInterfaces";

export default function ImageColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 60,
    render: (_, record) => (
      <AvatarContainer
        className="img-prod-table"
        src={
          record.image && record.image.length > 0
            ? record.image[0]
            : "/src/assets/images/img-prod.svg"
        }
      ></AvatarContainer>
    ),
  };
  return col;
}
