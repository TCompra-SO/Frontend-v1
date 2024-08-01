import { RequirementState } from "./types";

export const primaryColor = "#BC1373";
export const mainBackgroundColor = "#ffffff";
export const secondaryBackgroundColor = "#f3f7fa";
export const lightColor = "#fedef3";
export const lighterColor = "#f5e9f0";
export const darkColor = "#510839";
export const linkColor = "#007CD1";
export const tableHeaderTextColor = "#768286";
export const modalBackgroundColor = "#fafafa";
export const white = "#ffffff";
export const rowColor = "#f3f7fa";
export const gray = "#e8e8e8";
export const darkerGray = "#6e6e6e";

export const RequirementStateMeta: {
  [key: string]: { color: string; background: string; label: string };
} = {
  [RequirementState.SELECTED]: {
    color: "rgb(44,169,84)",
    background: "rgb(203, 242, 214)",
    label: "selected",
  },
  [RequirementState.FINISHED]: {
    color: "rgb(46,131,216)",
    background: "rgb(206,232,255)",
    label: "finished",
  },
  [RequirementState.PUBLISHED]: {
    color: "rgb(255, 201, 14)",
    background: "rgb(250,242,207)",
    label: "published",
  },
  [RequirementState.EXPIRED]: {
    color: "rgb(148,148,148)",
    background: "rgb(231,231,231)",
    label: "expired",
  },
  [RequirementState.CANCELED]: {
    color: "rgb(209,62,70)",
    background: "rgb(255,210,215)",
    label: "canceled",
  },
  [RequirementState.ELIMINATED]: {
    color: "#e7ddbe",
    background: "black",
    label: "eliminated",
  },
  [RequirementState.DISPUTE]: {
    color: "rgb(56, 162,177)",
    background: "rgb(203,242, 245)",
    label: "dispute",
  },
};
