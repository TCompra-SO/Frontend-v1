import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import TagContainer from "../../../containers/TagContainer";
import { RequirementStateMeta } from "../../../../utilities/colors";

export default function StateColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Estado",
    key: "state",
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "120px",
    hidden,
    render: (_, { state }) => (
      <TagContainer
        color={RequirementStateMeta[state].background}
        text={RequirementStateMeta[state].label}
        style={{
          width: "70px",
          textAlign: "center",
          marginInlineEnd: "0",
          color: RequirementStateMeta[state].color,
        }}
      />
    ),
  };
  return col;
}
