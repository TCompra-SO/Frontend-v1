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

export const RequirementStateMeta = {
  1: {
    color: 'green',
    label: 'Publicado'
  },
  2: {
    color: '#c3dbff',
    label: 'Atendido'
  },
  3: {
    color: '#ffc100',
    label: 'Culminado'
  },
  5: {
    color: 'gray',
    label: 'Expirado'
  },
  6: {
    color: 'red',
    label: 'Cancelado'
  },
  7: {
    color: '#e7ddbe',
    label: 'Eliminado'
  },
  8: {
    color: '#35031f',
    label: 'En disputa'
  }
}

export enum ModalTypes {
  DETAILED_REQUIREMENT = 1,
  VALIDATE_CODE = 2
}

export enum UserTable {
  COMPANY = 0,
  PERSON = 1
}