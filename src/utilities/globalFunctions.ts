import {
  CountryCities,
  HttpService,
  IdValueMap,
  IdValueObj,
  ModalContent,
  useApiParams,
} from "../models/Interfaces";
import {
  defaultCountry,
  fieldNameSearchRequestAllOrderClient,
  fieldNameSearchRequestAllOrderProvider,
  fieldNameSearchRequestOrderClient,
  fieldNameSearchRequestOrderProvider,
  maxDocSizeMb,
  maxImageSizeMb,
  maxLengthStringToSearch,
  onlyLettersAndNumbers,
  pageSizeOptionsSt,
} from "./globals";
import {
  EntityType,
  ErrorMsgRequestType,
  ErrorRequestType,
  OrderType,
  OrderTableType,
  RequirementType,
  ResponseRequestType,
  TableTypes,
  TimeMeasurement,
  UserClass,
  UserRoles,
  CertificationTableType,
  Action,
  ModalTypes,
} from "./types";
import { pageRoutes, pageSubRoutes } from "./routes";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import i18next from "i18next";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { FieldFilter, FieldSort, SearchTableRequest } from "../models/Requests";
import { SorterResult } from "antd/es/table/interface";
import store from "../redux/store";
import { FilterValue } from "antd/lib/table/interface";
import {
  cancelRequirementService,
  createRequirementService,
  culminateRequirementService,
  deleteRequirementService,
  getBasicRateDataReqService,
  getRequirementByIdService,
  getRequirementsService,
  homeRequirementFilterService,
  republishRequirementService,
  searchRequirementsService,
  selectRequirementOfferService,
  uploadDocsRequirementService,
  uploadImagesRequirementService,
} from "../services/requests/good/requirementService";
import {
  cancelServiceService,
  createServiceService,
  culminateServiceService,
  deleteServiceService,
  getBasicRateDataServiceService,
  getServiceByIdService,
  getServicesService,
  homeServiceFilterService,
  republishServiceService,
  searchServicesService,
  selectServiceOfferService,
  uploadDocsServiceService,
  uploadImagesServiceService,
} from "../services/requests/service/serviceService";
import {
  cancelSaleService,
  createSaleService,
  culminateSaleService,
  deleteSaleService,
  getBasicRateDataSaleService,
  getSaleByIdService,
  getSalesService,
  homeSaleFilterService,
  republishSaleService,
  searchSalesService,
  selectSaleOfferService,
  uploadDocsSaleService,
  uploadImagesSaleService,
} from "../services/requests/sale/saleService";
import {
  cancelReqOfferService,
  createReqOfferService,
  culminateReqOfferService,
  deleteReqOfferService,
  getBasicRateDataReqOfferService,
  getReqOfferByIdService,
  getReqOffersByRequirementIdService,
  getValidationReqOfferService,
  searchReqOffersService,
  uploadDocsReqOfferService,
  uploadImagesReqOfferService,
} from "../services/requests/good/requirementOfferService";
import {
  cancelServiceOfferService,
  createServiceOfferService,
  culminateServiceOfferService,
  deleteServiceOfferService,
  getBasicRateDataServiceOfferService,
  getServiceOfferByIdService,
  getServiceOffersByServiceIdService,
  getValidationServiceOfferService,
  searchServiceOffersService,
  uploadDocsServiceOfferService,
  uploadImagesServiceOfferService,
} from "../services/requests/service/serviceOfferService";
import {
  cancelSaleOfferService,
  createSaleOfferService,
  culminateSaleOfferService,
  deleteSaleOfferService,
  getBasicRateDataSaleOfferService,
  getSaleOfferByIdService,
  getSaleOffersBySaleIdService,
  getValidationSaleOfferService,
  searchSaleOffersService,
  uploadDocsSaleOfferService,
  uploadImagesSaleOfferService,
} from "../services/requests/sale/saleOfferService";
import {
  getReqPurchaseOrderByIdService,
  getReqPurchaseOrderPDFService,
  searchReqPurchaseOrdersByClientService,
  searchReqPurchaseOrdersByProviderService,
} from "../services/requests/good/requirementPurchaseOrderService";
import {
  getServicePurchaseOrderByIdService,
  getServicePurchaseOrderPDFService,
  searchServicePurchaseOrdersByClientService,
  searchServicePurchaseOrdersByProviderService,
} from "../services/requests/service/servicePurchaseOrderService";
import {
  getSalesOrderByIdService,
  getSalesOrderPDFService,
  searchSalesOrdersByClientService,
  searchSalesOrdersByProviderService,
} from "../services/requests/sale/salesOrderService";

