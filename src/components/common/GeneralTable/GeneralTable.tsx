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
import RequirementColumn from "./columns/RequirementColumn";
import {
  OfferListItem,
  PurchaseOrder,
  RequirementTableItem,
} from "../../../models/MainInterfaces";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { SubUserProfile } from "../../../models/Responses";
import GeneralColumnString from "./columns/GeneralColumnString";
import GeneralColumnNumber from "./columns/GeneralColumnNumber";

interface RequirementsTableProps {
  content: TableType;
}

export default function GeneralTable(props: RequirementsTableProps) {
  const { t } = useTranslation();
  const pageSizeOptions = pageSizeOptionsSt;
  let columns: Array<
    | ColumnType<OfferListItem>
    | ColumnType<RequirementTableItem>
    | ColumnType<PurchaseOrder>
    | ColumnType<SubUserProfile>
    | ColumnType<SubUserProfile | RequirementTableItem>
    | ColumnType<OfferListItem | RequirementTableItem>
    | ColumnType<OfferListItem | PurchaseOrder>
    | ColumnType<OfferListItem | PurchaseOrder | RequirementTableItem>
    | ColumnType<OfferListItem | RequirementTableItem | SubUserProfile>
    | ColumnType<OfferListItem | PurchaseOrder | SubUserProfile>
    | ColumnType<
        OfferListItem | PurchaseOrder | RequirementTableItem | SubUserProfile
      >
  > = [];

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

  const tableProps: TableProps = {
    scroll: { x: 1000 },
    style: { width: "100%" },
    bordered: false,
    pagination: {
      pageSizeOptions,
      showSizeChanger: true,
    },
  };

  switch (props.content.type) {
    case TableTypes.REQUIREMENT:
      getRequirementTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<RequirementTableItem>>}
          {...tableProps}
        ></Table>
      );

    case TableTypes.OFFER:
      getOfferTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<OfferListItem>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.USERS:
      getUsersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<SubUserProfile>>}
          {...tableProps}
        ></Table>
      );
  }

  function getRequirementTableColumns() {
    columns = [
      ImageColumn(false, visibility[TableColumns.IMAGE]),
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      CategoryColumn(props.content.type, visibility[TableColumns.CATEGORY]),
      LocationColumn(visibility[TableColumns.LOCATION]),
      DateColumn(props.content.type, visibility[TableColumns.DATE]),
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
      RequirementColumn(true, visibility[TableColumns.REQUIREMENT]),
      LocationColumn(visibility[TableColumns.LOCATION]),
      DateColumn(props.content.type, visibility[TableColumns.DATE]),
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

  function getUsersTableColumns() {
    columns = [
      ImageColumn(true, visibility[TableColumns.IMAGE]),
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(t("email"), "email", true, 130),
      DateColumn(props.content.type, visibility[TableColumns.DATE]),
      GeneralColumnNumber(t("goods"), "numGoods"),
      GeneralColumnNumber(t("services"), "numServices"),
      GeneralColumnNumber(t("sales"), "numSales"),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  // function getPurchaseOrderColumns() {
  //   columns = [RequirementColumn(true, visibility[TableColumns.NAME])];
  //   return columns;
  // }

  // return (
  //   <Table
  //     dataSource={props.content.data}
  //     columns={columns as Array<ColumnType<RequirementTableItem>>}
  //     scroll={{ x: 1000 }}
  //     style={{ width: "100%" }}
  //     bordered={false}
  //     pagination={{
  //       pageSizeOptions,
  //       showSizeChanger: true,
  //     }}
  //   ></Table>
  // );
}
