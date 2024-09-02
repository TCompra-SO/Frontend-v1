import {
  OfferState,
  PurchaseOrderState,
  RequirementState,
  RequirementType,
  UserTable,
} from "../utilities/types";

export interface RequirementTableItem {
  key: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  coin: string;
  price: number;
  numberOffers: number;
  state: RequirementState;
  type: RequirementType;
  image?: string;
  user: User;
  subUser?: User;
}

export interface OfferListItem {
  key: string;
  title: string;
  requirementTitle: string;
  description: string;
  coin: string;
  price: number;
  warranty: string;
  deliveryTime: string;
  user: User;
  location: string;
  image?: string;
  document?: string;
  subUser?: User;
  selectionDate?: Date;
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
  password: string;
  profileType?: string;
  userType?: string;
  document: string;
  tenure?: string;
  userTable: UserTable;
  customerScore: number;
  sellerScore: number;
  address: string;
  phone?: string;
}