// Determina  si el usuario al que se va a calificar es proveedor o cliente
// isOffer indica si a quien se califica es creador de una oferta o no
export function getUserClass(isOffer: boolean, type: RequirementType) {
  const userClass: UserClass =
    (isOffer && type == RequirementType.SALE) ||
    (!isOffer && type !== RequirementType.SALE)
      ? UserClass.CUSTOMER
      : UserClass.SELLER;
  return userClass;
}

// Check image size and type
export function checkImage(image: File) {
  const fileSizeMB = image.size / (1024 * 1024);
  return {
    validImage: image.type.startsWith("image/"),
    validSize: fileSizeMB <= maxImageSizeMb,
  };
}

// Check doc size
export function checkDoc(file: File) {
  const fileSizeMB = file.size / (1024 * 1024);
  return {
    validFile: file.type === "application/pdf",
    validSize: fileSizeMB <= maxDocSizeMb,
  };
}

// Determina si dos servicios http son iguales
export function equalServices(
  serv1: HttpService | null | undefined,
  serv2: HttpService | null | undefined
) {
  if (serv1 && serv2) return serv1.type === serv2.type;
  if (!serv1 && !serv2) return true;
  return false;
}

// Verifica si fecha es menor a hoy
export function isDateEarlierThanToday(current: any) {
  return current && dayjs(current).isBefore(dayjs().startOf("day"));
}

// Verifica si fecha es menor a mañana
export function isDateEarlierThanTomorrow(current: any) {
  return (
    current && dayjs(current).isBefore(dayjs().add(1, "day").startOf("day"))
  );
}

// Transforma objeto de datos de lista en lista para select de Antd
export function getListForSelectIdValueMap(data: IdValueMap) {
  return Object.entries(data).map(([id, { value }]) => ({
    label: value,
    value: Number(id),
  }));
}

// Retorna la lista de ciudades para select de Antd
export function getCityListForSelect(countryData: CountryCities) {
  const showCountry = countryData[defaultCountry]
    ? defaultCountry
    : Object.keys(countryData)[0];

  return Object.keys(countryData).length > 0
    ? countryData[showCountry].cities.map((cit: IdValueObj) => {
        return { label: cit.value, value: cit.id };
      })
    : [];
}

// Retorna la llave del nombre del tipo de requerimiento
export function getLabelFromRequirementType(
  type: RequirementType,
  plural: boolean = true
) {
  switch (type) {
    case RequirementType.GOOD:
      return plural ? "goods" : "good";
    case RequirementType.SERVICE:
      return plural ? "services" : "service";
    case RequirementType.SALE:
      return plural ? "sales" : "sale";
    case RequirementType.JOB:
      return plural ? "job" : "jobs";
  }
}

// Retorna la llave del nombre del tipo de orden de compra
export function getLabelFromPurchaseOrderType(
  type: OrderTableType,
  plural: boolean = false
) {
  switch (type) {
    case OrderTableType.ISSUED:
      return plural ? "issuedPl" : "issued";
    case OrderTableType.RECEIVED:
      return plural ? "receivedPl" : "received";
  }
}

