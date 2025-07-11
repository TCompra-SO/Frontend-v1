import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function createServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.create
    }`,
    type: "OFSE-CRE",
    cookieAllowed: true,
  };
}

export function getServiceOfferByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getDetailOffer
    }${id}`,
    type: "OFSE-GET-ID",
    cookieAllowed: true,
  };
}

export function getServiceOffersByServiceIdService(
  reqId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByRequirement
    }${reqId}/${page}/${pageSize}`,
    type: "OFSE-GET-RID",
    cookieAllowed: true,
  };
}

export function getBasicRateDataServiceOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getBasicRateData
    }${id}`,
    type: "OFSE-BA-RA",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye ofertas de subusuarios
export function getServiceOffersByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByEntity
    }${id}/${page}/${pageSize}`,
    type: "OFSE-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye ofertas de subusuarios
export function getServiceOffersBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersBySubUser
    }${id}/${page}/${pageSize}`,
    type: "OFSE-GET-SUB",
    cookieAllowed: true,
  };
}

export function deleteServiceOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.delete
    }${id}`,
    type: "OFSE-DEL",
    cookieAllowed: true,
  };
}

export function culminateServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.culminate
    }`,
    type: "OFSE-CUL",
    cookieAllowed: true,
  };
}

export function getValidationServiceOfferService(
  userId: string,
  requirementId: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getValidation
    }${userId}/${requirementId}`,
    type: "OFSE-VAL",
    cookieAllowed: true,
  };
}

export function cancelServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.cancel
    }`,
    type: "OFSE-CAN",
    cookieAllowed: true,
  };
}

export function searchServiceOffersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.searchOffers
    }`,
    type: "OFSE-SE-OF",
    cookieAllowed: true,
  };
}

export function uploadDocsServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsOffer
    }`,
    type: "OFSE-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesOffer
    }`,
    type: "OFSE-IM-UP",
    cookieAllowed: true,
  };
}
