import { Table, TableProps } from "antd";
import { TableColumns, TableTypes } from "../../../utilities/types";
import { pageSizeOptionsSt } from "../../../utilities/globals";
import ImageColumn from "./columns/ImageColumn";
import NameColumn from "./columns/NameColumn";
import LocationColumn from "./columns/LocationColumn";
import GeneralDateColumn from "./columns/GeneralDateColumn";
import PriceColumn from "./columns/PriceColumn";
import OffersColumn from "./columns/OffersColumn";
import StateColumn from "./columns/StateColumn";
import ActionColumn from "./columns/ActionColumn";
import CategoryColumn from "./columns/CategoryColumn";
import { TableType } from "../../../models/Interfaces";
import RequirementColumn from "./columns/RequirementColumn";
import {
  OfferItemSubUser,
  Offer,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  Requirement,
  BasicRequirement,
  BasicOffer,
  BasicPurchaseOrder,
  BaseRequirementOffer,
  CertificateFile,
  CertificationItem,
} from "../../../models/MainInterfaces";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { SubUserProfile } from "../../../models/Responses";
import GeneralColumnString from "./columns/GeneralColumnString";
import GeneralColumnNumber from "./columns/GeneralColumnNumber";
import TypeColumn from "./columns/TypeColumn";
import ViewColumn from "./columns/ViewColumn";
import DocumentColumn from "./columns/DocumentColumn";
import { getLabelFromPurchaseOrderType } from "../../../utilities/globalFunctions";

interface GeneralTableProps {
  content: TableType;
}