// Retorna el puntaje
export function getScore(score: number | undefined) {
  return score ? score.toFixed(0) : 0;
}

// Retorna el promedio del puntaje
export function calculateFinalScore(scores: number[]) {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, num) => acc + num, 0);
  return sum / scores.length;
}

// Abre documento en una nueva ventana
export function openDocument(documentUrl: string) {
  window.open(
    documentUrl,
    "_blank",
    "width=800,height=600,top=100,left=100,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes"
  );
}

export function getRouteType(pathname: string) {
  const lastSegment = getLastSegmentFromRoute(pathname);
  switch (lastSegment) {
    case pageSubRoutes.goods:
      return RequirementType.GOOD;
    case pageSubRoutes.services:
      return RequirementType.SERVICE;
    case pageSubRoutes.sales:
      return RequirementType.SALE;
    default:
      return RequirementType.GOOD;
  }
}

export function getPurchaseOrderType(
  pathname: string,
  noRequirementType?: boolean
) {
  const segment = noRequirementType
    ? getLastSegmentFromRoute(pathname)
    : getPenultimateSegmentFromRoute(pathname);
  switch (segment) {
    case pageSubRoutes.issued:
      return OrderTableType.ISSUED;
    case pageSubRoutes.received:
      return OrderTableType.RECEIVED;
    default:
      return OrderTableType.ISSUED;
  }
}

export function getReqTypeAndOrderType(pathname: string) {
  return {
    requirementType: getRouteType(pathname),
    orderType: getPurchaseOrderType(pathname),
  };
}

export function isHome(pathname: string) {
  const lastSegment = getLastSegmentFromRoute(pathname);
  const home = getLastSegmentFromRoute(pageRoutes.home);
  return lastSegment === home;
}

export function isChat(pathname: string) {
  const lastSegment = getLastSegmentFromRoute(pathname);
  const chat = getLastSegmentFromRoute(pageRoutes.chat);
  return lastSegment === chat;
}

export function getLastSegmentFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  return pathSegments[pathSegments.length - 1];
}

export function getPenultimateSegmentFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  return pathSegments[pathSegments.length - 2];
}

export function getSectionFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  if (pathSegments.length <= 1 || pathSegments[1] === "")
    return pageRoutes.home;
  return "/" + pathSegments[1];
}

export function getCertificationTableType(segment: string) {
  if (segment == pageSubRoutes.received) return CertificationTableType.RECEIVED;
  if (segment == pageSubRoutes.sent) return CertificationTableType.SENT;
  return CertificationTableType.SENT; // default
}

// Retorna valor anidado para columna de tabla
export function getNestedValue(dataIndex: string, record: any) {
  return dataIndex.split(".").reduce((acc, key) => acc && acc[key], record);
}

// Hace una solicitud http
export default async function makeRequest<T = any>({
  service,
  method,
  dataToSend,
  token,
}: useApiParams<T>) {
  const userToken = store.getState().user.token;
  let responseData: ResponseRequestType = null;
  let errorMsg: ErrorMsgRequestType = null;
  let error: ErrorRequestType = null;

  if (service) {
    try {
      const config: AxiosRequestConfig = {
        method: method,
        url: service.url,
        data: dataToSend,
        headers: {
          Authorization: token
            ? `Bearer ${token}`
            : userToken
            ? `Bearer ${userToken}`
            : undefined,
          "Content-Type": "application/json",
        },
      };
      const result: AxiosResponse = await axios(config);
      responseData = result.data;
    } catch (err) {
      console.log("HTTP error:", err);
      error = err as AxiosError;
      errorMsg = i18next.t(httpErrorInterceptor(err, service.type));
    }
  }
  return { responseData, error, errorMsg };
}

