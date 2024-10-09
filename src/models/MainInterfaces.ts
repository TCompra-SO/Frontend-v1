import {
  OfferState,
  PurchaseOrderState,
  RequirementState,
  RequirementType,
  TimeMeasurement,
  Usage,
  UserRoles,
  EntityType,
} from "../utilities/types";
import { OfferFilters } from "./Interfaces";

export interface BaseRequirementOffer {
  key: string;
  title: string;
  type: RequirementType;
}

export interface BasicRequirement extends BaseRequirementOffer {
  user: User;
  subUser?: User;
  publishDate: string;
  category: number;
  location: number;
  coin: number;
  price: number;
  numberOffers: number;
  state: RequirementState;
}

export interface Requirement extends BasicRequirement {
  description: string;
  expirationDate: string;
  image?: string[];
  document?: string[];
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  usage?: Usage;
  deliveryTime: number;
}

export interface BasicOffer extends BaseRequirementOffer {}

export interface Offer extends BasicOffer {
  requirementTitle: string;
  requirementId: string;
  description?: string;
  coin: number;
  price: number;
  warranty: number;
  warrantyTime: TimeMeasurement;
  deliveryTime: number;
  user: User;
  location: number;
  image?: string[];
  document?: string[];
  subUser?: User;
  selectionDate?: string;
  publishDate: string;
  state: OfferState;
  type: RequirementType;
  igv?: boolean;
  deliveryDate?: string;
  delivered?: boolean;
}

export interface BasicPurchaseOrder {}

export interface PurchaseOrder extends BasicPurchaseOrder {
  key: string;
  requirementTitle: string;
  requirementId: string;
  offerId: string;
  selectionDate: string;
  state: PurchaseOrderState;
  user: User;
  subUser?: User;
  type: RequirementType;
  filters?: OfferFilters;
}

export interface User extends BaseUser {
  document: string;
  typeEntity: EntityType;
  address: string;
  phone: string;
}

export interface BaseUser {
  uid: string;
  name: string;
  image?: string;
  email: string;
  tenure?: number;
  customerScore: number;
  sellerScore: number;
  customerCount: number;
  sellerCount: number;
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

export interface PurchaseOrderItemSubUser {
  key: string;
  type: RequirementType;
  requirementTitle: string;
  offerTitle: string;
  selectionDate: string;
  state: PurchaseOrderState;
}
