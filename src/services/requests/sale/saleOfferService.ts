import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function createSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.create
    }`,
    type: "OFSA-CRE",
    cookieAllowed: true,
  };
}

export function getSaleOfferByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getDetailOffer
    }${id}`,
    type: "OFSA-GET-ID",
    cookieAllowed: true,
  };
}

export function getSaleOffersBySaleIdService(
  reqId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByRequirement
    }${reqId}/${page}/${pageSize}`,
    type: "OFSA-GET-RID",
    cookieAllowed: true,
  };
}

export function getBasicRateDataSaleOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getBasicRateData
    }${id}`,
    type: "OFSA-BA-RA",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye ofertas de subusuarios
export function getSaleOffersByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByEntity
    }${id}/${page}/${pageSize}`,
    type: "OFSA-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye ofertas de subusuarios
export function getSaleOffersBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersBySubUser
    }${id}/${page}/${pageSize}`,
    type: "OFSA-GET-SUB",
    cookieAllowed: true,
  };
}

export function deleteSaleOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.delete
    }${id}`,
    type: "OFSA-DEL",
    cookieAllowed: true,
  };
}

export function culminateSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.culminate
    }`,
    type: "OFSA-CUL",
    cookieAllowed: true,
  };
}

export function getValidationSaleOfferService(
  userId: string,
  requirementId: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getValidation
    }${userId}/${requirementId}`,
    type: "OFSA-VAL",
    cookieAllowed: true,
  };
}

export function cancelSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.cancel
    }`,
    type: "OFSA-CAN",
    cookieAllowed: true,
  };
}

export function searchSaleOffersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.searchOffers
    }`,
    type: "OFSA-SE-OF",
    cookieAllowed: true,
  };
}

export function uploadDocsSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsOffer
    }`,
    type: "OFSA-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesOffer
    }`,
    type: "OFSA-IM-UP",
    cookieAllowed: true,
  };
}
