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

export interface BaseRequirementOffer {
  key: string;
  title: string;
  type: RequirementType;
}

export interface Requirement extends BaseRequirementOffer {
  description: string;
  category: number;
  location: number;
  publishDate: string;
  expirationDate: string;
  coin: number;
  price: number;
  numberOffers: number;
  state: RequirementState;
  image?: string[];
  document?: string[];
  user: User;
  subUser?: User;
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  usage?: Usage;
  deliveryTime: number;
}

export interface Offer extends BaseRequirementOffer {
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

export interface PurchaseOrder {
  key: string;
  requirementTitle: string;
  selectionDate: string;
  state: PurchaseOrderState;
  user: User;
  subUser?: User;
  type: RequirementType;
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