export default function GeneralTable(props: GeneralTableProps) {
  const { t } = useTranslation();
  const pageSizeOptions = pageSizeOptionsSt;
  let columns: Array<
    | ColumnType<Offer>
    | ColumnType<Requirement>
    | ColumnType<PurchaseOrder>
    | ColumnType<BasicOffer>
    | ColumnType<BasicRequirement>
    | ColumnType<BasicPurchaseOrder>
    | ColumnType<SubUserProfile>
    | ColumnType<RequirementItemSubUser>
    | ColumnType<CertificateFile>
    | ColumnType<CertificationItem>
    | ColumnType<SubUserProfile | Requirement>
    | ColumnType<Offer | Requirement>
    | ColumnType<Offer | PurchaseOrder>
    | ColumnType<PurchaseOrderItemSubUser | PurchaseOrder>
    | ColumnType<Offer | PurchaseOrder | Requirement>
    | ColumnType<Offer | Requirement | SubUserProfile>
    | ColumnType<Offer | PurchaseOrder | SubUserProfile>
    | ColumnType<Offer | PurchaseOrder | Requirement | SubUserProfile>
    | ColumnType<Offer | Requirement | RequirementItemSubUser>
    | ColumnType<SubUserProfile | PurchaseOrder | BaseRequirementOffer>
    | ColumnType<Requirement | Offer | PurchaseOrder | RequirementItemSubUser>
    | ColumnType<
        RequirementItemSubUser | OfferItemSubUser | PurchaseOrderItemSubUser
      >
    | ColumnType<
        | Requirement
        | Offer
        | PurchaseOrder
        | RequirementItemSubUser
        | OfferItemSubUser
        | PurchaseOrderItemSubUser
      >
    | ColumnType<
        | Requirement
        | Offer
        | PurchaseOrder
        | RequirementItemSubUser
        | OfferItemSubUser
        | PurchaseOrderItemSubUser
        | BasicRequirement
        | BasicOffer
        | BasicPurchaseOrder
      >
    | ColumnType<
        | Requirement
        | Offer
        | PurchaseOrder
        | RequirementItemSubUser
        | OfferItemSubUser
        | PurchaseOrderItemSubUser
        | BasicRequirement
        | BasicOffer
        | BasicPurchaseOrder
        | CertificationItem
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
    scroll: {
      x:
        props.content.type == TableTypes.REQUIREMENT_SUBUSER ||
        props.content.type == TableTypes.OFFER_SUBUSER ||
        props.content.type == TableTypes.PURCHASE_ORDER_SUBUSER
          ? 1000
          : 1000,
    },
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
          columns={columns as Array<ColumnType<Requirement>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.OFFER:
      getOfferTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<Offer>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.PURCHASE_ORDER:
      getPurchaseOrderTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<PurchaseOrder>>}
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
    case TableTypes.REQUIREMENT_SUBUSER:
      getRequirementSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<RequirementItemSubUser>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.OFFER_SUBUSER:
      getOfferSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<OfferItemSubUser>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.PURCHASE_ORDER_SUBUSER:
      getPurchaseOrderSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<PurchaseOrderItemSubUser>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.ALL_REQUIREMENTS:
      getAllRequirementsTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<BasicRequirement>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.ALL_OFFERS:
      getAllOffersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<BasicOffer>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.ALL_PURCHASE_ORDERS:
      getAllPurchaseOrdersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<BasicPurchaseOrder>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.MY_DOCUMENTS:
      getMyDocumentsCertificateColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<CertificateFile>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.SENT_CERT:
      getCertificatesSentColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<CertificationItem>>}
          {...tableProps}
        ></Table>
      );
    case TableTypes.RECEIVED_CERT:
      getCertificatesReceivedColumns();
      return (
        <Table
          dataSource={props.content.data}
          columns={columns as Array<ColumnType<CertificationItem>>}
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
      GeneralDateColumn(
        t("dateColumn"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
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
        null,
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
      GeneralDateColumn(
        t("dateColumn"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
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

  function getPurchaseOrderTableColumns() {
    columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("requirement"),
        "requirementTitle",
        true,
        130,
        visibility[TableColumns.REQUIREMENT]
      ),
      GeneralDateColumn(
        t("selectionDateAbbrev"),
        "selectionDate",
        visibility[TableColumns.SELECTION_DATE]
      ),
      TypeColumn(visibility[TableColumns.TYPE]),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getAllRequirementsTableColumns() {
    columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(t("user"), "user.name", true),
      GeneralDateColumn(
        t("dateColumn"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
      CategoryColumn(props.content.type, visibility[TableColumns.CATEGORY]),
      LocationColumn(visibility[TableColumns.LOCATION]),

      PriceColumn(visibility[TableColumns.PRICE]),
      OffersColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.OFFERS]
      ),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.ALL_REQUIREMENTS,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getAllOffersTableColumns() {
    columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(t("user"), "user.name", true),
      RequirementColumn(true, visibility[TableColumns.REQUIREMENT]),
      GeneralDateColumn(
        t("dateColumn"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
      PriceColumn(visibility[TableColumns.PRICE]),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.ALL_REQUIREMENTS,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getAllPurchaseOrdersTableColumns() {
    columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("requirement"),
        "requirementTitle",
        true,
        130,
        visibility[TableColumns.REQUIREMENT]
      ),
      GeneralColumnString(
        t("offer"),
        "offerTitle",
        true,
        130,
        visibility[TableColumns.OFFER]
      ),
      GeneralDateColumn(
        t("publishDateAbbrev"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
      TypeColumn(visibility[TableColumns.TYPE]),
      DocumentColumn(
        props.content.onButtonClick,
        visibility[TableColumns.DOCUMENT]
      ),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.ALL_PURCHASE_ORDERS,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
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
      GeneralColumnString(
        t("email"),
        "email",
        true,
        130,
        visibility[TableColumns.EMAIL]
      ),
      GeneralDateColumn(
        t("dateColumn"),
        "createdAt",
        visibility[TableColumns.CREATION_DATE]
      ),
      GeneralColumnNumber(
        t("goods"),
        "numGoods",
        visibility[TableColumns.GOODS],
        85
      ),
      GeneralColumnNumber(
        t("serviceAbbrev"),
        "numServices",
        visibility[TableColumns.SERVICES],
        85
      ),
      GeneralColumnNumber(
        t("salesAbbrev"),
        "numSales",
        visibility[TableColumns.SALES],
        85
      ),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getRequirementSubUserColumns() {
    columns = [
      GeneralColumnString(
        t("title"),
        "title",
        true,
        130,
        visibility[TableColumns.NAME]
      ),
      PriceColumn(visibility[TableColumns.PRICE]),
      GeneralDateColumn(
        t("publishDateAbbrev"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE]
      ),
      GeneralDateColumn(
        t("expirationDateAbbrev"),
        "expirationDate",
        visibility[TableColumns.EXPIRATION_DATE]
      ),
      TypeColumn(visibility[TableColumns.TYPE]),
      GeneralColumnNumber(
        t("offers"),
        "numberOffers",
        visibility[TableColumns.OFFERS]
      ),
      StateColumn(
        TableTypes.REQUIREMENT_SUBUSER,
        visibility[TableColumns.STATE]
      ),
      ViewColumn(
        TableTypes.REQUIREMENT_SUBUSER,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getOfferSubUserColumns() {
    columns = [
      GeneralColumnString(
        t("title"),
        "title",
        true,
        130,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("requirement"),
        "requirementTitle",
        true,
        130,
        visibility[TableColumns.REQUIREMENT]
      ),
      PriceColumn(visibility[TableColumns.PRICE]),
      GeneralDateColumn(
        t("selectionDateAbbrev"),
        "selectionDate",
        visibility[TableColumns.SELECTION_DATE]
      ),
      TypeColumn(visibility[TableColumns.TYPE]),
      StateColumn(TableTypes.OFFER_SUBUSER, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.OFFER_SUBUSER,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getPurchaseOrderSubUserColumns() {
    columns = [
      GeneralColumnString(
        t("requirement"),
        "requirementTitle",
        true,
        130,
        visibility[TableColumns.REQUIREMENT]
      ),
      GeneralColumnString(
        t("offer"),
        "offerTitle",
        true,
        130,
        visibility[TableColumns.OFFER]
      ),
      GeneralDateColumn(
        t("selectionDateAbbrev"),
        "selectionDate",
        visibility[TableColumns.SELECTION_DATE]
      ),
      GeneralColumnString(
        t("class"),
        "subType",
        false,
        90,
        visibility[TableColumns.SUBTYPE],
        false,
        getLabelFromPurchaseOrderType
      ),
      TypeColumn(visibility[TableColumns.TYPE]),
      DocumentColumn(
        props.content.onButtonClick,
        visibility[TableColumns.DOCUMENT]
      ),
      StateColumn(
        TableTypes.PURCHASE_ORDER_SUBUSER,
        visibility[TableColumns.STATE]
      ),
      ViewColumn(
        TableTypes.PURCHASE_ORDER_SUBUSER,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getMyDocumentsCertificateColumns() {
    columns = [
      GeneralColumnString(
        t("name"),
        "name",
        true,
        130,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("document"),
        "documentName",
        true,
        130,
        visibility[TableColumns.DOCUMENT]
      ),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getCertificatesSentColumns() {
    columns = [
      GeneralColumnString(
        t("company"),
        "companyName",
        true,
        130,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("document"),
        "companyDocument",
        false,
        130,
        visibility[TableColumns.DOCUMENT]
      ),
      GeneralDateColumn(
        t("date"),
        "creationDate",
        visibility[TableColumns.CREATION_DATE]
      ),
      StateColumn(TableTypes.SENT_CERT, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.SENT_CERT,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }
  function getCertificatesReceivedColumns() {
    columns = [
      GeneralColumnString(
        t("company"),
        "companyName",
        true,
        130,
        visibility[TableColumns.NAME]
      ),
      GeneralColumnString(
        t("document"),
        "companyDocument",
        false,
        130,
        visibility[TableColumns.DOCUMENT]
      ),
      GeneralDateColumn(
        t("date"),
        "creationDate",
        visibility[TableColumns.CREATION_DATE]
      ),
      StateColumn(props.content.type, visibility[TableColumns.STATE]),
      ViewColumn(
        TableTypes.SENT_CERT,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }
}
