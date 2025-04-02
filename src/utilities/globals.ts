import React from "react";
import { pageRoutes } from "./routes";
import { Requirement, UserCounters } from "../models/MainInterfaces";

export const dateFormat: string = "DD-MM-YYYY";
export const dateFormatHomeSearch: string = "YYYY-MM-DD";
export const dateFormatChatList: string = "DD/MM/YY";
export const dateFormatChatBody: string = "DD/MM/YYYY";
export const hourFormatChatBody: string = "h:mm a";
export const dateHourFormatNotification: string = "DD-MM-YYYY hh:mm A";
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

export const typeParamNameInRoute: string = "type";
export const reqIdParamNameInRoute: string = "requirementId";

export const homePageSize: number = pageSizeOptionsSt[0];
export const notificationPageSize: number = 5;
export const certificatesToSendPageSize: number = 5;

export const formFieldKeyword: string = "keywords";
export const chatDataFieldName: string = "chatData";
export const basicChatDataFieldName: string = "basicChatData";

export const masterUid: string = "dlGMHRyyAidgFMDqmLBO";
export const pageSizeOfferList: number = 5;

export const inactivityTime = 30;
export const remainingTokenTime = 60;
export const logoutAfterNoTokenRefreshTime = 10;

export const defaultErrorMsg = "errorOccurred";

export const chatListPageSize: number = 10;
export const chatMessagesPageSize: number = 10;

// local storage keys
export const userDataKey: string = "udata";
export const tokenKey: string = "token";
export const refreshTokenKey: string = "rtoken";
export const logoutKey: string = "logout";
export const loginKey: string = "login";
export const expiresInKey: string = "expIn";
export const refreshExpiresInKey: string = "rExpIn";
export const refreshingTokenKey: string = "refTok";
export const refreshingRefreshTokenKey: string = "refRTok";

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
export const offersColumnKey: string = "numberOffers";
export const priceColumnKey: string = "price";
export const requirementColumnKey: string = "requirementTitle";
export const stateColumnKey: string = "state";
export const typeColumnKey: string = "type";
export const viewColumnKey: string = "view";

// Columnas custom - son los nombres de los campos definidos en las interfaces
export const reqDateColumnKey: string = "publishDate";
export const reqExpDateColumnKey: string = "expirationDate";
export const offerDateColumnKey: string = "publishDate";
export const purcOrderReqTitleColumnKey: string = "requirementTitle";
export const purcOrderDateColumnKey: string = "selectionDate";
export const purcOrderOfferTitleColumnKey: string = "offerTitle";
export const userNameColumnKey: string = "subUserName";
export const titleColumnKey: string = "title";
export const certDocDateColumnKey: string = "creationDate";
export const emailColumnKey: string = "email";
export const subUserCreationDateColumnKey: string = "createdAt";
export const numGoodsColumnKey: string = "numGoods";
export const numServicesColumnKey: string = "numServices";
export const numSalesColumnKey: string = "numSales";
export const numOffersGoodsColumnKey: string = "numOffersGoods";
export const numOffersServicesColumnKey: string = "numOffersServices";
export const numOffersSalesColumnKey: string = "numOffersSales";
export const numPurchaseOrdersProviderColumnKey: string =
  "numPurchaseOrdersProvider";
export const numPurchaseOrdersClientColumnKey: string =
  "numPurchaseOrdersClient";
export const numSellingOrdersProviderColumnKey: string =
  "numSellingOrdersProvider";
export const numSellingOrdersClientColumnKey: string = "numSellingOrdersClient";
export const documentNameColumnKey: string = "documentName";
export const companyNameColumnName: string = "companyName";
export const companyDocumentColumnName: string = "companyDocument";
export const certRequestCreationDateColumnKey: string = "creationDate";

