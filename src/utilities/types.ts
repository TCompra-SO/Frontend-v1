import {
  allSelect,
  commonModalWidth,
  mediumModalWidth,
  smallModalWidth,
} from "./globals";

export const DocType = {
  DNI: "DNI",
  RUC: "RUC",
};

export enum RequirementType {
  GOOD = 1,
  SERVICE = 2,
  SALE = 3,
  JOB = 4,
}

export enum TableTypes {
  REQUIREMENT = 1,
  OFFER = 2,
  PURCHASE_ORDER = 3,
}

export enum RequirementState {
  PUBLISHED = 1,
  SELECTED = 2,
  FINISHED = 3,
  // DESERTED = 4,
  EXPIRED = 5,
  CANCELED = 6,
  ELIMINATED = 7,
  DISPUTE = 8,
}

export enum ModalTypes {
  NONE = 0,
  DETAILED_REQUIREMENT = 1,
  VALIDATE_CODE = 2,
  CANCEL_PURCHASE_ORDER = 3,
  SELECT_OFFER = 4,
  OFFER_SUMMARY = 5,
  REPUBLISH_REQUIREMENT = 6,
  RATE_CANCELED = 7,
  RATE_USER = 8,
  CONFIRM = 9,
}

export const ModalWidth = {
  [ModalTypes.NONE]: 0,
  [ModalTypes.DETAILED_REQUIREMENT]: commonModalWidth,
  [ModalTypes.VALIDATE_CODE]: mediumModalWidth,
  [ModalTypes.CANCEL_PURCHASE_ORDER]: mediumModalWidth,
  [ModalTypes.SELECT_OFFER]: commonModalWidth,
  [ModalTypes.OFFER_SUMMARY]: commonModalWidth,
  [ModalTypes.REPUBLISH_REQUIREMENT]: smallModalWidth,
  [ModalTypes.RATE_CANCELED]: mediumModalWidth,
  [ModalTypes.RATE_USER]: mediumModalWidth,
  [ModalTypes.CONFIRM]: mediumModalWidth,
};

export enum UserTable {
  COMPANY = 0,
  PERSON = 1,
}

export enum Action {
  SHOW_OFFERS = 1,
  DELETE = 2,
  CANCEL_REQUIREMENT = 3,
  FINISH = 4,
  REPUBLISH = 5,
  SHOW_SUMMARY = 6,
  RATE_CANCELED = 7,
  CANCEL_PURCHASE_ORDER = 8,
  SELECT_OFFER = 9,
  CHAT = 10,
  CANCEL_OFFER = 11,
}

export const ActionLabel = {
  [Action.SHOW_OFFERS]: "showOffers",
  [Action.DELETE]: "delete",
  [Action.CANCEL_REQUIREMENT]: "cancelRequirement",
  [Action.FINISH]: "finish",
  [Action.REPUBLISH]: "republish",
  [Action.SHOW_SUMMARY]: "showSummary",
  [Action.RATE_CANCELED]: "rate",
  [Action.CANCEL_PURCHASE_ORDER]: "cancelPurchaseOrder",
  [Action.SELECT_OFFER]: "selectOffer",
  [Action.CHAT]: "goToChat",
  [Action.CANCEL_OFFER]: "cancelOffer",
};

export enum OfferState {
  ACTIVE = 1,
  WINNER = 2,
  FINISHED = 3,
  DISPUTE = 4,
  CANCELED = 5,
  ELIMINATED = 7,
}

export enum PriceFilter {
  ALL = allSelect,
  ASC = "1",
  DESC = "2",
}

export const DeliveryTimeFilter = {
  ALL: allSelect,
};

export const LocationFilter = {
  ALL: allSelect,
};

export enum WarrantyFilter {
  ALL = allSelect,
  ASC = "1",
  DESC = "2",
}

export enum OfferFilterTypes {
  PRICE = 1,
  DELIVERY = 2,
  LOCATION = 3,
  WARRANTY = 4,
}

export enum TableColumns {
  IMAGE = 0,
  ACTION = 1,
  CATEGORY = 2,
  DATE = 3,
  LOCATION = 4,
  NAME = 5,
  OFFERS = 6,
  PRICE = 7,
  STATE = 8,
  REQUIREMENT = 9,
  TYPE = 10,
  EMAIL = 11,
  GOODS = 12,
  SERVICES = 13,
  SALES = 14,
  DOCUMENT = 15,
  OFFER = 16,
}

export const ActionByStateRequirement: {
  [key in RequirementState]: Array<Action>;
} = {
  [RequirementState.CANCELED]: [Action.DELETE, Action.REPUBLISH],
  [RequirementState.DISPUTE]: [Action.SHOW_SUMMARY],
  [RequirementState.EXPIRED]: [Action.DELETE, Action.REPUBLISH],
  [RequirementState.FINISHED]: [Action.SHOW_SUMMARY],
  [RequirementState.PUBLISHED]: [Action.DELETE, Action.CANCEL_REQUIREMENT],
  [RequirementState.SELECTED]: [Action.CANCEL_REQUIREMENT, Action.FINISH],
  [RequirementState.ELIMINATED]: [],
};

export const ActionByStateOffer: { [key in OfferState]: Array<Action> } = {
  [OfferState.ACTIVE]: [Action.DELETE, Action.SHOW_SUMMARY, Action.CHAT],
  [OfferState.CANCELED]: [
    Action.RATE_CANCELED,
    Action.SHOW_SUMMARY,
    Action.CHAT,
  ],
  [OfferState.DISPUTE]: [Action.SHOW_SUMMARY, Action.CHAT],
  [OfferState.FINISHED]: [Action.SHOW_SUMMARY, Action.CHAT],
  [OfferState.WINNER]: [
    Action.CANCEL_OFFER,
    Action.FINISH,
    Action.SHOW_SUMMARY,
    Action.CHAT,
  ],
};

export enum UserClass {
  CUSTOMER = 0,
  SELLER = 1,
}

export enum YesNo {
  YES = 1,
  NO = 0,
}

export enum CountriesRequestType {
  COUNTRY = 1,
  COUNTRY_CITY = 2,
}
