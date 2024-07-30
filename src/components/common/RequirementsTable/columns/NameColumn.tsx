import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { tableHeaderTextColor } from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import { RequirementType } from "../../../../utilities/types";

export default function NameColumn(
  type: RequirementType,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
    title:
      type == RequirementType.GOOD || RequirementType.SERVICE
        ? t("requirement")
        : type == RequirementType.SALE
        ? t("sale")
        : t("job"),
    dataIndex: "title",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => a.title.localeCompare(b.title),
    showSorterTooltip: false,
    render: (_, { title, category }) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {title}
          </div>
          <div
            className="text-truncate"
            style={{ textAlign: "left", color: tableHeaderTextColor }}
          >
            {category}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
