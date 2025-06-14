import { Table, TableProps } from "antd";
import {
  OnChangePageAndPageSizeType,
  OrderTableType,
  TableColumns,
  TableTypes,
} from "../../../utilities/types";
import {
  certDocDateColumnKey,
  subUserCreationDateColumnKey,
  documentNameColumnKey,
  emailColumnKey,
  numGoodsColumnKey,
  numSalesColumnKey,
  numServicesColumnKey,
  offerDateColumnKey,
  offersColumnKey,
  pageSizeOptionsSt,
  purcOrderDateColumnKey,
  purcOrderOfferTitleColumnKey,
  purcOrderReqTitleColumnKey,
  reqDateColumnKey,
  reqExpDateColumnKey,
  requirementColumnKey,
  titleColumnKey,
  userNameColumnKey,
  companyNameColumnName,
  companyDocumentColumnName,
  certRequestCreationDateColumnKey,
} from "../../../utilities/globals";
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
  // OfferItemSubUser,
  // Offer,
  // PurchaseOrder,
  // PurchaseOrderItemSubUser,
  // RequirementItemSubUser,
  Requirement,
  // BasicRequirement,
  // BasicOffer,
  // BasicPurchaseOrder,
  // BaseRequirementOffer,
  // CertificateFile,
  // CertificationItem,
  // SubUserBase,
  // KeyInterface,
} from "../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import GeneralColumnString from "./columns/GeneralColumnString";
import GeneralColumnNumber from "./columns/GeneralColumnNumber";
import TypeColumn from "./columns/TypeColumn";
import ViewColumn from "./columns/ViewColumn";
import DocumentColumn from "./columns/DocumentColumn";
import { useNavigate } from "react-router-dom";
import RequirementInfo from "../modals/requirementDetail/RequirementInfo";
import { useState } from "react";
import { getProductDetailRoute } from "../../../utilities/globalFunctions";
import { ColumnsType } from "antd/lib/table";
import { AnyObject } from "antd/es/_util/type";

interface GeneralTableProps {
  content: TableType;
  loading?: boolean;
  onRowAction?: boolean;
  onChangePageAndPageSize?: OnChangePageAndPageSizeType;
  total?: number;
}

