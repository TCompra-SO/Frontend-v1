import React, { ReactNode } from "react";
import {
  Action,
  CountriesRequestType,
  ModalTypes,
  RequirementType,
  TableColumns,
  TableTypes,
  CommonFilter,
  PurchaseOrderTableTypes,
  CodeResponseCanOffer,
} from "../utilities/types";
import {
  OfferItemSubUser,
  Offer,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  Requirement,
  User,
  FullUser,
  BasicRequirement,
  BasicOffer,
  BasicPurchaseOrder,
  CertificateFile,
  CertificationItem,
  BasicRateData,
  SubUserBase,
} from "./MainInterfaces";

/******** Modals *******/

export interface CommonModalType {
  title?: React.ReactNode;
  type: ModalTypes;
}

export interface ModalCancelPurchaseOrder extends CommonModalType {
  type: ModalTypes.CANCEL_PURCHASE_ORDER;
  data: {
    offerId: string;
    requirementId: string;
    fromRequirementTable: boolean;
    canceledByCreator: boolean;
    onCancelSuccess?: (offerId: string) => void;
  };
}

export interface ModalDetailedRequirement extends CommonModalType {
  type: ModalTypes.DETAILED_REQUIREMENT;
  data: {
    offerList: Offer[];
    requirement: Requirement;
    forPurchaseOrder: boolean;
    filters?: OfferFilters;
  };
}

export interface ModalOfferSummary extends CommonModalType {
  type: ModalTypes.OFFER_SUMMARY;
  data: { offer: Offer; requirement: Requirement; user: User };
}

export interface ModalRateCanceled extends CommonModalType {
  type: ModalTypes.RATE_CANCELED;
  data: {
    basicRateData: BasicRateData;
    type: RequirementType;
    isOffer: boolean;
    requirementOrOfferId?: string;
  };
}

export interface ModalRateUser extends CommonModalType {
  type: ModalTypes.RATE_USER;
  data: {
    basicRateData: BasicRateData;
    type: RequirementType;
    isOffer: boolean;
    requirementOrOfferId: string;
  };
}

export interface ModalRepublishRequirement extends CommonModalType {
  type: ModalTypes.REPUBLISH_REQUIREMENT;
  data: { requirementId: string; type: RequirementType };
}

export interface ModalSelectOffer extends CommonModalType {
  type: ModalTypes.SELECT_OFFER;
  data: {
    offer: Offer;
    requirement: Requirement;
    onSuccess: (offerId: string) => void;
  };
}

export interface ModalValidateCode extends CommonModalType {
  type: ModalTypes.VALIDATE_CODE;
  data: Record<string, never>;
}

export interface ModalConfirmation extends CommonModalType {
  type: ModalTypes.CONFIRM;
  data: {
    text: string;
    icon?: ReactNode;
    onAnswer: (ok: boolean) => void;
    loading?: boolean;
    showOnlyAcceptButton?: boolean;
  };
}

export interface ModalInputEmail extends CommonModalType {
  type: ModalTypes.INPUT_EMAIL;
  data: {
    text?: ReactNode;
    onAnswer: (email: string) => void;
    buttonText?: ReactNode;
  };
}

export interface ModalOfferDetail extends CommonModalType {
  type: ModalTypes.OFFER_DETAIL;
  data: {
    offer: Offer;
    basicRateData: BasicRateData;
  };
}

export interface ModalUserInfo extends CommonModalType {
  type: ModalTypes.USER_INFO;
  data: {
    user: FullUser;
  };
}

export interface ModalAddCertificates extends CommonModalType {
  type: ModalTypes.ADD_CERTIFICATES;
  data?: {
    onDocumentAdded: () => void;
  };
}

export interface ModalEditDocumentListToRequest extends CommonModalType {
  type: ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST;
}

export interface ModalViewDocsReceivedCert extends CommonModalType {
  type: ModalTypes.VIEW_DOCS_RECEIVED_CERT;
  data: {
    docs: CertificateFile[];
    data: CertificationItem;
    readonly?: boolean;
  };
}

export interface ModalViewDocsSentCert extends CommonModalType {
  type: ModalTypes.VIEW_DOCS_SENT_CERT;
  data: {
    docs: CertificateFile[];
    data: CertificationItem;
    readonly?: boolean;
  };
}

export interface ModalSelectDocsCert extends CommonModalType {
  type: ModalTypes.SELECT_DOCS_CERT;
  data: {
    data: SelectDocsModalData;
    certificationId?: string;
  };
}

export interface ModalNone extends CommonModalType {
  type: ModalTypes.NONE;
  data: Record<string, never>;
}

export interface ModalSendMessage extends CommonModalType {
  type: ModalTypes.SEND_MESSAGE;
  data: {
    requirementId: string;
    userId: string;
  };
}

export type ModalContent =
  | ModalValidateCode
  | ModalSelectOffer
  | ModalRepublishRequirement
  | ModalRateUser
  | ModalRateCanceled
  | ModalOfferSummary
  | ModalDetailedRequirement
  | ModalCancelPurchaseOrder
  | ModalConfirmation
  | ModalInputEmail
  | ModalOfferDetail
  | ModalUserInfo
  | ModalAddCertificates
  | ModalEditDocumentListToRequest
  | ModalViewDocsReceivedCert
  | ModalViewDocsSentCert
  | ModalSelectDocsCert
  | ModalSendMessage
  | ModalNone;

export interface SelectDocsModalData {
  userId: string;
  userName: string;
  text: string;
}

