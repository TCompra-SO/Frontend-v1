import { ColumnType } from "antd/es/table";
import AvatarContainer from "../../../containers/AvatarContainer";

export default function ImageColumn(hidden: boolean = false) {
  const col: ColumnType<any> = {
    dataIndex: "image",
    align: "center",
    hidden,
    width: 60,
    render: (_, record) => (
      <AvatarContainer
        className="img-prod-table"
        src={record.image ?? "/src/assets/images/img-prod.svg"}
      ></AvatarContainer>
    ),
  };
  return col;
}
