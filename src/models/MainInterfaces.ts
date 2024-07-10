import { RequirementState, RequirementType, UserTable } from "../utilities/types";

export interface RequirementTableItem {
  key: React.Key;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  coin: string;
  price: number;
  numberOffers: number;
  state: RequirementState;
  type: RequirementType
}

export interface OfferListItem {
  key: React.Key;
  title: string;
  description: string;
  coin: string;
  price: number;
  warranty: string;
  deliveryTime: string;
  user: User,
  location: string
}

export interface User {
  uid: string,
  name: string,
  email: string,
  password: string,
  profileType?: string,
  userType?: string,
  document: string,
  tenure?: string,
  userTable: UserTable
}