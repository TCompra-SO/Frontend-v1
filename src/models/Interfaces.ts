import React, { ReactNode } from "react";
import {
  Action,
  CountriesRequestType,
  ModalTypes,
  RequirementType,
  TableColumns,
  TableTypes,
  CommonFilter,
  OrderTableType,
  CodeResponseCanOffer,
  Filters,
  SocketChangeType,
  RTNotificationType,
  ChatMessageType,
  RequirementDetailType,
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
  BasicPurchaseOrder,
  CertificateFile,
  CertificationItem,
  BasicRateData,
  SubUserBase,
  SocketChatMessage,
  NotificationDataFromServer,
  NotificationTargetData,
  ChatMessage,
  ChatListData,
} from "./MainInterfaces";
import useApi, { UseApiType } from "../hooks/useApi";
import { FieldSort } from "./Requests";
import { ColumnFilterItem } from "antd/lib/table/interface";

export interface FilterNames {
  location: string;
  deliveryTime: string;
}

/******** Modals *******/

export interface CommonModalType {
  title?: React.ReactNode;
  type: ModalTypes;
  action: Action;
}

export interface ModalCancelPurchaseOrder extends CommonModalType {
  type: ModalTypes.CANCEL_PURCHASE_ORDER;
  data: {
    offerId: string;
    requirementId: string;
    fromRequirementTable: boolean;
    canceledByCreator: boolean;
    onCancelSuccess?: (offerId: string) => void;
    rowId: string;
    type: RequirementType;
    notificationTargetData: NotificationTargetData;
    requirementTitle: string;
  };
}

export interface ModalDetailedRequirement extends CommonModalType {
  type: ModalTypes.DETAILED_REQUIREMENT;
  data: {
    offerList: Offer[];
    requirement: Requirement;
    type: RequirementDetailType;
    filters?: OfferFilters;
    orderId?: string;
  };
  selectOffer?: {
    setDataModalSelectOffer: (val: ModalContent) => void;
    setIsOpenModalSelectOffer: (val: boolean) => void;
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
    requirementOrOfferId: string;
    rowId: string;
    requirementOrOfferTitle: string;
    onSuccess?: (id: string) => void;
    onExecute?: (id: string) => void;
    onError?: (id: string) => void;
  };
}