/********** Tables *************/

export interface TableHiddenColumns {
  hiddenColumns: TableColumns[];
  nameColumnHeader: string;
  onButtonClick: (action: Action, data: any) => void;
}

export interface TableTypeRequirement extends TableHiddenColumns {
  type: TableTypes.REQUIREMENT;
  subType: RequirementType;
  data: Requirement[];
  // onButtonClick: (action: Action, data: Requirement) => void;
}

export interface TableTypeOffer extends TableHiddenColumns {
  type: TableTypes.OFFER;
  subType: RequirementType;
  data: Offer[];
  // onButtonClick: (action: Action, data: Offer) => void;
}

export interface TableTypePurchaseOrder extends TableHiddenColumns {
  type: TableTypes.PURCHASE_ORDER;
  subType: PurchaseOrderTableTypes;
  data: PurchaseOrder[];
}

export interface TableTypeSalesOrder extends TableHiddenColumns {
  type: TableTypes.SALES_ORDER;
  subType: PurchaseOrderTableTypes;
  data: PurchaseOrder[];
}

export interface TableTypeUsers extends TableHiddenColumns {
  type: TableTypes.USERS;
  data: SubUserBase[];
}

export interface TableTypeRequirementSubUser extends TableHiddenColumns {
  type: TableTypes.REQUIREMENT_SUBUSER;
  data: RequirementItemSubUser[];
}

export interface TableTypeOfferSubUser extends TableHiddenColumns {
  type: TableTypes.OFFER_SUBUSER;
  data: OfferItemSubUser[];
}

export interface TableTypePurchaseOrderSubUser extends TableHiddenColumns {
  type: TableTypes.PURCHASE_ORDER_SUBUSER;
  subType: PurchaseOrderTableTypes;
  data: PurchaseOrderItemSubUser[];
}

export interface TableTypeSalesOrderSubUser extends TableHiddenColumns {
  type: TableTypes.SALES_ORDER_SUBUSER;
  subType: PurchaseOrderTableTypes;
  data: PurchaseOrderItemSubUser[];
}

export interface TableTypeAllRequirements extends TableHiddenColumns {
  type: TableTypes.ALL_REQUIREMENTS;
  data: BasicRequirement[];
}

export interface TableTypeAllOffers extends TableHiddenColumns {
  type: TableTypes.ALL_OFFERS;
  data: BasicOffer[];
}

export interface TableTypeAllPurchaseOrders extends TableHiddenColumns {
  type: TableTypes.ALL_PURCHASE_ORDERS;
  subType: PurchaseOrderTableTypes;
  data: BasicPurchaseOrder[];
}

export interface TableTypeAllSalesOrders extends TableHiddenColumns {
  type: TableTypes.ALL_SALES_ORDERS;
  subType: PurchaseOrderTableTypes;
  data: BasicPurchaseOrder[];
}

export interface TableTypeMyDocuments extends TableHiddenColumns {
  type: TableTypes.MY_DOCUMENTS;
  data: CertificateFile[];
}

export interface TableTypeCertificatesSent extends TableHiddenColumns {
  type: TableTypes.SENT_CERT;
  data: CertificationItem[];
}

export interface TableTypeCertificatesReceived extends TableHiddenColumns {
  type: TableTypes.RECEIVED_CERT;
  data: CertificationItem[];
}

export interface TableTypeHome extends TableHiddenColumns {
  type: TableTypes.HOME;
  subType: RequirementType;
  data: Requirement[];
}

export type TableType =
  | TableTypeRequirement
  | TableTypeOffer
  | TableTypePurchaseOrder
  | TableTypeSalesOrder
  | TableTypeUsers
  | TableTypeRequirementSubUser
  | TableTypeOfferSubUser
  | TableTypePurchaseOrderSubUser
  | TableTypeSalesOrderSubUser
  | TableTypeAllRequirements
  | TableTypeAllOffers
  | TableTypeAllPurchaseOrders
  | TableTypeAllSalesOrders
  | TableTypeMyDocuments
  | TableTypeCertificatesReceived
  | TableTypeCertificatesSent
  | TableTypeHome;

/********************* */

export interface HttpService {
  url: string;
  type: string;
}

export interface useApiParams<T = any> {
  service: HttpService | null;
  method: "get" | "post" | "put" | "delete";
  dataToSend?: T;
  token?: string;
}

export interface CountryObj {
  country: string;
  cities?: string[];
}

export interface IdValueObj {
  id: number;
  value: string;
}

export interface IdValueAliasObj extends IdValueObj {
  alias: string;
}

export interface IdValueMap {
  [id: number]: {
    value: string;
  };
}

export interface IdValueAliasMap {
  [id: number]: {
    value: string;
    alias: string;
  };
}

export interface CountryData {
  value: string;
  cities: IdValueObj[];
}

export type CountryCities = Record<string, CountryData>;

export interface CountriesRequest {
  verify: CountriesRequestType;
}

export interface StepsItemContent {
  key: string;
  title: string;
  status: "finish" | "wait" | "process" | "error" | undefined;
  icon: any;
  text: string;
  showInput: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface RequirementSearchItem {
  id: string;
  title: string;
}

export interface OfferFilters {
  price: CommonFilter;
  deliveryTime: number;
  location: number;
  warranty: CommonFilter;
}

export interface ListItem {
  key: string;
  value: string;
}

export interface CanOfferResponse {
  codeResponse: CodeResponseCanOffer;
  offerID?: string;
}
