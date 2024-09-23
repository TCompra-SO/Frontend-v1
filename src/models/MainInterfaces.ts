import {
  OfferState,
  PurchaseOrderState,
  RequirementState,
  RequirementType,
  TimeMeasurement,
  Usage,
  UserTable,
} from "../utilities/types";

export interface RequirementTableItem {
  key: string;
  title: string;
  description: string;
  category: number;
  location: number;
  publishDate: Date;
  expirationDate: Date;
  coin: number;
  price: number;
  numberOffers: number;
  state: RequirementState;
  type: RequirementType;
  image?: string[];
  document?: string[];
  user: User;
  subUser?: User;
  warranty?: number;
  warrantyTime?: TimeMeasurement;
  usage?: Usage;
  deliveryTime: number;
}

export interface OfferListItem {
  key: string;
  title: string;
  requirementTitle: string;
  requirementId: string;
  description: string;
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
}

export interface PurchaseOrder {
  requirementTitle: string;
  purchaseDate: Date;
  state: PurchaseOrderState;
  user: User;
  subUser?: User;
  type: RequirementType;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  userType: number;
  document: string;
  tenure?: number;
  userTable: UserTable;
  customerScore: number;
  sellerScore: number;
  address: string;
  phone: string;
  image?: string;
}
