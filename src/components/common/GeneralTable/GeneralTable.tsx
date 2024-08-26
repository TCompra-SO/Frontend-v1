import { Table, TableProps } from "antd";
import { TableColumns, TableTypes } from "../../../utilities/types";
import { pageSizeOptionsSt } from "../../../utilities/globals";
import ImageColumn from "./columns/ImageColumn";
import NameColumn from "./columns/NameColumn";
import LocationColumn from "./columns/LocationColumn";
import DateColumn from "./columns/DateColumn";
import PriceColumn from "./columns/PriceColumn";
import OffersColumn from "./columns/OffersColumn";
import StateColumn from "./columns/StateColumn";
import ActionColumn from "./columns/ActionColumn";
import CategoryColumn from "./columns/CategoryColumn";
import { TableType } from "../../../models/Interfaces";
import { TableRecordType } from "../../../models/MainInterfaces";
import RequirementColumn from "./columns/RequirementColumn";

interface RequirementsTableProps {
  content: TableType;
}

export default function GeneralTable(props: RequirementsTableProps) {
  const pageSizeOptions = pageSizeOptionsSt;
  let columns: TableProps<TableRecordType>["columns"] = [];

  // Hacer visibles todas las columnas inicialmente
  const visibility: { [key in TableColumns]: boolean } = Object.keys(
    TableColumns
  )
    .filter((key) => isNaN(Number(key)))
    .reduce((acc, key) => {
      acc[TableColumns[key as keyof typeof TableColumns]] = false;
      return acc;
    }, {} as { [key in TableColumns]: boolean });

  // Ocultar columnas
  props.content.hiddenColumns.map((hiddenCol) => {
    visibility[hiddenCol] = true;
  });

  switch (props.content.type) {
    case TableTypes.REQUIREMENT:
      props.content.data;
      getRequirementTableColumns();
      break;
    case TableTypes.OFFER:
      getOfferTableColumns();
  }

  function getRequirementTableColumns() {
    columns = [
      ImageColumn(visibility[TableColumns.IMAGE]),
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      CategoryColumn(props.content.type, visibility[TableColumns.CATEGORY]),
      LocationColumn(visibility[TableColumns.LOCATION]),
      DateColumn(visibility[TableColumns.DATE]),
      PriceColumn(visibility[TableColumns.PRICE]),
      OffersColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.OFFERS]
      ),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getOfferTableColumns() {
    columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      LocationColumn(visibility[TableColumns.LOCATION]),
      DateColumn(visibility[TableColumns.DATE]),
      PriceColumn(visibility[TableColumns.PRICE]),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getPurchaseOrderColumns() {
    columns = [
      RequirementColumn(
        TableTypes.PURCHASE_ORDER,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
    ];
    return columns;
  }

  return (
    <Table
      dataSource={props.content.data}
      columns={columns}
      scroll={{ x: 1000 }}
      style={{ width: "100%" }}
      bordered={false}
      pagination={{
        pageSizeOptions,
        showSizeChanger: true,
        // hideOnSinglePage: true,<
        // locale: {
        //   items_per_page: `/ ${
        //     props.type == RequirementType.GOOD
        //       ? t("goods")
        //       : props.type == RequirementType.SERVICE
        //       ? t("services")
        //       : props.type == RequirementType.SALE
        //       ? t("sales")
        //       : t("jobs")
        //   } por página`,
        // },
      }}
    ></Table>
  );
}
