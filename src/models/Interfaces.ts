import React, { ReactNode } from "react";
import {
  Action,
  CountriesRequestType,
  ModalTypes,
  PriceFilter,
  RequirementType,
  TableColumns,
  TableTypes,
  WarrantyFilter,
} from "../utilities/types";
import {
  OfferListItem,
  PurchaseOrder,
  RequirementTableItem,
  User,
} from "./MainInterfaces";

/******** Modals *******/

export interface CommonModalType {
  title?: React.ReactNode;
  type: ModalTypes;
}

export interface ModalCancelPurchaseOrder extends CommonModalType {
  type: ModalTypes.CANCEL_PURCHASE_ORDER;
  data: { offerId: string; requirementId: string };
}

export interface ModalDetailedRequirement extends CommonModalType {
  type: ModalTypes.DETAILED_REQUIREMENT;
  data: { offerList: OfferListItem[]; requirement: RequirementTableItem };
}

export interface ModalOfferSummary extends CommonModalType {
  type: ModalTypes.OFFER_SUMMARY;
  data: { offer: OfferListItem; requirement: RequirementTableItem };
}

export interface ModalRateCanceled extends CommonModalType {
  type: ModalTypes.RATE_CANCELED;
  data: {
    user: User;
    requirementOffertitle: string;
    type: RequirementType;
    isOffer: boolean;
  };
}

export interface ModalRateUser extends CommonModalType {
  type: ModalTypes.RATE_USER;
  data: {
    user: User;
    requirementOffertitle: string;
    type: RequirementType;
    isOffer: boolean;
  };
}

export interface ModalRepublishRequirement extends CommonModalType {
  type: ModalTypes.REPUBLISH_REQUIREMENT;
  data: { requirementId: string };
}

export interface ModalSelectOffer extends CommonModalType {
  type: ModalTypes.SELECT_OFFER;
  data: { offer: OfferListItem; requirement: RequirementTableItem };
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

export interface ModalNone extends CommonModalType {
  type: ModalTypes.NONE;
  data: Record<string, never>;
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
  | ModalNone;

/********** Tables *************/

export interface TableHiddenColumns {
  hiddenColumns: TableColumns[];
  nameColumnHeader: string;
  onButtonClick: (action: Action, data: any) => void;
}

export interface TableTypeRequirement extends TableHiddenColumns {
  type: TableTypes.REQUIREMENT;
  subType: RequirementType;
  data: RequirementTableItem[];
  // onButtonClick: (action: Action, data: RequirementTableItem) => void;
}

export interface TableTypeOffer extends TableHiddenColumns {
  type: TableTypes.OFFER;
  data: OfferListItem[];
  // onButtonClick: (action: Action, data: OfferListItem) => void;
}

export interface TableTypePurchaseOrder extends TableHiddenColumns {
  type: TableTypes.PURCHASE_ORDER;
  data: PurchaseOrder[];
  // onButtonClick: (action: Action, data: PurchaseOrder) => void;
}

export type TableType =
  | TableTypeRequirement
  | TableTypeOffer
  | TableTypePurchaseOrder;

/********************* */

export interface HttpService {
  url: string;
  type: string;
}

export interface useApiParams<T = any> {
  service: HttpService | null;
  method: "get" | "post" | "put" | "delete";
  dataToSend?: T;
}

export interface CountryObj {
  country: string;
  cities?: string[];
}

export interface IdValueObj {
  id: number;
  value: string;
}

export interface IdValueAliasObj extends IdValueObj {
  alias: string;
}

export interface IdValueMap {
  [id: number]: {
    value: string;
  };
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
  price: PriceFilter;
  deliveryTime: number;
  location: number;
  warranty: WarrantyFilter;
}

export interface ListItem {
  key: string;
  value: string;
}
