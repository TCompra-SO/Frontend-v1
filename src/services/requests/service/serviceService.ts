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
  };
}

export function createServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.create
    }`,
    type: "SE-CRE",
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
  };
}

export function selectServiceOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.selectOffer
    }`,
    type: "SE-SE-OF",
  };
}

export function getBasicRateDataServiceService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getBasicRateData
    }${id}`,
    type: "SE-BA-RA",
  };
}

export function deleteServiceService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.delete
    }${id}`,
    type: "SE-DEL",
  };
}

export function republishServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.republish
    }`,
    type: "SE-REP",
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
  };
}

export function culminateServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.culminate
    }`,
    type: "SE-CUL",
  };
}

export function cancelServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.cancel
    }`,
    type: "SE-CAN",
  };
}

export function homeServiceFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchMainFilters
    }`,
    type: "SE-HO-FI",
  };
}

export function searchServicesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchRequirements
    }`,
    type: "SE-SE-RE",
  };
}

export function uploadDocsServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "SE-DO-UP",
  };
}

export function uploadImagesServiceService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesReq
    }`,
    type: "SE-IM-UP",
  };
}
