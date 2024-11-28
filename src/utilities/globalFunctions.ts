import {
  CountryCities,
  HttpService,
  IdValueMap,
  IdValueObj,
  useApiParams,
} from "../models/Interfaces";
import { defaultCountry, maxDocSizeMb, maxImageSizeMb } from "./globals";
import {
  PurchaseOrderTableTypes,
  RequirementType,
  TimeMeasurement,
  UserClass,
  UserRoles,
} from "./types";
import { pageRoutes, pageSubRoutes } from "./routes";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import i18next from "i18next";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";

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
  serv1: HttpService | null,
  serv2: HttpService | null
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
  type: PurchaseOrderTableTypes,
  plural: boolean = false,
  onlyTwoLabels: boolean = true
) {
  switch (type) {
    case PurchaseOrderTableTypes.ISSUED:
      return plural ? "issuedPl" : "issued";
    case PurchaseOrderTableTypes.RECEIVED:
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

export function getPurchaseOrderType(pathname: string) {
  const lastSegment = getLastSegmentFromRoute(pathname);
  switch (lastSegment) {
    case pageSubRoutes.issued:
      return PurchaseOrderTableTypes.ISSUED;
    case pageSubRoutes.received:
      return PurchaseOrderTableTypes.RECEIVED;
    default:
      return PurchaseOrderTableTypes.ISSUED;
  }
}

export function isHome(pathname: string) {
  const lastSegment = getLastSegmentFromRoute(pathname);
  const home = getLastSegmentFromRoute(pageRoutes.home);
  return lastSegment === home;
}

export function getLastSegmentFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  return pathSegments[pathSegments.length - 1];
}

export function getSectionFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  if (pathSegments.length <= 1 || pathSegments[1] === "")
    return pageRoutes.home;
  return "/" + pathSegments[1];
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
  let responseData: any | null = null;
  let errorMsg: string | null = null;
  let error: AxiosError<any, any> | null = null;

  if (service) {
    try {
      const config: AxiosRequestConfig = {
        method: method,
        url: service.url,
        data: dataToSend,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
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