// Retorna la llave del nombre del tipo de requerimiento
export function getLabelFromRole(type: UserRoles) {
  switch (type) {
    case UserRoles.ADMIN:
      return "admin";
    case UserRoles.LEGAL:
      return "legal";
    case UserRoles.SELLER:
      return "sellerRole";
    case UserRoles.BUYER:
      return "buyer";
    case UserRoles.SELLER_BUYER:
      return "sellerBuyer";
    case UserRoles.NONE:
      return "none";
  }
}

// Transforma tiempo a días
export function transformToDays(n: number, time: TimeMeasurement) {
  switch (time) {
    case TimeMeasurement.MONTHS:
      return n * 30;
    case TimeMeasurement.YEARS:
      return n * 365;
    default:
      return n;
  }
}

// Return pdf src
export function getPdfSrc(data: string) {
  if (data) {
    const byteCharacters = atob(data);
    const byteNumbers = Array.from(byteCharacters, (char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  }
  return null;
}

// Mostrar pdf de orden de compra
export function openPurchaseOrderPdf(responseData: any) {
  const pdfSrc = getPdfSrc(responseData.data);
  if (pdfSrc) {
    window.open(
      pdfSrc,
      "_blank",
      "width=800,height=1000,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
    );
  }
}

// Genera un identificador unico
export function generateShortId(): string {
  const timestamp = Date.now().toString(36).slice(-4);
  const random = Math.random().toString(36).substring(2, 6);
  return `${timestamp}${random}`;
}

// Procesa string de búsqueda
export function getSearchString(
  val: string | undefined,
  returnUndefined: boolean = false
) {
  const search = val
    ?.trim()
    .replace(onlyLettersAndNumbers, "")
    .slice(0, maxLengthStringToSearch);
  return !returnUndefined ? search : search === "" ? undefined : search;
}

// Retorna request inicial de tablas
export function getInitialTableRequest(userId: string, userType: EntityType) {
  const val: SearchTableRequest = {
    userId,
    page: 1,
    pageSize: pageSizeOptionsSt[0],
    typeUser: userType,
  };
  return val;
}

// Retorna parámetros para búsqueda con orden en tabla
export function getParamsFromSorterAndFilter(
  sorter: SorterResult<any> | SorterResult<any>[] | undefined,
  filter: Record<string, FilterValue | null> | undefined,
  fieldNameObj: Record<string, string>
) {
  let fs: FieldSort | undefined = undefined;
  let ff: FieldFilter | undefined = undefined;
  if (
    sorter &&
    !Array.isArray(sorter) &&
    Object.keys(sorter).length > 0 &&
    sorter.columnKey &&
    typeof sorter.columnKey === "string"
  ) {
    const tempOrderType = sorter.order
      ? sorter.order == "descend"
        ? OrderType.DESC
        : OrderType.ASC
      : undefined;
    if (fieldNameObj[sorter.columnKey] && tempOrderType) {
      fs = {
        fieldName: fieldNameObj[sorter.columnKey],
        orderType: tempOrderType,
        columnKey: sorter.columnKey,
      };
    }
  }
  if (filter) {
    const keys = Object.keys(filter);
    if (
      keys.length > 0 &&
      filter[keys[0]] !== undefined &&
      filter[keys[0]] !== null
    ) {
      ff = {
        filterData: filter[keys[0]] ?? [],
        filterColumn: fieldNameObj[keys[0]],
      };
    }
  }
  return {
    fieldSort: fs,
    fieldFilter: ff,
  };
}

// Función para mostrar ícono de sort en columna si la columna está ordenada
export function getSortOrderFromFieldSort(
  columnKey: string,
  fieldSort: FieldSort | undefined
) {
  return fieldSort?.columnKey == columnKey
    ? fieldSort?.orderType
      ? fieldSort?.orderType == OrderType.ASC
        ? "ascend"
        : "descend"
      : undefined
    : undefined;
}

// Retorna los nombres de campos a enviarse al servidor cuando se ordena y/o filtra órdenes de compra/venta
export function getFieldNameObjForOrders(
  tableType:
    | TableTypes.PURCHASE_ORDER
    | TableTypes.SALES_ORDER
    | TableTypes.ALL_PURCHASE_ORDERS
    | TableTypes.ALL_SALES_ORDERS,
  type: OrderTableType
) {
  if (
    tableType == TableTypes.ALL_PURCHASE_ORDERS ||
    tableType == TableTypes.ALL_SALES_ORDERS
  )
    if (tableType == TableTypes.ALL_PURCHASE_ORDERS)
      return type == OrderTableType.ISSUED
        ? fieldNameSearchRequestAllOrderClient
        : fieldNameSearchRequestAllOrderProvider;
    else
      return type == OrderTableType.ISSUED
        ? fieldNameSearchRequestAllOrderProvider
        : fieldNameSearchRequestAllOrderClient;
  if (tableType == TableTypes.PURCHASE_ORDER)
    return type == OrderTableType.ISSUED
      ? fieldNameSearchRequestOrderClient
      : fieldNameSearchRequestOrderProvider;
  else
    return type == OrderTableType.ISSUED
      ? fieldNameSearchRequestOrderProvider
      : fieldNameSearchRequestOrderClient;
}

// Verifica si los campos de garantía deben ser requeridos
export function checkWarranty(durationVal: any, warrantyVal: any) {
  return (
    (durationVal !== null && durationVal !== undefined) ||
    (warrantyVal !== null && warrantyVal !== undefined)
  );
}

// Verifica si la solicitud de búsqueda no incluye parámetros de filtro ni de orden
export function hasNoSortNorFilter(request: SearchTableRequest): boolean {
  const hasValidOptionalFields =
    request.fieldName === undefined &&
    request.orderType === undefined &&
    request.columnKey === undefined &&
    request.filterData === undefined &&
    request.filterColumn === undefined &&
    request.keyWords === undefined;
  return hasValidOptionalFields;
}

// Verifica y retorna si n es un RequirementType
export function isRequirementType(n: any) {
  const temp =
    n == RequirementType.GOOD ||
    n == RequirementType.SERVICE ||
    n == RequirementType.SALE;
  return {
    result: temp,
    val: temp ? (n as RequirementType) : null,
  };
}

// Verifica y retorna si n es un OrderTableType
export function isOrderTableTypes(n: any) {
  const temp = n == OrderTableType.RECEIVED || n == OrderTableType.ISSUED;
  return {
    result: temp,
    val: temp ? (n as OrderTableType) : null,
  };
}

// Verifica y retorna si n es un CertificationTableType
export function isCertificationTableTypes(n: any) {
  const temp =
    n == CertificationTableType.RECEIVED || n == CertificationTableType.SENT;
  return {
    result: temp,
    val: temp ? (n as CertificationTableType) : null,
  };
}

/** Funciones que retornan el servicio correcto según tipo */

export function getHomeFilterService(type: RequirementType) {
  if (type == RequirementType.GOOD) return homeRequirementFilterService();
  if (type == RequirementType.SERVICE) return homeServiceFilterService();
  if (type == RequirementType.SALE) return homeSaleFilterService();
  return null;
}

export function getHomeRecordsService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getRequirementsService;
  if (type == RequirementType.SERVICE) return getServicesService;
  if (type == RequirementType.SALE) return getSalesService;
  return null;
}

export function getCreateRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return createRequirementService();
  if (type == RequirementType.SERVICE) return createServiceService();
  if (type == RequirementType.SALE) return createSaleService();
  return null;
}

