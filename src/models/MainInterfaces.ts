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
} from "../utilities/types";
import { OfferFilters } from "./Interfaces";

export interface BaseInterface {
  key: string;
  type: RequirementType;
}

export interface BaseRequirementOffer extends BaseInterface {
  title: string;
}

export interface BasicRequirement extends BaseRequirementOffer {
  user: BaseUser;
  subUser?: BaseUser;
  publishDate: string;
  category: number;
  location: number;
  coin: number;
  price: number;
  numberOffers: number;
  state: RequirementState;
  offerId?: string;
  offerUserId?: string;
  offerSubUserId?: string;
}

export interface Requirement extends BasicRequirement {
  description: string;
  expirationDate: string;
  image?: string[];
  document?: string[];
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  used?: Usage;
  deliveryTime: number;
  paymentMethod: number;
  allowedBidder: number;
}

export interface BasicOffer extends BaseRequirementOffer {
  user: BaseUser;
  subUser?: BaseUser;
  requirementTitle: string;
  requirementId: string;
  publishDate: string;
  coin: number;
  price: number;
  state: OfferState;
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
}

export interface PurchaseOrder extends BasicPurchaseOrder {
  filters?: OfferFilters;
}

export interface User extends BaseUser {
  document: string;
  address: string;
  phone: string;
}

export interface BaseUser {
  uid: string;
  name: string;
  document: string;
  image?: string;
  avatar?: string;
  email: string;
  tenure?: number;
  customerScore?: number;
  sellerScore?: number;
  customerCount?: number;
  sellerCount?: number;
  typeEntity: EntityType;
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
}

export interface RequirementItemSubUser extends BaseRequirementOffer {
  price: number;
  publishDate: string;
  expirationDate: string;
  numberOffers: number;
  state: RequirementState;
  coin: number;
}

export interface OfferItemSubUser extends BaseRequirementOffer {
  requirementTitle: string;
  price: number;
  publishDate: string;
  state: OfferState;
  coin: number;
}

export interface CertificateFile {
  name: string;
  documentName: string;
  url: string;
  state?: CertificationState;
}

export interface CertificationItem {
  companyID: string;
  companyName: string;
  companyDocument: string;
  creationDate: string;
  state: CertificationState;
  note?: string;
}

export interface StatisticsData {
  customers: number;
  requirements: number;
  certifications: number;
  goods: number;
  services: number;
  sales: number;
  // rrhh: number;
  offers: number;
  issuedPurchaseOrders: number;
  receivedPurchaseOrders: number;
  employees: number;
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