export interface ModalRateUser extends CommonModalType {
  type: ModalTypes.RATE_USER;
  data: {
    basicRateData: BasicRateData;
    type: RequirementType;
    isOffer: boolean;
    requirementOrOfferId: string;
    requirementOrOfferTitle: string;
    rowId: string;
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
    filters: OfferFilters;
    filterNames: FilterNames;
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
    id?: string;
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
    showActions: boolean;
    orderData?: { id: string; type: RequirementType };
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
  data: {
    text: string;
  };
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
    onRequestSent?: () => void;
    setLoading?: (val: boolean) => void;
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
    title: string;
    type: RequirementType;
    receiverImage?: string;
    receiverName: string;
    receiverId: string;
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
}

/********** Tables *************/

export interface TableHiddenColumns {
  total?: number;
  page?: number;
  pageSize?: number;
  fieldSort?: FieldSort;
  filteredInfo?: Filters;
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
  subType: OrderTableType;
  data: PurchaseOrder[];
}

export interface TableTypeSalesOrder extends TableHiddenColumns {
  type: TableTypes.SALES_ORDER;
  subType: OrderTableType;
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
  subType: OrderTableType;
  data: PurchaseOrderItemSubUser[];
}

export interface TableTypeSalesOrderSubUser extends TableHiddenColumns {
  type: TableTypes.SALES_ORDER_SUBUSER;
  subType: OrderTableType;
  data: PurchaseOrderItemSubUser[];
}

export interface TableTypeAllRequirements extends TableHiddenColumns {
  type: TableTypes.ALL_REQUIREMENTS;
  data: BasicRequirement[];
  subType: RequirementType;
}

export interface TableTypeAllOffers extends TableHiddenColumns {
  type: TableTypes.ALL_OFFERS;
  data: Offer[];
}

export interface TableTypeAllPurchaseOrders extends TableHiddenColumns {
  type: TableTypes.ALL_PURCHASE_ORDERS;
  subType: OrderTableType;
  data: BasicPurchaseOrder[];
}

export interface TableTypeAllSalesOrders extends TableHiddenColumns {
  type: TableTypes.ALL_SALES_ORDERS;
  subType: OrderTableType;
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
  cookieAllowed: boolean;
}

export interface useApiParams<T = any> {
  service: HttpService | null | undefined;
  method: "get" | "post" | "put" | "delete";
  dataToSend?: T;
  token?: string;
  includeHeader?: boolean;
}

export interface CountryObj {
  country: string;
  cities?: string[];
}

export interface IdValueObj {
  id: number;
  value: string;
}

export interface CategoryIdValueObj extends IdValueObj {
  parentId: number;
  parentName: string;
}

export interface IdValueAliasObj extends IdValueObj {
  alias: string;
}

export interface IdValue {
  value: string;
}

export interface IdValueMap {
  [id: number]: IdValue;
}

export interface CategoryIdValue extends IdValue {
  parentId: number;
  parentName: string;
  icon?: string;
  parentIcon?: string;
}

export interface CategoryIdValueMap {
  [id: number]: CategoryIdValue;
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

export interface RequiredDocsForCert {
  name: string;
  uid: string;
  requiredDocuments: string;
}

export interface SystemNotificationData {
  type: "success" | "error" | "info" | "warning";
  description: string | null;
}

export interface CommonModalProps {
  useApiHook: ReturnType<typeof useApi>;
  setApiParams: (params: useApiParams) => void;
  setAdditionalApiParams: (additionalParams: UseApiType) => void;
  apiParams: useApiParams;
}

export interface MainFilters {
  keywords: string;
  location: number;
  category: number;
  startDate: string;
  endDate: string;
  companyId: string;
}

export interface SocketDataPack {
  // code: number;
  data: Record<string, any>[];
  // res: Record<string, any>;
  // success: boolean;
}

export interface SocketResponse {
  typeSocket: SocketChangeType;
  dataPack: SocketDataPack;
  key: string;
  userId: string;
}

export interface FieldValueI {
  field: string;
  value: any;
}

export type SocketDataPackType = SocketResponse["dataPack"]["data"][number];

export interface PaginationDataResponse {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface StrictColumnFilterItem extends ColumnFilterItem {
  value: React.Key;
  children?: StrictColumnFilterItem[];
}

export interface RealTimeNotificationData {
  type: RTNotificationType.NOTIFICATION;
  content: NotificationDataFromServer;
  onClickCallback: (notification: NotificationDataFromServer) => void;
}

export interface RealTimeChatData {
  type: RTNotificationType.CHAT;
  content: SocketChatMessage;
  onClickCallback: (notification: SocketChatMessage) => void;
}

export type ShowRealTimeNotificationParams =
  | RealTimeNotificationData
  | RealTimeChatData;

export interface SelectOfferResponse {
  offerUID: string;
  purchaseOrderUID?: string;
  saleOrderUID?: string;
}

export interface LoginResponse {
  dataUser: {
    CompanyID?: string;
    email: string;
    name: string;
    planID: string;
    type: string;
    typeID: number;
    uid: string;
    lastSession: string;
    premium: boolean;
  }[];
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export interface NotificationSearchData {
  categoryId: number;
  targetType: RequirementType;
}

export interface RefreshAccessTokenResponse {
  expiresIn: number;
}

export interface RefreshRefreshTokenResponse {
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export interface ChatMessageRead {
  endMessageId: string;
}

export interface NewMessageSingleChatSocketResponse {
  messageData: ChatMessage;
  type: ChatMessageType.NEW_MESSAGE;
}

export interface MessageReadSingleChatSocketResponse {
  numUnreadMessages: number;
  res: ChatMessageRead;
  type: ChatMessageType.READ;
}

export type SingleChatSocketResponse =
  | NewMessageSingleChatSocketResponse
  | MessageReadSingleChatSocketResponse;

export interface NewMessageGeneralChatSocketResponse {
  chatData: ChatListData[];
  messageData: ChatMessage;
  numUnreadMessages: number;
  type: ChatMessageType.NEW_MESSAGE;
}

export interface MessageReadGeneralChatSocketResponse {
  numUnreadMessages: number;
  type: ChatMessageType.READ;
}

export type GeneralChatSocketResponse =
  | NewMessageGeneralChatSocketResponse
  | MessageReadGeneralChatSocketResponse;
