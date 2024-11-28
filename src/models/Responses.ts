import {
  CantOfferMotives,
  CodeResponseCanOffer,
  UserRoles,
} from "../utilities/types";
import { BaseUser } from "./MainInterfaces";

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

export interface CanOfferResponse {
  codeResponse: CodeResponseCanOffer;
  offerID?: string;
}
