export const DocType = {
  DNI: 'DNI',
  RUC: 'RUC'
}

export enum RequirementType {
  GOOD = 1,
  SERVICE = 2,
  SALE = 3,
  JOB = 4
}

export enum RequirementState {
  PUBLISHED = 1,
  SELECTED = 2,
  FINISHED = 3,
  // DESERTED = 4,
  EXPIRED = 5,
  CANCELED = 6,
  ELIMINATED = 7,
  DISPUTE = 8
}

export enum ModalTypes {
  DETAILED_REQUIREMENT = 1,
  VALIDATE_CODE = 2
}

export enum UserTable {
  COMPANY = 0,
  PERSON = 1
}

export enum Action {
  SHOW_OFFERS = 1,
  DELETE = 2, 
  CANCEL_REQUIREMENT = 3,
  FINISH = 4,
  REPUBLISH = 5,
  SHOW_SUMMARY = 6
}

export enum OfferState {
  ACTIVE = 1,
  WINNER = 2, 
  FINISHED = 3, 
  DISPUTE = 4,
  CANCELED = 5,
}