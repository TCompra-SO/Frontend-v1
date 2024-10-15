import moment from "moment";
import {
  CountryCities,
  HttpService,
  IdValueMap,
  IdValueObj,
  useApiParams,
} from "../models/Interfaces";
import { defaultCountry, maxDocSizeMb, maxImageSizeMb } from "./globals";
import { PurchaseOrderTableTypes, RequirementType, UserClass } from "./types";
import { pageRoutes } from "./routes";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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
  return current && current < moment().startOf("day");
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
export function getLabelFromPurchaseOrderType(type: PurchaseOrderTableTypes) {
  switch (type) {
    case PurchaseOrderTableTypes.ISSUED:
    case PurchaseOrderTableTypes.ISSUED_SALES:
      return "issued";
    case PurchaseOrderTableTypes.RECEIVED:
    case PurchaseOrderTableTypes.RECEIVED_SALES:
      return "received";
  }
}

// Retorna el puntaje
export function getScore(score: number) {
  return score.toFixed(0);
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
    case pageRoutes.goods:
      return RequirementType.GOOD;
    case pageRoutes.services:
      return RequirementType.SERVICE;
    case pageRoutes.sales:
      return RequirementType.SALE;
    default:
      return RequirementType.GOOD;
  }
}

export function getLastSegmentFromRoute(pathname: string) {
  const pathSegments = pathname.split("/");
  return pathSegments[pathSegments.length - 1];
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
    }
  }
  return { responseData, error };
}
