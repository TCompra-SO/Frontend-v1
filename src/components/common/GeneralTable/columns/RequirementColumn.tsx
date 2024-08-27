import { ColumnType } from "antd/es/table";
import {
  OfferListItem,
  PurchaseOrder,
} from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export default function RequirementColumn(
  isRequirement: boolean,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<OfferListItem | PurchaseOrder> = {
    title: isRequirement ? t("requirement") : t("sale"),
    dataIndex: "requirementTitle",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => a.requirementTitle.localeCompare(b.requirementTitle),
    showSorterTooltip: false,
    render: (_, record) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {record.requirementTitle}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
