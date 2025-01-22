import { ColumnType } from "antd/es/table";
import { Offer, PurchaseOrder } from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { requirementColumnKey } from "../../../../utilities/globals";
import { FieldSort } from "../../../../models/Requests";
import { getSortOrderFromFieldSort } from "../../../../utilities/globalFunctions";

export default function RequirementColumn(
  isRequirement: boolean,
  hidden: boolean = false,
  fieldSort?: FieldSort
) {
  const { t } = useTranslation();

  const col: ColumnType<Offer | PurchaseOrder> = {
    title: isRequirement ? t("requirement") : t("sale"),
    dataIndex: "requirementTitle",
    key: requirementColumnKey,
    align: "center",
    hidden,
    sorter: true,
    showSorterTooltip: false,
    sortOrder: getSortOrderFromFieldSort(requirementColumnKey, fieldSort),
    render: (_, record) => (
      <>
        <Flex vertical>
          <div
            className="text-truncate dato-table"
            style={{ textAlign: "left" }}
          >
            {record.requirementTitle}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
