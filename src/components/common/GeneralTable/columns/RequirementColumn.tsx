import { ColumnType } from "antd/es/table";
import { TableRecordType } from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export default function RequirementColumn(
  isRequirement: boolean,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<TableRecordType> = {
    title: isRequirement ? t("requirement") : t("sale"),
    dataIndex: "requirementTitle",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => {
      if ("requirementTitle" in a && "requirementTitle" in b)
        return a.requirementTitle.localeCompare(b.requirementTitle);
      return 0;
    },
    showSorterTooltip: false,
    render: (_, record) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {"requirementTitle" in record ? record.requirementTitle : ""}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
