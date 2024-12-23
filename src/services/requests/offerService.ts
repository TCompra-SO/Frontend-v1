import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function createOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.create
    }`,
    type: "OF-CRE",
  };
}

export function getOffersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffers
    }`,
    type: "OF-GET-ALL",
  };
}

export function getOfferByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getDetailOffer
    }${id}`,
    type: "OF-GET-ID",
  };
}

export function getOffersByRequirementIdService(
  reqId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByRequirement
    }${reqId}/${page}/${pageSize}`,
    type: "OF-GET-RID",
  };
}

export function getBasicRateDataOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getBasicRateData
    }${id}`,
    type: "OF-BA-RA",
  };
}

// Para cuentas principales (empresa y persona). Incluye ofertas de subusuarios
export function getOffersByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersByEntity
    }${id}/${page}/${pageSize}`,
    type: "OF-GET-ENT",
  };
}

// Para subusuarios + cuentas principales. No incluye ofertas de subusuarios
export function getOffersBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getOffersBySubUser
    }${id}/${page}/${pageSize}`,
    type: "OF-GET-SUB",
  };
}

export function deleteOfferService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.delete
    }${id}`,
    type: "OF-DEL",
  };
}

export function culminateOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.culminate
    }`,
    type: "OF-CUL",
  };
}

export function getValidationOfferService(
  userId: string,
  requirementId: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.getValidation
    }${userId}/${requirementId}`,
    type: "OF-VAL",
  };
}

export function cancelOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.offers}${
      ApiRoutes.offers.cancel
    }`,
    type: "OF-CAN",
  };
}
