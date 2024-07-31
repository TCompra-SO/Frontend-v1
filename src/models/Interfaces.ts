import {
  ModalTypes,
  PriceFilter,
  RequirementType,
  WarrantyFilter,
} from "../utilities/types";
import { OfferListItem, RequirementTableItem, User } from "./MainInterfaces";

export interface HttpObject {
  data: any | null;
  loading: boolean;
  error: string | null;
}

export interface CountryObj {
  country: string;
  cities?: string[];
}

export interface CountriesRequest {
  verify: 1 | 2; // 1: Solo países | 2: Países y ciudades
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
  deliveryTime: string;
  location: string;
  warranty: WarrantyFilter;
}

export interface ModalCancelPurchaseOrder {
  type: ModalTypes.CANCEL_PURCHASE_ORDER;
  data: { offerId: string; requirementId: string };
}

export interface ModalDetailedRequirement {
  type: ModalTypes.DETAILED_REQUIREMENT;
  data: { offerList: OfferListItem[]; requirement: RequirementTableItem };
}

export interface ModalOfferSummary {
  type: ModalTypes.OFFER_SUMMARY;
  data: { offer: OfferListItem };
}

export interface ModalRateCanceled {
  type: ModalTypes.RATE_CANCELED;
  data: {
    user: User;
    requirementOffertitle: string;
    type: RequirementType;
    isOffer: boolean;
  };
}

export interface ModalRateUser {
  type: ModalTypes.RATE_USER;
  data: {
    user: User;
    requirementOffertitle: string;
    type: RequirementType;
    isOffer: boolean;
  };
}

export interface ModalRepublishRequirement {
  type: ModalTypes.REPUBLISH_REQUIREMENT;
  data: { requirementId: string };
}

export interface ModalSelectOffer {
  type: ModalTypes.SELECT_OFFER;
  data: { offer: OfferListItem; requirement: RequirementTableItem };
}

export interface ModalValidateCode {
  type: ModalTypes.VALIDATE_CODE;
  data: Record<string, never>;
}

export interface ModalConfirmation {
  type: ModalTypes.CONFIRM;
  data: {
    text: string;
    icon?: React.ReactNode;
    onAnswer: (ok: boolean) => void;
  };
}

export interface ModalNone {
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
  | ModalNone;

export interface HttpService {
  url: string;
  type: string;
}
