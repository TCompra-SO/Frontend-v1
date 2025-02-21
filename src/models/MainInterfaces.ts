import {
  OfferState,
  PurchaseOrderState,
  RequirementState,
  RequirementType,
  TimeMeasurement,
  Usage,
  UserRoles,
  EntityType,
  PurchaseOrderTableTypes,
  CertificationState,
  OrderConfirmation,
  CanOfferType,
  Action,
} from "../utilities/types";
import { OfferFilters } from "./Interfaces";

export interface KeyInterface {
  key: string;
}

export interface BaseInterface extends KeyInterface {
  type: RequirementType;
}

export interface BaseRequirementOffer extends BaseInterface {
  title: string;
}

export interface RequirementItemSubUser extends BaseRequirementOffer {
  price: number;
  publishDate: string;
  expirationDate: string;
  numberOffers: number;
  state: RequirementState;
  coin: number;
}

export interface BasicRequirement extends RequirementItemSubUser {
  user?: BaseUser;
  subUser?: BaseUser;
  category: number;
  location: number;
  offerId?: string;
  offerUserId?: string;
  offerSubUserId?: string;
  userName: string;
  subUserName: string;
}

export interface Requirement extends BasicRequirement {
  user: BaseUser;
  description: string;
  image?: string[];
  document?: string[];
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  used?: Usage;
  deliveryTime: number;
  paymentMethod: number;
  allowedBidder: CanOfferType[];
}

export interface OfferItemSubUser extends BaseRequirementOffer {
  requirementTitle: string;
  price: number;
  publishDate: string;
  state: OfferState;
  coin: number;
}

export interface BasicOffer extends OfferItemSubUser {
  user: BaseUser;
  subUser?: BaseUser;
  requirementId: string;
}

export interface Offer extends BasicOffer {
  description?: string;
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  deliveryTime: number;
  location: number;
  image?: string[];
  document?: string[];
  selectionDate?: string;
  igv?: boolean;
  deliveryDate?: string;
  delivered?: boolean;
  canceledByCreator?: boolean;
  includesDelivery?: boolean;
  cancelRated?: boolean;
}

export interface BasicPurchaseOrderItemSubUser extends BaseInterface {
  requirementTitle: string;
  offerTitle: string;
  selectionDate: string;
  state: PurchaseOrderState;
  requirementId: string;
  offerId: string;
}

export interface PurchaseOrderItemSubUser
  extends BasicPurchaseOrderItemSubUser {
  subType: PurchaseOrderTableTypes;
  filters: OfferFilters;
}

export interface BasicPurchaseOrder extends BasicPurchaseOrderItemSubUser {
  userClientId: string;
  userNameClient: string;
  subUserClientId: string;
  subUserNameClient: string;
  addressClient: string;
  documentClient: string;

  userProviderId: string;
  userNameProvider: string;
  subUserProviderId: string;
  subUserNameProvider: string;
  addressProvider: string;
  documentProvider: string;
  emailProvider: string;

  deliveryDate: string;
  price: number;
  subTotal: number;
  igv: number;
  total: number;

  clientConfirmation: OrderConfirmation;
  providerConfirmation: OrderConfirmation;
}

export interface PurchaseOrder extends BasicPurchaseOrder {
  filters?: OfferFilters;
}

export interface DisplayUser {
  uid: string;
  name: string;
  document: string;
  image?: string;
}

export interface BaseUser extends DisplayUser {
  email: string;
  tenure?: number;
  customerScore?: number;
  sellerScore?: number;
  customerCount?: number;
  sellerCount?: number;
  typeEntity: EntityType;
}

export interface User extends BaseUser {
  address: string;
  phone: string;
}

export interface FullUser extends User {
  categories: number[];
  typeID: UserRoles;
  activeAccount: boolean;
  cityID: number;
  countryID: number;
  planID: number;
  specialty?: string;
  aboutMe?: string;
  numGoods: number;
  numServices: number;
  numSales: number;
  numOffers: number;
  numPurchaseOrdersProvider: number;
  numPurchaseOrdersClient: number;
  numSellingOrdersProvider: number;
  numSellingOrdersClient: number;
}

export interface SubUserBase extends BaseUser {
  typeID: UserRoles;
  createdAt: string;
  numGoods: number;
  numServices: number;
  numSales: number;
  numOffers: number;
  numPurchaseOrdersProvider: number;
  numPurchaseOrdersClient: number;
  numSellingOrdersProvider: number;
  numSellingOrdersClient: number;
}

export interface SubUserProfile extends SubUserBase {
  address: string;
  cityID: number;
  companyID: string;
  phone: string;
}

export interface CertificateFile extends KeyInterface {
  name: string;
  documentName: string;
  url: string;
  creationDate: string;
}

export interface CertificationItem extends KeyInterface {
  companyId: string;
  companyName: string;
  companyDocument: string;
  creationDate: string;
  state: CertificationState;
  note?: string;
  certificates: CertificateFile[];
}

export interface StatisticsData {
  numProducts: number;
  numServices: number;
  numLiquidations: number;
  numOffersProducts: number;
  numOffersServices: number;
  numOffersLiquidations: number;
  numPurchaseOrdersClient: number;
  numPurchaseOrdersProvider: number;
  numSellingOrdersProvider: number;
  numSellingOrdersClient: number;
  numSentApprovedCertifications: number;
  numReceivedApprovedCertifications: number;
  numSubUsers: number;
}

export interface PlanData {
  goods: number;
  services: number;
  sales: number;
  offers: number;
}

export interface BasicRateData {
  uid: string;
  title: string;
  userId: string;
  userName: string;
  userImage?: string;
  subUserId?: string;
  subUserName?: string;
}

export interface ChatListData {
  uid: string;
  userImage?: string;
  userName: string;
  userOnline?: boolean;
  userId: string;
  title: string;
  requirementId: string;
  lastMessage: string;
  lastDate: string;
  numUnreadMessages?: number;
}

export interface ChatMessage {
  chatId: string;
  uid: string;
  userId: string;
  message?: string;
  timestamp: string;
  read: boolean;
  images?: string[];
  documents?: string[];
}

export interface ChatSocketData extends ChatMessage {
  userImage?: string;
  userName: string;
}

export interface NotificationData {
  uid: string;
  title: string;
  body: string;
  date: string;
  time: string;
  senderImage?: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  action: Action;
  targetId: string;
  targetType: RequirementType | PurchaseOrderTableTypes;
}