export default function GeneralTable(props: GeneralTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageSizeOptions = pageSizeOptionsSt;

  // let columns1:
  //   | ColumnsType<KeyInterface>
  //   | ColumnsType<Offer>
  //   | ColumnsType<Requirement>
  //   | ColumnsType<PurchaseOrder>
  //   | ColumnsType<BasicOffer>
  //   | ColumnsType<BasicRequirement>
  //   | ColumnsType<BasicPurchaseOrder>
  //   | ColumnsType<SubUserBase>
  //   | ColumnsType<RequirementItemSubUser>
  //   | ColumnsType<CertificateFile>
  //   | ColumnsType<CertificationItem>
  //   | ColumnsType<SubUserBase | Requirement>
  //   | ColumnsType<Offer | Requirement>
  //   | ColumnsType<Offer | PurchaseOrder>
  //   | ColumnsType<PurchaseOrderItemSubUser | PurchaseOrder>
  //   | ColumnsType<Offer | PurchaseOrder | Requirement>
  //   | ColumnsType<Offer | Requirement | SubUserBase>
  //   | ColumnsType<Offer | PurchaseOrder | SubUserBase>
  //   | ColumnsType<Offer | PurchaseOrder | Requirement | SubUserBase>
  //   | ColumnsType<Offer | Requirement | RequirementItemSubUser>
  //   | ColumnsType<SubUserBase | PurchaseOrder | BaseRequirementOffer>
  //   | ColumnsType<Requirement | Offer | PurchaseOrder | RequirementItemSubUser>
  //   | ColumnsType<
  //       RequirementItemSubUser | OfferItemSubUser | PurchaseOrderItemSubUser
  //     >
  //   | ColumnsType<
  //       | Requirement
  //       | Offer
  //       | PurchaseOrder
  //       | RequirementItemSubUser
  //       | OfferItemSubUser
  //       | PurchaseOrderItemSubUser
  //     >
  //   | ColumnsType<
  //       | Requirement
  //       | Offer
  //       | PurchaseOrder
  //       | RequirementItemSubUser
  //       | OfferItemSubUser
  //       | PurchaseOrderItemSubUser
  //       | BasicRequirement
  //       | BasicOffer
  //       | BasicPurchaseOrder
  //     >
  //   | ColumnsType<
  //       | SubUserBase
  //       | BaseRequirementOffer
  //       | BasicPurchaseOrder
  //       | CertificateFile
  //     >
  //   | ColumnsType<
  //       | Requirement
  //       | Offer
  //       | PurchaseOrder
  //       | RequirementItemSubUser
  //       | OfferItemSubUser
  //       | PurchaseOrderItemSubUser
  //       | BasicRequirement
  //       | BasicOffer
  //       | BasicPurchaseOrder
  //       | CertificationItem
  //     >
  //   | ColumnsType<
  //       | Requirement
  //       | Offer
  //       | PurchaseOrder
  //       | RequirementItemSubUser
  //       | OfferItemSubUser
  //       | PurchaseOrderItemSubUser
  //       | BasicRequirement
  //       | BasicOffer
  //       | BasicPurchaseOrder
  //       | CertificationItem
  //       | SubUserBase
  //     > = [];

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
    onChange: (pagination, filters, sorter, extra) => {
      if (
        props.onChangePageAndPageSize &&
        pagination.current &&
        pagination.pageSize
      )
        props.onChangePageAndPageSize({
          page: pagination.current,
          pageSize: pagination.pageSize,
          filters,
          sorter,
          extra,
        });
    },
    pagination: {
      pageSizeOptions,
      showSizeChanger: props.content.type != TableTypes.HOME,
      // onChange: props.onChangePageAndPageSize,
      total: props.total ?? props.content.total,
      showTotal: (total, range) => {
        return `${range[0]}-${range[0] + props.content.data.length - 1} ${t(
          "of"
        )} ${total} ${t("items")}`;
      },
      current: props.content.page,
    },
  };

  switch (props.content.type) {
    case TableTypes.HOME: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
      const columns = getHomeTableColumns();
      return (
        <Table
          onRow={
            props.onRowAction
              ? (record: AnyObject) => {
                  const rec = record as Requirement;
                  return {
                    onClick: () =>
                      navigate(getProductDetailRoute(rec.key, rec.type)),
                  };
                }
              : undefined
          }
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          expandable={{
            expandedRowRender: (record) => {
              const rec = record as Requirement;
              return <RequirementInfo requirement={rec} forHome />;
            },
            expandRowByClick: true,
            showExpandColumn: false,
            onExpand: (expanded, record) => {
              setExpandedRowKey(expanded ? record.key : null);
            },
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          }}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.REQUIREMENT: {
      const columns = getRequirementTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.OFFER: {
      const columns = getOfferTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.PURCHASE_ORDER:
    case TableTypes.SALES_ORDER: {
      const columns = getPurchaseOrderTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.USERS: {
      const columns = getUsersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.REQUIREMENT_SUBUSER: {
      const columns = getRequirementSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.OFFER_SUBUSER: {
      const columns = getOfferSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.PURCHASE_ORDER_SUBUSER:
    case TableTypes.SALES_ORDER_SUBUSER: {
      const columns = getPurchaseOrderSubUserColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.ALL_REQUIREMENTS: {
      const columns = getAllRequirementsTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.ALL_OFFERS: {
      const columns = getAllOffersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.ALL_PURCHASE_ORDERS:
    case TableTypes.ALL_SALES_ORDERS: {
      const columns = getAllPurchaseOrdersTableColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.MY_DOCUMENTS: {
      const columns = getMyDocumentsCertificateColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.SENT_CERT: {
      const columns = getCertificatesSentColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
    case TableTypes.RECEIVED_CERT: {
      const columns = getCertificatesReceivedColumns();
      return (
        <Table
          dataSource={props.content.data}
          loading={props.loading}
          columns={columns as ColumnsType<AnyObject>}
          {...tableProps}
        ></Table>
      );
    }
  }

  function getRequirementTableColumns() {
    const columns = [
      ImageColumn(false, visibility[TableColumns.IMAGE]),
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      CategoryColumn(visibility[TableColumns.CATEGORY]),
      LocationColumn(
        visibility[TableColumns.LOCATION],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        reqDateColumnKey,
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      OffersColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.OFFERS],
        props.content.fieldSort
      ),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getOfferTableColumns() {
    const columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      RequirementColumn(
        true,
        visibility[TableColumns.REQUIREMENT],
        props.content.fieldSort
      ),
      LocationColumn(
        visibility[TableColumns.LOCATION],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        offerDateColumnKey,
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ActionColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.ACTION]
      ),
    ];
    return columns;
  }

  function getPurchaseOrderTableColumns() {
    if (
      props.content.type == TableTypes.PURCHASE_ORDER ||
      props.content.type == TableTypes.SALES_ORDER
    ) {
      const columns = [
        NameColumn(
          props.content.type,
          props.content.nameColumnHeader,
          visibility[TableColumns.NAME],
          props.content.fieldSort,
          props.content.subType
        ),
        GeneralColumnString(
          t(
            props.content.subType == OrderTableType.ISSUED
              ? props.content.type == TableTypes.PURCHASE_ORDER
                ? "myRequirement"
                : "mySale"
              : "myOffer"
          ),
          props.content.subType == OrderTableType.ISSUED
            ? purcOrderReqTitleColumnKey
            : purcOrderOfferTitleColumnKey,
          true,
          130,
          visibility[TableColumns.REQUIREMENT],
          props.content.fieldSort
        ),
        GeneralDateColumn(
          t("dateColumn"),
          purcOrderDateColumnKey,
          visibility[TableColumns.SELECTION_DATE],
          props.content.fieldSort
        ),
        StateColumn(
          props.content.type,
          visibility[TableColumns.STATE],
          props.content.filteredInfo,
          props.content.subType
        ),
        ActionColumn(
          props.content.type,
          props.content.onButtonClick,
          visibility[TableColumns.ACTION],
          props.content.subType
        ),
      ];
      if (props.content.type == TableTypes.PURCHASE_ORDER)
        columns.splice(3, 0, TypeColumn(visibility[TableColumns.TYPE]));
      return columns;
    }
    return [];
  }

  function getAllRequirementsTableColumns() {
    const columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("user"),
        userNameColumnKey,
        true,
        undefined,
        visibility[TableColumns.USERNAME],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        reqDateColumnKey,
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort
      ),
      // CategoryColumn(props.content.type, visibility[TableColumns.CATEGORY]),
      LocationColumn(
        visibility[TableColumns.LOCATION],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      // OffersColumn(
      //   props.content.type,
      //   props.content.onButtonClick,
      //   visibility[TableColumns.OFFERS]
      // ),
      GeneralColumnNumber(
        t("offers"),
        offersColumnKey,
        visibility[TableColumns.OFFERS],
        92,
        props.content.fieldSort
      ),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ViewColumn(
        TableTypes.ALL_REQUIREMENTS,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getAllOffersTableColumns() {
    const columns = [
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("user"),
        userNameColumnKey,
        true,
        undefined,
        visibility[TableColumns.USERNAME],
        props.content.fieldSort
      ),
      RequirementColumn(
        true,
        visibility[TableColumns.REQUIREMENT],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        offerDateColumnKey,
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ViewColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getAllPurchaseOrdersTableColumns() {
    if (
      props.content.type == TableTypes.ALL_PURCHASE_ORDERS ||
      props.content.type == TableTypes.ALL_SALES_ORDERS
    ) {
      const columns = [
        NameColumn(
          props.content.type,
          props.content.nameColumnHeader,
          visibility[TableColumns.NAME],
          props.content.fieldSort,
          props.content.subType
        ),
        GeneralColumnString(
          t(
            props.content.type == TableTypes.ALL_PURCHASE_ORDERS
              ? "requirement"
              : "sale"
          ),
          purcOrderReqTitleColumnKey,
          true,
          130,
          visibility[TableColumns.REQUIREMENT],
          props.content.fieldSort
        ),
        GeneralColumnString(
          t("offer"),
          purcOrderOfferTitleColumnKey,
          true,
          130,
          visibility[TableColumns.OFFER],
          props.content.fieldSort
        ),
        GeneralDateColumn(
          t("dateColumn"),
          purcOrderDateColumnKey,
          visibility[TableColumns.PUBLISH_DATE],
          props.content.fieldSort
        ),
        DocumentColumn(
          props.content.type,
          props.content.onButtonClick,
          visibility[TableColumns.DOCUMENT]
        ),
        StateColumn(
          props.content.type,
          visibility[TableColumns.STATE],
          props.content.filteredInfo,
          props.content.subType
        ),
        ViewColumn(
          props.content.type,
          props.content.onButtonClick,
          visibility[TableColumns.VIEW]
        ),
      ];
      if (props.content.type == TableTypes.ALL_PURCHASE_ORDERS)
        columns.splice(4, 0, TypeColumn(visibility[TableColumns.TYPE]));
      return columns;
    }
    return [];
  }

  function getUsersTableColumns() {
    const columns = [
      // ImageColumn(true, visibility[TableColumns.IMAGE]),
      NameColumn(
        props.content.type,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("email"),
        emailColumnKey,
        true,
        130,
        visibility[TableColumns.EMAIL],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("creationDateAbbrev"),
        subUserCreationDateColumnKey,
        visibility[TableColumns.CREATION_DATE],
        props.content.fieldSort
      ),
      GeneralColumnNumber(
        t("goods"),
        numGoodsColumnKey,
        visibility[TableColumns.GOODS],
        85,
        props.content.fieldSort
      ),
      GeneralColumnNumber(
        t("services"),
        numServicesColumnKey,
        visibility[TableColumns.SERVICES],
        85,
        props.content.fieldSort
      ),
      GeneralColumnNumber(
        t("sales"),
        numSalesColumnKey,
        visibility[TableColumns.SALES],
        85,
        props.content.fieldSort
      ),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
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
    const columns = [
      GeneralColumnString(
        t("title"),
        titleColumnKey,
        true,
        130,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      GeneralDateColumn(
        t("publishDateAbbrev"),
        reqDateColumnKey,
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("expirationDateAbbrev"),
        reqExpDateColumnKey,
        visibility[TableColumns.EXPIRATION_DATE],
        props.content.fieldSort
      ),
      GeneralColumnNumber(
        t("offers"),
        offersColumnKey,
        visibility[TableColumns.OFFERS],
        92,
        props.content.fieldSort
      ),
      StateColumn(
        TableTypes.REQUIREMENT_SUBUSER,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
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
    const columns = [
      GeneralColumnString(
        t("title"),
        titleColumnKey,
        true,
        130,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("requirement"),
        requirementColumnKey,
        true,
        130,
        visibility[TableColumns.REQUIREMENT],
        props.content.fieldSort
      ),
      PriceColumn(visibility[TableColumns.PRICE], props.content.fieldSort),
      GeneralDateColumn(
        t("dateColumn"),
        offerDateColumnKey,
        visibility[TableColumns.SELECTION_DATE],
        props.content.fieldSort
      ),
      StateColumn(
        TableTypes.OFFER_SUBUSER,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ViewColumn(
        TableTypes.OFFER_SUBUSER,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getPurchaseOrderSubUserColumns() {
    if (
      props.content.type == TableTypes.PURCHASE_ORDER_SUBUSER ||
      props.content.type == TableTypes.SALES_ORDER_SUBUSER
    ) {
      const columns = [
        GeneralColumnString(
          t("requirement"),
          requirementColumnKey,
          true,
          130,
          visibility[TableColumns.REQUIREMENT],
          props.content.fieldSort
        ),
        GeneralColumnString(
          t("offer"),
          purcOrderOfferTitleColumnKey,
          true,
          130,
          visibility[TableColumns.OFFER],
          props.content.fieldSort
        ),
        GeneralDateColumn(
          t("dateColumn"),
          purcOrderDateColumnKey,
          visibility[TableColumns.SELECTION_DATE],
          props.content.fieldSort
        ),
        DocumentColumn(
          props.content.type,
          props.content.onButtonClick,
          visibility[TableColumns.DOCUMENT]
        ),
        StateColumn(
          TableTypes.PURCHASE_ORDER_SUBUSER,
          visibility[TableColumns.STATE],
          props.content.filteredInfo,
          props.content.subType
        ),
        ViewColumn(
          TableTypes.PURCHASE_ORDER_SUBUSER,
          props.content.onButtonClick,
          visibility[TableColumns.VIEW]
        ),
      ];
      if (props.content.type == TableTypes.PURCHASE_ORDER_SUBUSER)
        columns.splice(3, 0, TypeColumn(visibility[TableColumns.TYPE]));
      return columns;
    }
    return [];
  }

  function getMyDocumentsCertificateColumns() {
    const columns = [
      NameColumn(
        props.content.type,
        t("name"),
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("document"),
        documentNameColumnKey,
        true,
        130,
        visibility[TableColumns.DOCUMENT],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        certDocDateColumnKey,
        visibility[TableColumns.CREATION_DATE],
        props.content.fieldSort
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
    const columns = [
      GeneralColumnString(
        t("company"),
        companyNameColumnName,
        true,
        130,
        visibility[TableColumns.NAME],
        props.content.fieldSort
      ),
      GeneralColumnString(
        t("document"),
        companyDocumentColumnName,
        false,
        130,
        visibility[TableColumns.DOCUMENT],
        props.content.fieldSort
      ),
      GeneralDateColumn(
        t("dateColumn"),
        certRequestCreationDateColumnKey,
        visibility[TableColumns.CREATION_DATE],
        props.content.fieldSort
      ),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ViewColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }
  function getCertificatesReceivedColumns() {
    const columns = [
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
        t("dateColumn"),
        "creationDate",
        visibility[TableColumns.CREATION_DATE],
        props.content.fieldSort
      ),
      StateColumn(
        props.content.type,
        visibility[TableColumns.STATE],
        props.content.filteredInfo
      ),
      ViewColumn(
        props.content.type,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }

  function getHomeTableColumns() {
    const columns = [
      ImageColumn(false, visibility[TableColumns.IMAGE]),
      NameColumn(
        TableTypes.REQUIREMENT,
        props.content.nameColumnHeader,
        visibility[TableColumns.NAME],
        props.content.fieldSort,
        null,
        true
      ),
      CategoryColumn(visibility[TableColumns.CATEGORY]),
      LocationColumn(
        visibility[TableColumns.LOCATION],
        props.content.fieldSort,
        true
      ),
      GeneralDateColumn(
        t("dateColumn"),
        "publishDate",
        visibility[TableColumns.PUBLISH_DATE],
        props.content.fieldSort,
        true
      ),
      PriceColumn(
        visibility[TableColumns.PRICE],
        props.content.fieldSort,
        true
      ),
      OffersColumn(
        TableTypes.HOME,
        props.content.onButtonClick,
        visibility[TableColumns.OFFERS],
        props.content.fieldSort,
        true
      ),
      ViewColumn(
        TableTypes.REQUIREMENT,
        props.content.onButtonClick,
        visibility[TableColumns.VIEW]
      ),
    ];
    return columns;
  }
}
