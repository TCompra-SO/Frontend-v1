import {
  allSelect,
  commonModalWidth,
  mediumModalWidth,
  mediumPlusModalWidth,
  smallModalWidth,
  allItems,
} from "./globals";

/**** Estados ***/

export enum RequirementState {
  PUBLISHED = 1,
  SELECTED = 2,
  FINISHED = 3,
  DISPUTE = 4,
  EXPIRED = 5,
  CANCELED = 6,
  ELIMINATED = 7,
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
  ELIMINATED = 7,
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
  SALES_ORDER = 15,
  USERS = 4,
  REQUIREMENT_SUBUSER = 5,
  OFFER_SUBUSER = 6,
  PURCHASE_ORDER_SUBUSER = 7,
  SALES_ORDER_SUBUSER = 17,
  ALL_REQUIREMENTS = 8,
  ALL_OFFERS = 9,
  ALL_PURCHASE_ORDERS = 10,
  ALL_SALES_ORDERS = 16,
  MY_DOCUMENTS = 11,
  SENT_CERT = 12,
  RECEIVED_CERT = 13,
  HOME = 14,
}

export enum EntityType {
  COMPANY = "Company",
  PERSON = "User",
  SUBUSER = "SubUser",
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
  OFFER_DETAIL = 11,
  USER_INFO = 12,
  ADD_CERTIFICATES = 13,
  EDIT_DOCUMENT_LIST_TO_REQUEST = 14,
  VIEW_DOCS_RECEIVED_CERT = 15,
  VIEW_DOCS_SENT_CERT = 16,
  SELECT_DOCS_CERT = 17,
  SEND_MESSAGE = 18,
}

export const ModalWidth: {
  [key in ModalTypes]: number;
} = {
  [ModalTypes.NONE]: 0,
  [ModalTypes.DETAILED_REQUIREMENT]: commonModalWidth,
  [ModalTypes.VALIDATE_CODE]: mediumModalWidth,
  [ModalTypes.CANCEL_PURCHASE_ORDER]: mediumPlusModalWidth,
  [ModalTypes.SELECT_OFFER]: commonModalWidth,
  [ModalTypes.OFFER_SUMMARY]: commonModalWidth,
  [ModalTypes.REPUBLISH_REQUIREMENT]: smallModalWidth,
  [ModalTypes.RATE_CANCELED]: mediumPlusModalWidth,
  [ModalTypes.RATE_USER]: mediumPlusModalWidth,
  [ModalTypes.CONFIRM]: mediumPlusModalWidth,
  [ModalTypes.INPUT_EMAIL]: smallModalWidth,
  [ModalTypes.OFFER_DETAIL]: commonModalWidth,
  [ModalTypes.USER_INFO]: 900,
  [ModalTypes.ADD_CERTIFICATES]: 800,
  [ModalTypes.EDIT_DOCUMENT_LIST_TO_REQUEST]: 600,
  [ModalTypes.VIEW_DOCS_RECEIVED_CERT]: 800,
  [ModalTypes.VIEW_DOCS_SENT_CERT]: 800,
  [ModalTypes.SELECT_DOCS_CERT]: 800,
  [ModalTypes.SEND_MESSAGE]: 600,
};

/***** Acciones *****/

export enum Action {
  NONE = 0,
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
  OFFER_DETAIL = 23,
  ADD_USER = 24,
  VIEW_REQUIREMENT = 25,
  VIEW_OFFER = 26,
  VIEW_PURCHASE_ORDER = 27,
  ADD_CERTIFICATES = 28,
  EDIT_DOCUMENT_LIST_TO_REQUEST = 29,
  VIEW = 30,
  VIEw_SALES_ORDERS = 31,
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
  [Action.OFFER_DETAIL]: "offerDetail",
  [Action.ADD_USER]: "addUser",
  [Action.VIEW_REQUIREMENT]: "view",
  [Action.VIEW_OFFER]: "view",
  [Action.VIEW_PURCHASE_ORDER]: "view",
  [Action.ADD_CERTIFICATES]: "addCertificates",
  [Action.EDIT_DOCUMENT_LIST_TO_REQUEST]: "listOfDocumentsToRequest",
  [Action.VIEW]: "view",
  [Action.VIEw_SALES_ORDERS]: "viewSalesOrders",
  [Action.NONE]: "none",
};

export const ActionByStateRequirement: {
  [key in RequirementState]: Array<Action>;
} = {
  [RequirementState.CANCELED]: [Action.REPUBLISH], // Action.DELETE
  [RequirementState.DISPUTE]: [Action.SHOW_SUMMARY],
  [RequirementState.EXPIRED]: [Action.DELETE, Action.REPUBLISH],
  [RequirementState.FINISHED]: [Action.SHOW_SUMMARY],
  [RequirementState.PUBLISHED]: [Action.DELETE, Action.CANCEL_REQUIREMENT],
  [RequirementState.SELECTED]: [Action.CANCEL_REQUIREMENT, Action.FINISH],
  [RequirementState.ELIMINATED]: [],
};

