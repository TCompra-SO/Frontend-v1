import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function getSalesService(page: number, pageSize: number): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirements
    }${page}/${pageSize}`,
    type: "SA-GET-ALL",
    cookieAllowed: true,
  };
}

export function createSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.create
    }`,
    type: "SA-CRE",
    cookieAllowed: true,
  };
}

export function getSaleByIdService(
  reqId: string,
  showErrorMessage: boolean = true
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirement
    }${reqId}`,
    type: showErrorMessage ? "SA-GET-ID" : "",
    cookieAllowed: true,
  };
}

export function selectSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.selectOffer
    }`,
    type: "SA-SE-OF",
    cookieAllowed: true,
  };
}

export function getBasicRateDataSaleService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getBasicRateData
    }${id}`,
    type: "SA-BA-RA",
    cookieAllowed: true,
  };
}

export function deleteSaleService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.delete
    }${id}`,
    type: "SA-DEL",
    cookieAllowed: true,
  };
}

export function republishSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.republish
    }`,
    type: "SA-REP",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye requerimientos de subusuarios
export function getSalesByEntityService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirementsByEntity
    }${id}/${page}/${pageSize}`,
    type: "SA-GET-ENT",
    cookieAllowed: true,
  };
}

// Para subusuarios + cuentas principales. No incluye requerimientos de subusuarios
export function getSalesBySubUserService(
  id: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirementsBySubUser
    }${id}/${page}/${pageSize}`,
    type: "SA-GET-SUB",
    cookieAllowed: true,
  };
}

export function culminateSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.culminate
    }`,
    type: "SA-CUL",
    cookieAllowed: true,
  };
}

export function cancelSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.cancel
    }`,
    type: "SA-CAN",
    cookieAllowed: true,
  };
}

export function adminHomeSaleFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchMainFiltersAdmin
    }`,
    type: "SA-AD-FI",
    cookieAllowed: true,
  };
}

export function homeSaleFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchMainFilters
    }`,
    type: "SA-HO-FI",
    cookieAllowed: true,
  };
}

export function searchSalesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchRequirements
    }`,
    type: "SA-SE-RE",
    cookieAllowed: true,
  };
}

export function uploadDocsSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "SA-DO-UP",
    cookieAllowed: true,
  };
}

export function uploadImagesSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesReq
    }`,
    type: "SA-IM-UP",
    cookieAllowed: true,
  };
}

export function validateSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.validate
    }`,
    type: "SA-VAL",
    cookieAllowed: true,
  };
}
