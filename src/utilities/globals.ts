import React from "react";
import { pageRoutes } from "./routes";

export const dateFormat: string = "DD-MM-YYYY";
export const dateFormatChatList: string = "DD/MM/YY";
export const dateFormatChatBody: string = "DD/MM/YYYY";
export const hourFormatChatBody: string = "h:mm a";
export const TCompra: string = "TCompra";
export const pageSizeOptionsSt: number[] = [10, 20, 50];
export const noPaginationPageSize: number = 100;
export const allSelect: number = 999;
export const defaultCountry: string = "01";

export const maxImageSizeMb: number = 1;
export const maxImagesQuantity: number = 5;
export const maxDocsQuantity: number = 1;
export const maxDocSizeMb: number = 2;

export const commonModalWidth: number = 980;
export const mediumPlusModalWidth: number = 630;
export const mediumModalWidth: number = 450;
export const smallModalWidth: number = 350;
export const columnWidth: number = 100;

export const certifiedCompaniesOpt: number = 3;
export const phoneCode: string = "+51";

export const allItems: number = 0;

export const navigateToAfterLoggingOut = pageRoutes.home;

export const defaultUserImage: string = "/src/assets/images/user-default.svg";
export const defaultRequirementImage: string =
  "/src/assets/images/img-prod.svg";

// local storage keys
export const userDataKey: string = "udata";
export const tokenKey: string = "token";

/* Window size (>=) */
export const windowSize = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mainModalScrollStyle: React.CSSProperties = {
  maxHeight: "95vh",
  overflowY: "scroll",
};
