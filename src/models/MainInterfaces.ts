import {
  OfferState,
  PurchaseOrderState,
  RequirementState,
  RequirementType,
  TimeMeasurement,
  Usage,
  UserTable,
} from "../utilities/types";

export interface BaseRequirementOffer {
  key: string;
  title: string;
  type: RequirementType;
}

export interface RequirementTableItem extends BaseRequirementOffer {
  description: string;
  category: number;
  location: number;
  publishDate: Date;
  expirationDate: Date;
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

export interface OfferListItem extends BaseRequirementOffer {
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
  selectionDate?: Date;
  publishDate: Date;
  state: OfferState;
  type: RequirementType;
  igv?: boolean;
  deliveryDate?: Date;
  delivered?: boolean;
}

export interface PurchaseOrder {
  key: string;
  requirementTitle: string;
  purchaseDate: Date;
  state: PurchaseOrderState;
  user: User;
  subUser?: User;
  type: RequirementType;
}

export interface User extends BaseUser {
  email: string;
  userType: number;
  document: string;
  tenure?: number;
  userTable: UserTable;
  customerScore: number;
  sellerScore: number;
  address: string;
  phone: string;
}

export interface BaseUser {
  uid: string;
  name: string;
  image?: string; // scores //  teunre /email
}
