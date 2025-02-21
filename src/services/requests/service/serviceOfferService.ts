import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function createServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.create
    }`,
    type: "OFSE-CRE",
  };
}

export function getServiceOfferByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getDetailOffer
    }${id}`,
    type: "OFSE-GET-ID",
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
  };
}

export function getBasicRateDataServiceOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getBasicRateData
    }${id}`,
    type: "OFSE-BA-RA",
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
  };
}

export function deleteServiceOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.delete
    }${id}`,
    type: "OFSE-DEL",
  };
}

export function culminateServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.culminate
    }`,
    type: "OFSE-CUL",
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
  };
}

export function cancelServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.cancel
    }`,
    type: "OFSE-CAN",
  };
}

export function searchServiceOffersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.searchOffers
    }`,
    type: "OFSE-SE-OF",
  };
}

export function uploadDocsServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsOffer
    }`,
    type: "OFSE-DO-UP",
  };
}

export function uploadImagesServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesOffer
    }`,
    type: "OFSE-IM-UP",
  };
}