// Parámetros para sort y filter en tabla. Map de <ColumnKeys, nombre de campo en respuesta de servidor>
export const fieldNameSearchRequestRequirement: Record<string, string> = {
  [nameColumnKey]: "name",
  [reqDateColumnKey]: "publish_date",
  [locationColumnKey]: "cityName",
  [priceColumnKey]: "budget",
  [userNameColumnKey]: "subUserName",
  [offersColumnKey]: "number_offers",
  [titleColumnKey]: "name",
  [reqExpDateColumnKey]: "completion_date",
  [stateColumnKey]: "stateID",
};
export const fieldNameSearchRequestOffer: Record<string, string> = {
  [nameColumnKey]: "name",
  [requirementColumnKey]: "requerimentTitle",
  [locationColumnKey]: "cityName",
  [offerDateColumnKey]: "publishDate",
  [priceColumnKey]: "budget",
  [userNameColumnKey]: "subUserName",
  [titleColumnKey]: "name",
  [stateColumnKey]: "stateID",
};
export const fieldNameSearchRequestCertRequests: Record<string, string> = {
  [companyNameColumnName]: "companyName",
  [companyDocumentColumnName]: "companyDocument",
  [certRequestCreationDateColumnKey]: "creationDate",
  [stateColumnKey]: "state",
};
export const fieldNameSearchRequestMyDocsCert: Record<string, string> = {
  [nameColumnKey]: "name",
  [documentNameColumnKey]: "documentName",
  [certDocDateColumnKey]: "creationDate",
};
export const fieldNameSearchRequestSubUser: Record<string, string> = {
  [nameColumnKey]: "name",
  [emailColumnKey]: "email",
  [subUserCreationDateColumnKey]: "createdAt",
  [numGoodsColumnKey]: "numProducts",
  [numServicesColumnKey]: "numServices",
  [numSalesColumnKey]: "numLiquidations",
  [numOffersGoodsColumnKey]: "numOffersProducts",
  [numOffersServicesColumnKey]: "numOffersServices",
  [numOffersSalesColumnKey]: "numOffersLiquidations",
  [numPurchaseOrdersProviderColumnKey]: "numPurchaseOrdersProvider",
  [numPurchaseOrdersClientColumnKey]: "numPurchaseOrdersClient",
  [numSellingOrdersProviderColumnKey]: "numSellingOrdersProvider",
  [numSellingOrdersClientColumnKey]: "numSellingOrdersClient",
  [stateColumnKey]: "active_account",
  typeID: "typeID",
};

export const reversedFieldNameSearchRequestSubUser = Object.fromEntries(
  Object.entries(fieldNameSearchRequestSubUser).map(([key, value]) => [
    value,
    key,
  ])
);

export const fieldNameSearchRequestOrder: Record<string, string> = {
  [purcOrderReqTitleColumnKey]: "requerimentTitle",
  [purcOrderDateColumnKey]: "createDate",
  [purcOrderOfferTitleColumnKey]: "offerTitle",
  [stateColumnKey]: "stateID",
};
export const fieldNameSearchRequestOrderClient: Record<string, string> = {
  ...fieldNameSearchRequestOrder,
  [nameColumnKey]: "nameUserProvider",
};
export const fieldNameSearchRequestOrderProvider: Record<string, string> = {
  ...fieldNameSearchRequestOrder,
  [nameColumnKey]: "userNameClient",
};
export const fieldNameSearchRequestAllOrderClient: Record<string, string> = {
  ...fieldNameSearchRequestOrder,
  [nameColumnKey]: "nameSubUserClient",
};
export const fieldNameSearchRequestAllOrderProvider: Record<string, string> = {
  ...fieldNameSearchRequestOrder,
  [nameColumnKey]: "nameSubUserProvider",
};

// Para actualizar campos
export const fieldNameUpdateRequirement: Record<string, keyof Requirement> = {
  state: "state",
  number_offers: "numberOffers",
};

// Keys de UserCounters
export const userCounterKeys: Record<keyof UserCounters, true> = {
  numGoods: true,
  numServices: true,
  numSales: true,
  numOffersGoods: true,
  numOffersServices: true,
  numOffersSales: true,
  numPurchaseOrdersProvider: true,
  numPurchaseOrdersClient: true,
  numSellingOrdersProvider: true,
  numSellingOrdersClient: true,
};
