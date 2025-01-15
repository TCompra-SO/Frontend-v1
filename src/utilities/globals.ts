import React from "react";
import { pageRoutes } from "./routes";

export const dateFormat: string = "DD-MM-YYYY";
export const dateFormatHomeSearch: string = "YYYY-MM-DD";
export const dateFormatChatList: string = "DD/MM/YY";
export const dateFormatChatBody: string = "DD/MM/YYYY";
export const hourFormatChatBody: string = "h:mm a";
export const TCompra: string = "TCompra";
export const pageSizeOptionsSt: number[] = [10, 20, 30];
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

export const onlyLettersAndNumbers: RegExp = /[^a-zA-Z0-9áéíóúÁÉÍÓÚ]/g;

export const companySearchAfterMseconds: number = 400;
export const tableSearchAfterMseconds: number = 400;
export const maxLengthStringToSearch: number = 25;
export const searchSinceLength: number = 3;

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

// Nombre de columnas
export const nameColumnKey: string = "name";
export const actionColumnKey: string = "action";
export const categoryColumnKey: string = "category";
export const documentColumnKey: string = "document";
export const locationColumnKey: string = "location";
export const offersColumnKey: string = "offers";
export const priceColumnKey: string = "price";
export const requirementColumnKey: string = "requirement";
export const stateColumnKey: string = "state";
export const typeColumnKey: string = "type";
export const viewColumnKey: string = "view";

// Columnas custom
export const reqDateColumnKey: string = "publishDate";
export const offerDateColumnKey: string = "publishDate";

// Parámetros para búsqueda en tabla
export const fieldNameSearchRequestRequirement: Record<string, string> = {
  [nameColumnKey]: "name",
  [reqDateColumnKey]: "publish_date",
  [locationColumnKey]: "cityName",
  [priceColumnKey]: "budget",
  userName: "userName",
  [offersColumnKey]: "number_offers",
};
export const fieldNameSearchRequestOffer: Record<string, string> = {
  [nameColumnKey]: "name",
  [requirementColumnKey]: "requerimentTitle",
  [locationColumnKey]: "cityName",
  [offerDateColumnKey]: "publishDate",
  [priceColumnKey]: "budget",
  userName: "userName",
};
