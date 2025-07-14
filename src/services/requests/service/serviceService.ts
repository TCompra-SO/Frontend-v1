import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function getServicesService(
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirements
    }${page}/${pageSize}`,
    type: "SE-GET-ALL",
    cookieAllowed: true,
  };
}

export function createServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.create
    }`,
    type: "SE-CRE",
    cookieAllowed: true,
  };
}

export function getServiceByIdService(
  reqId: string,
  showErrorMessage: boolean = true
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirement
    }${reqId}`,
    type: showErrorMessage ? "SE-GET-ID" : "",
    cookieAllowed: true,
  };
}

export function selectServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.selectOffer
    }`,
    type: "SE-SE-OF",
    cookieAllowed: true,
  };
}

export function getBasicRateDataServiceService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getBasicRateData
    }${id}`,
    type: "SE-BA-RA",
    cookieAllowed: true,
  };
}

export function deleteServiceService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.delete
    }${id}`,
    type: "SE-DEL",
    cookieAllowed: true,
  };
}

export function republishServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.republish
    }`,
    type: "SE-REP",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye requerimientos de subusuarios
export function getServicesByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirementsByEntity
    }${id}/${page}/${pageSize}`,
    type: "SE-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye requerimientos de subusuarios
export function getServicesBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirementsBySubUser
    }${id}/${page}/${pageSize}`,
    type: "SE-GET-SUB",
    cookieAllowed: true,
  };
}

export function culminateServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.culminate
    }`,
    type: "SE-CUL",
    cookieAllowed: true,
  };
}

export function cancelServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.cancel
    }`,
    type: "SE-CAN",
    cookieAllowed: true,
  };
}

export function homeServiceFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchMainFilters
    }`,
    type: "SE-HO-FI",
    cookieAllowed: true,
  };
}

export function searchServicesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchRequirements
    }`,
    type: "SE-SE-RE",
    cookieAllowed: true,
  };
}

export function uploadDocsServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "SE-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesReq
    }`,
    type: "SE-IM-UP",
    cookieAllowed: true,
  };
}
