import moment from "moment";
import {
  CountryCities,
  HttpService,
  IdValueMap,
  IdValueObj,
} from "../models/Interfaces";
import { defaultCountry, maxDocSizeMb, maxImageSizeMb } from "./globals";
import {
  RequirementState,
  RequirementType,
  UserClass,
  UserTable,
} from "./types";
import { RequirementTableItem } from "../models/MainInterfaces";

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
      return plural ? "sale" : "sales";
    case RequirementType.JOB:
      return plural ? "job" : "jobs";
  }
}

// Retorna el puntaje
export function getScore(score: number) {
  return score.toFixed(0);
}

export function transformDataToRequirement(data: any) {
  const req: RequirementTableItem = {
    description: data.description,
    category: data.category,
    location: data.location,
    publishDate: data.publishDate,
    expirationDate: data.completion_date,
    coin: data.coin,
    price: data.price,
    numberOffers: data.numberOffers,
    state: data.state ?? RequirementState.FINISHED,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: 2,
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      userType: 0,
      phone: "90909090",
    },
    deliveryTime: data.submission_date,
    key: data.key,
    title: data.title,
    type: RequirementType.GOOD,
  };
  console.log(data, req);
  return req;
}