export function getGetRecordByIdService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getRequirementByIdService;
  if (type == RequirementType.SERVICE) return getServiceByIdService;
  if (type == RequirementType.SALE) return getSaleByIdService;
  return null;
}

export function getSelectOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return selectRequirementOfferService();
  if (type == RequirementType.SERVICE) return selectServiceOfferService();
  if (type == RequirementType.SALE) return selectSaleOfferService();
  return null;
}

export function getGetBasicRateDataRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getBasicRateDataReqService;
  if (type == RequirementType.SERVICE) return getBasicRateDataServiceService;
  if (type == RequirementType.SALE) return getBasicRateDataSaleService;
  return null;
}

export function getDeleteRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return deleteRequirementService;
  if (type == RequirementType.SERVICE) return deleteServiceService;
  if (type == RequirementType.SALE) return deleteSaleService;
  return null;
}

export function getRepublishRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return republishRequirementService();
  if (type == RequirementType.SERVICE) return republishServiceService();
  if (type == RequirementType.SALE) return republishSaleService();
  return null;
}

export function getCulminateRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return culminateRequirementService();
  if (type == RequirementType.SERVICE) return culminateServiceService();
  if (type == RequirementType.SALE) return culminateSaleService();
  return null;
}

export function getCancelRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return cancelRequirementService();
  if (type == RequirementType.SERVICE) return cancelServiceService();
  if (type == RequirementType.SALE) return cancelSaleService();
  return null;
}

