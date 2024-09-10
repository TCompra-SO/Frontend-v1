import {
  allSelect,
  commonModalWidth,
  mediumModalWidth,
  smallModalWidth,
} from "./globals";

/**** Estados ***/

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

export enum OfferState {
  ACTIVE = 1,
  WINNER = 2,
  FINISHED = 3,
  DISPUTE = 4,
  CANCELED = 5,
  ELIMINATED = 7,
}

export enum PurchaseOrderState {
  PENDING = 1,
  CANCELED = 2,
  FINISHED = 3,
  DISPUTE = 4,
}

/**************/

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

export enum UserTable {
  COMPANY = 0,
  PERSON = 1,
}

/*** Modales ****/

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
  INPUT_EMAIL = 10,
}

export const ModalWidth: {
  [key in ModalTypes]: number;
} = {
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
  [ModalTypes.INPUT_EMAIL]: smallModalWidth,
};

/***** Acciones *****/

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
  DOWNLOAD_PURCHASE_ORDER = 12,
  VIEW_SUPPLIER = 13,
  VIEW_CUSTOMER = 14,
  VIEW_HISTORY = 15,
  VIEW_REQUIREMENTS = 16,
  VIEW_OFFERS = 17,
  VIEW_PURCHASE_ORDERS = 18,
  EDIT_USER = 19,
  VIEW_DOCUMENT = 20,
  DOCS_STATE = 21,
  CANCEL = 22,
}

export const ActionLabel: {
  [key in Action]: string;
} = {
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
  [Action.DOWNLOAD_PURCHASE_ORDER]: "donwloadPurchaseOrder",
  [Action.VIEW_SUPPLIER]: "viewSupplier",
  [Action.VIEW_CUSTOMER]: "viewCustomer",
  [Action.VIEW_HISTORY]: "viewHistory",
  [Action.VIEW_REQUIREMENTS]: "viewRequirements",
  [Action.VIEW_OFFERS]: "viewOffers",
  [Action.VIEW_PURCHASE_ORDERS]: "viewPurchaseOrders",
  [Action.EDIT_USER]: "editUser",
  [Action.VIEW_DOCUMENT]: "viewDocument",
  [Action.DOCS_STATE]: "docsState",
  [Action.CANCEL]: "cancel",
};

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
  [OfferState.ELIMINATED]: [],
};

export const ActionByStatePurchaseOrder: {
  [key in PurchaseOrderState]: Array<Action>;
} = {
  [PurchaseOrderState.PENDING]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.FINISH,
    Action.VIEW_SUPPLIER,
    Action.VIEW_HISTORY,
    Action.CANCEL,
  ],
  [PurchaseOrderState.DISPUTE]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_HISTORY,
  ],
  [PurchaseOrderState.FINISHED]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_HISTORY,
  ],
  [PurchaseOrderState.CANCELED]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_HISTORY,
  ],
};

/*********/

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

export enum RegisterTypeId {
  PRINC = 1,
}
