import { RequirementState } from "./types";

export const primaryColor = '#BC1373';
export const mainBackgroundColor = '#ffffff';
export const secondaryBackgroundColor = '#f3f7fa';
export const lightColor = '#fedef3';
export const darkColor = '#510839';
export const linkColor = '#007CD1';
export const tableHeaderTextColor = '#768286';

export const RequirementStateMeta: {[key: string] : {color: string, background: string, label: string}} = {
  [RequirementState.SELECTED]: {
    color: 'rgb(44,169,84)',
    background: 'rgb(203, 242, 214)',
    label: 'Atendido'
  },
  [RequirementState.FINISHED]: {
    color: 'rgb(46,131,216)',
    background: 'rgb(206,232,255)',
    label: 'Culminado'
  },
  [RequirementState.PUBLISHED]: {
    color: 'rgb(255, 201, 14)',
    background: 'rgb(239,228,176)',
    label: 'Culminado'
  },
  [RequirementState.EXPIRED]: {
    color: 'rgb(148,148,148)',
    background: 'rgb(231,231,231)',
    label: 'Expirado'
  },
  [RequirementState.CANCELED]: {
    color: 'rgb(209,62,70)',
    background: 'rgb(255,210,215)',
    label: 'Cancelado'
  },
  [RequirementState.ELIMINATED]: {
    color: '#e7ddbe',
    background: 'black',
    label: 'Eliminado'
  },
  [RequirementState.DISPUTE]: {
    color: 'rgb(56, 162,177)',
    background: 'rgb(203,242, 245)',
    label: 'En disputa'
  }
}