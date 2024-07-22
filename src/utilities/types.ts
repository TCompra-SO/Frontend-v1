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
}

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
}

export const ActionLabel = {
  [Action.SHOW_OFFERS]: "Ver ofertas",
  [Action.DELETE]: "Eliminar",
  [Action.CANCEL_REQUIREMENT]: "Cancelar requerimiento",
  [Action.FINISH]: "Culminar",
  [Action.REPUBLISH]: "Republicar",
  [Action.SHOW_SUMMARY]: "Ver resumen",
};

export enum OfferState {
  ACTIVE = 1,
  WINNER = 2,
  FINISHED = 3,
  DISPUTE = 4,
  CANCELED = 5,
}

export enum PriceFilter {
  ALL = "0",
  ASC = "1",
  DESC = "2",
}

export enum DeliveryTimeFilter {
  ALL = "0",
}

export enum LocationFilter {
  ALL = "0",
}

export enum WarrantyFilter {
  ALL = "0",
  ASC = "1",
  DESC = "2",
}

export enum OfferFilterTypes {
  PRICE = 1,
  DELIVERY = 2,
  LOCATION = 3,
  WARRANTY = 4,
}

export enum RequirementTableColumns {
  IMAGE = 0,
  ACTION = 1,
  CATEGORY = 2,
  DATE = 3,
  LOCATION = 4,
  NAME = 5,
  OFFERS = 6,
  PRICE = 7,
  STATE = 8,
}

export const ActionObjects2 = {
  [RequirementState.CANCELED]: {
    [Action.DELETE]: [ActionLabel[Action.DELETE]],
    [Action.REPUBLISH]: [ActionLabel[Action.REPUBLISH]],
  },
  [RequirementState.DISPUTE]: {
    [Action.SHOW_SUMMARY]: [ActionLabel[Action.SHOW_SUMMARY]],
  },
  [RequirementState.EXPIRED]: {
    [Action.DELETE]: [ActionLabel[Action.DELETE]],
    [Action.REPUBLISH]: [ActionLabel[Action.REPUBLISH]],
  },
  [RequirementState.FINISHED]: {
    [Action.SHOW_SUMMARY]: [ActionLabel[Action.SHOW_SUMMARY]],
  },
  [RequirementState.PUBLISHED]: {
    [Action.DELETE]: [ActionLabel[Action.DELETE]],
    [Action.CANCEL_REQUIREMENT]: [ActionLabel[Action.CANCEL_REQUIREMENT]],
  },
  [RequirementState.SELECTED]: {
    [Action.CANCEL_REQUIREMENT]: [ActionLabel[Action.CANCEL_REQUIREMENT]],
    [Action.FINISH]: [ActionLabel[Action.FINISH]],
  },
  [RequirementState.ELIMINATED]: {},
};

export const ActionByState: { [key in RequirementState]: Array<Action> } = {
  [RequirementState.CANCELED]: [Action.DELETE, Action.REPUBLISH],
  [RequirementState.DISPUTE]: [Action.SHOW_SUMMARY],
  [RequirementState.EXPIRED]: [Action.DELETE, Action.REPUBLISH],
  [RequirementState.FINISHED]: [Action.SHOW_SUMMARY],
  [RequirementState.PUBLISHED]: [Action.DELETE, Action.CANCEL_REQUIREMENT],
  [RequirementState.SELECTED]: [Action.CANCEL_REQUIREMENT, Action.FINISH],
  [RequirementState.ELIMINATED]: [],
};
