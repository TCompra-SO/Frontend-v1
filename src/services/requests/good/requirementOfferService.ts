import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function createReqOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.create
    }`,
    type: "OFRE-CRE",
    cookieAllowed: true,
  };
}

export function getReqOfferByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getDetailOffer
    }${id}`,
    type: "OFRE-GET-ID",
    cookieAllowed: true,
  };
}

export function getReqOffersByRequirementIdService(
  reqId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByRequirement
    }${reqId}/${page}/${pageSize}`,
    type: "OFRE-GET-RID",
    cookieAllowed: true,
  };
}

export function getBasicRateDataReqOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getBasicRateData
    }${id}`,
    type: "OFRE-BA-RA",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye ofertas de subusuarios
export function getReqOffersByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByEntity
    }${id}/${page}/${pageSize}`,
    type: "OFRE-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye ofertas de subusuarios
export function getReqOffersBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersBySubUser
    }${id}/${page}/${pageSize}`,
    type: "OFRE-GET-SUB",
    cookieAllowed: true,
  };
}

export function deleteReqOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.delete
    }${id}`,
    type: "OFRE-DEL",
    cookieAllowed: true,
  };
}

export function culminateReqOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.culminate
    }`,
    type: "OFRE-CUL",
    cookieAllowed: true,
  };
}

export function getValidationReqOfferService(
  userId: string,
  requirementId: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getValidation
    }${userId}/${requirementId}`,
    type: "OFRE-VAL",
    cookieAllowed: true,
  };
}

export function cancelReqOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.cancel
    }`,
    type: "OFRE-CAN",
    cookieAllowed: true,
  };
}

export function searchReqOffersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.searchOffers
    }`,
    type: "OFRE-SE-OF",
    cookieAllowed: true,
  };
}

export function uploadDocsReqOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsOffer
    }`,
    type: "OFRE-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesReqOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesOffer
    }`,
    type: "OFRE-IM-UP",
    cookieAllowed: true,
  };
}
