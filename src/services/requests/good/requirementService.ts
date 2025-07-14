import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function getRequirementsService(
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequirements}${page}/${pageSize}`,
    type: "RE-GET-ALL",
    cookieAllowed: true,
  };
}

export function createRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.create}`,
    type: "RE-CRE",
    cookieAllowed: true,
  };
}

export function getRequirementByIdService(
  reqId: string,
  showErrorMessage: boolean = true
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequirement}${reqId}`,
    type: showErrorMessage ? "RE-GET-ID" : "",
    cookieAllowed: true,
  };
}

export function selectRequirementOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.selectOffer}`,
    type: "RE-SE-OF",
    cookieAllowed: true,
  };
}

export function getBasicRateDataReqService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getBasicRateData}${id}`,
    type: "RE-BA-RA",
    cookieAllowed: true,
  };
}

export function deleteRequirementService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.delete}${id}`,
    type: "RE-DEL",
    cookieAllowed: true,
  };
}

export function republishRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.republish}`,
    type: "RE-REP",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye requerimientos de subusuarios
export function getRequirementsByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${
      ApiRoutes.requirements.getRequirementsByEntity
    }${id}/${page}/${pageSize}`,
    type: "RE-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye requerimientos de subusuarios
export function getRequirementsBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${
      ApiRoutes.requirements.getRequirementsBySubUser
    }${id}/${page}/${pageSize}`,
    type: "RE-GET-SUB",
    cookieAllowed: true,
  };
}

export function culminateRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.culminate}`,
    type: "RE-CUL",
    cookieAllowed: true,
  };
}

export function cancelRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.cancel}`,
    type: "RE-CAN",
    cookieAllowed: true,
  };
}

export function homeRequirementFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.searchMainFilters}`,
    type: "RE-HO-FI",
    cookieAllowed: true,
  };
}

export function searchRequirementsService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.searchRequirements}`,
    type: "RE-SE-RE",
    cookieAllowed: true,
  };
}

export function uploadDocsRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "RE-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesReq
    }`,
    type: "RE-IM-UP",
    cookieAllowed: true,
  };
}