export function getSearchRecordsService(
  type: RequirementType | OrderTableType | undefined
) {
  if (type == RequirementType.GOOD) return searchRequirementsService();
  if (type == RequirementType.SERVICE) return searchServicesService();
  if (type == RequirementType.SALE) return searchSalesService();
  return null;
}

export function getCreateOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return createReqOfferService();
  if (type == RequirementType.SERVICE) return createServiceOfferService();
  if (type == RequirementType.SALE) return createSaleOfferService();
  return null;
}

export function getGetOfferByIdService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getReqOfferByIdService;
  if (type == RequirementType.SERVICE) return getServiceOfferByIdService;
  if (type == RequirementType.SALE) return getSaleOfferByIdService;
  return null;
}

export function getGetOffersByRecordIdService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getReqOffersByRequirementIdService;
  if (type == RequirementType.SERVICE)
    return getServiceOffersByServiceIdService;
  if (type == RequirementType.SALE) return getSaleOffersBySaleIdService;
  return null;
}

export function getGetBasicRateDataRecordOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getBasicRateDataReqOfferService;
  if (type == RequirementType.SERVICE)
    return getBasicRateDataServiceOfferService;
  if (type == RequirementType.SALE) return getBasicRateDataSaleOfferService;
  return null;
}

export function getDeleteOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return deleteReqOfferService;
  if (type == RequirementType.SERVICE) return deleteServiceOfferService;
  if (type == RequirementType.SALE) return deleteSaleOfferService;
  return null;
}

export function getCulminateOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return culminateReqOfferService();
  if (type == RequirementType.SERVICE) return culminateServiceOfferService();
  if (type == RequirementType.SALE) return culminateSaleOfferService();
  return null;
}

export function getGetValidationOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getValidationReqOfferService;
  if (type == RequirementType.SERVICE) return getValidationServiceOfferService;
  if (type == RequirementType.SALE) return getValidationSaleOfferService;
  return null;
}

export function getCancelOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return cancelReqOfferService();
  if (type == RequirementType.SERVICE) return cancelServiceOfferService();
  if (type == RequirementType.SALE) return cancelSaleOfferService();
  return null;
}

export function getSearchOffersService(
  type: RequirementType | OrderTableType | undefined
) {
  if (type == RequirementType.GOOD) return searchReqOffersService();
  if (type == RequirementType.SERVICE) return searchServiceOffersService();
  if (type == RequirementType.SALE) return searchSaleOffersService();
  return null;
}

export function getUploadDocsRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return uploadDocsRequirementService();
  if (type == RequirementType.SERVICE) return uploadDocsServiceService();
  if (type == RequirementType.SALE) return uploadDocsSaleService();
  return null;
}

export function getUploadDocsOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return uploadDocsReqOfferService();
  if (type == RequirementType.SERVICE) return uploadDocsServiceOfferService();
  if (type == RequirementType.SALE) return uploadDocsSaleOfferService();
  return null;
}

