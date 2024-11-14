import { ColumnType } from "antd/es/table";
import { BasicPurchaseOrder } from "../../../../models/MainInterfaces";
import { Flex } from "antd";
import { PurchaseOrderTableTypes } from "../../../../utilities/types";

export default function UserNameColumn(
  nameColumnHeader: string,
  hidden: boolean = false,
  extraParam?: any
) {
  const col: ColumnType<BasicPurchaseOrder> = {
    title: nameColumnHeader,
    dataIndex: "title",
    key: "name",
    align: "center",
    hidden,
    sorter: (a, b) => {
      if (
        extraParam &&
        (extraParam == PurchaseOrderTableTypes.ISSUED ||
          extraParam == PurchaseOrderTableTypes.ISSUED_SALES)
      )
        return a.userNameProvider.localeCompare(b.userNameProvider);
      else return a.userNameClient.localeCompare(b.userNameClient);
    },
    showSorterTooltip: false,
    render: (_, record) => (
      <>
        <Flex vertical>
          <div className="text-truncate" style={{ textAlign: "left" }}>
            {extraParam &&
            (extraParam == PurchaseOrderTableTypes.ISSUED ||
              extraParam == PurchaseOrderTableTypes.ISSUED_SALES)
              ? record.userNameProvider
              : record.userNameClient}
          </div>
        </Flex>
      </>
    ),
  };
  return col;
}
