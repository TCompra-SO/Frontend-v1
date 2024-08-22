import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import TagContainer from "../../../containers/TagContainer";
import { RequirementStateMeta } from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";

export default function StateColumn(hidden: boolean = false) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
    title: t("stateColumn"),
    key: "state",
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "100px",
    hidden,
    render: (_, { state }) => (
      <TagContainer
        color={RequirementStateMeta[state].background}
        text={t(RequirementStateMeta[state].label)}
        style={{
          width: "77px",
          textAlign: "center",
          marginInlineEnd: "0",
          color: RequirementStateMeta[state].color,
        }}
      />
    ),
  };
  return col;
}