export function getUploadImagesOfferService(type: RequirementType) {
  if (type == RequirementType.GOOD) return uploadImagesReqOfferService();
  if (type == RequirementType.SERVICE) return uploadImagesServiceOfferService();
  if (type == RequirementType.SALE) return uploadImagesSaleOfferService();
  return null;
}

export function getUploadImagesRecordService(type: RequirementType) {
  if (type == RequirementType.GOOD) return uploadImagesRequirementService();
  if (type == RequirementType.SERVICE) return uploadImagesServiceService();
  if (type == RequirementType.SALE) return uploadImagesSaleService();
  return null;
}

export function getGetOrderPDFService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getReqPurchaseOrderPDFService;
  if (type == RequirementType.SERVICE) return getServicePurchaseOrderPDFService;
  if (type == RequirementType.SALE) return getSalesOrderPDFService;
  return null;
}

export function getGetOrderByIdService(type: RequirementType) {
  if (type == RequirementType.GOOD) return getReqPurchaseOrderByIdService;
  if (type == RequirementType.SERVICE)
    return getServicePurchaseOrderByIdService;
  if (type == RequirementType.SALE) return getSalesOrderByIdService;
  return null;
}

export function getSearchOrdersByClientService(
  type: RequirementType | OrderTableType | undefined
) {
  if (type == RequirementType.GOOD)
    return searchReqPurchaseOrdersByClientService();
  if (type == RequirementType.SERVICE)
    return searchServicePurchaseOrdersByClientService();
  if (type == RequirementType.SALE) return searchSalesOrdersByClientService();
  return null;
}

export function getSearchOrdersByProviderService(
  type: RequirementType | OrderTableType | undefined
) {
  if (type == RequirementType.GOOD)
    return searchReqPurchaseOrdersByProviderService();
  if (type == RequirementType.SERVICE)
    return searchServicePurchaseOrdersByProviderService();
  if (type == RequirementType.SALE) return searchSalesOrdersByProviderService();
  return null;
}

export function getProductDetailRoute(id: string, type: RequirementType) {
  return `${pageRoutes.productDetail}/${type}/${id}`;
}

// Genera una llave aleatoria
export function generateRandomKey() {
  return `${Date.now()}-${Math.random()}`;
}

// Compara si dos fechas coinciden
export function isSameDay(timestamp1: string, timestamp2: string) {
  const date1 = dayjs(timestamp1);
  const date2 = dayjs(timestamp2);
  return (
    date1.year() === date2.year() &&
    date1.month() === date2.month() &&
    date1.date() === date2.date()
  );
}

// Retorna la subruta correspondiente al tipo de requerimiento
export function getRequirementTypeSubRoute(type: RequirementType) {
  switch (type) {
    case RequirementType.GOOD:
      return pageSubRoutes.goods;
    case RequirementType.SERVICE:
      return pageSubRoutes.services;
    case RequirementType.SALE:
      return pageSubRoutes.sales;
    default:
      return "";
  }
}

// Retorna la subruta correspondiente al tipo de tabla de orden
export function getOrderTableTypeSubRoute(type: OrderTableType) {
  switch (type) {
    case OrderTableType.ISSUED:
      return pageSubRoutes.issued;
    case OrderTableType.RECEIVED:
      return pageSubRoutes.received;
    default:
      return "";
  }
}

// Retorna la subruta correspondiente al tipo de tabla de certificados
export function getCertificationTableTypeSubRoute(
  type: CertificationTableType
) {
  switch (type) {
    case CertificationTableType.SENT:
      return pageSubRoutes.sent;
    case CertificationTableType.RECEIVED:
      return pageSubRoutes.received;
    default:
      return "";
  }
}

export function getInitialModalData() {
  const initialModalData: ModalContent = {
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  };
  return initialModalData;
}