export const ActionByStateOffer: { [key in OfferState]: Array<Action> } = {
  [OfferState.ACTIVE]: [Action.DELETE, Action.OFFER_DETAIL, Action.CHAT],
  [OfferState.CANCELED]: [
    Action.RATE_CANCELED,
    Action.OFFER_DETAIL,
    Action.CHAT,
  ],
  [OfferState.DISPUTE]: [Action.OFFER_DETAIL, Action.CHAT],
  [OfferState.FINISHED]: [Action.OFFER_DETAIL, Action.CHAT],
  [OfferState.WINNER]: [
    Action.CANCEL_OFFER,
    Action.FINISH,
    Action.OFFER_DETAIL,
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
    Action.VIEW_CUSTOMER,
    Action.VIEW_HISTORY,
    Action.CANCEL,
  ],
  [PurchaseOrderState.DISPUTE]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_CUSTOMER,
    Action.VIEW_HISTORY,
  ],
  [PurchaseOrderState.FINISHED]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_CUSTOMER,
    Action.VIEW_HISTORY,
  ],
  [PurchaseOrderState.CANCELED]: [
    Action.DOWNLOAD_PURCHASE_ORDER,
    Action.VIEW_SUPPLIER,
    Action.VIEW_CUSTOMER,
    Action.VIEW_HISTORY,
  ],
  [PurchaseOrderState.ELIMINATED]: [],
};

export const ActionSubUsers: {
  [key: number]: Array<Action>;
} = {
  [allItems]: [
    Action.VIEW_REQUIREMENTS,
    Action.VIEW_OFFERS,
    Action.VIEW_PURCHASE_ORDERS,
    Action.VIEw_SALES_ORDERS,
    Action.EDIT_USER,
  ],
};

export const ActionCertificateFiles: {
  [key: number]: Array<Action>;
} = {
  [allItems]: [Action.VIEW_DOCUMENT, Action.DELETE],
};

/*********/

export enum CommonFilter {
  ALL = allSelect,
  ASC = 1,
  DESC = 2,
}

export const DeliveryTimeFilter = {
  ALL: allSelect,
};

export const LocationFilter = {
  ALL: allSelect,
};

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
  PUBLISH_DATE = 3,
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
  VIEW = 16,
  EXPIRATION_DATE = 17,
  CREATION_DATE = 18,
  SELECTION_DATE = 19,
  OFFER = 20,
  USERNAME = 21,
  SUBTYPE = 22,
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

export enum CanOfferType {
  ALL = 1,
  PREMIUM = 2,
  CERTIFIED_COMPANY = 3,
}

export enum TimeMeasurement {
  DAYS = 0,
  MONTHS = 1,
  YEARS = 2,
}

export enum Usage {
  NEW = 0,
  USED = 1,
}

export const Coins: { [key: string]: string } = {
  PEN: "S/.",
  USD: "$",
  COP: "$",
};

export enum UserRoles {
  NONE = 0,
  ADMIN = 1,
  SELLER_BUYER = 2,
  SELLER = 3,
  BUYER = 4,
  LEGAL = 5,
}

export enum PurchaseOrderTableTypes {
  ISSUED = 0,
  RECEIVED = 1,
}

export enum CertificationState {
  NONE = 5,
  CERTIFIED = 1,
  REJECTED = 2,
  PENDING = 3,
  RESENT = 4,
}

export enum ImageRequestLabels {
  AVATAR = "image",
  UID = "uid",
  IMAGES = "images",
  DOCUMENTS = "documents",
}

export enum ProcessFlag {
  NOT_INI = 0,
  FIN_SUCCESS = 1,
  FIN_UNSUCCESS = 2,
}

export enum CantOfferMotives {
  NONE = 0,
  INI = 14,

  ALREADY_MADE_OFFER = 1,
  MAIN_ACCOUNT_MADE_OFFER = 11,
  OTHER_USER_IN_COMPANY_MADE_OFFER = 3,
  SUBUSER_MADE_OFFER = 12,

  NOT_LOGGED_IN = 2,
  CHANGED_STATE = 6,
  ONLY_PREMIUM = 7,
  ONLY_CERTIFIED = 8,
  NO_ALLOWED_ROLE = 9,

  IS_CREATOR = 4,
  MAIN_ACCOUNT_IS_CREATOR = 5,
  OTHER_USER_IN_COMPANY_IS_CREATOR = 10,
  SUBUSER_IS_CREATOR = 13,
}

export enum CodeResponseCanOffer {
  ALREADY_MADE_OFFER = 1,
  MAIN_ACCOUNT_MADE_OFFER = 2,
  OTHER_USER_IN_COMPANY_MADE_OFFER = 3,
  NONE = 4,
  IS_CREATOR = 5,
  MAIN_ACCOUNT_IS_CREATOR = 6,
  OTHER_USER_IN_COMPANY_IS_CREATOR = 7,
}

export enum RateStartCountType {
  OFFER_LIST = 1,
  COMPANY_DATA_HOME = 2,
}

export enum OrderConfirmation {
  NONE = 0,
  YES = 1,
  NO = 3,
}

export enum UploadCertificateLabels {
  companyId = "companyID",
  documenst = "documents",
  name = "name",
}
