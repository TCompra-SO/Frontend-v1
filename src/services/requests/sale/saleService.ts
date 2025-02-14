import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";

export function getSalesService(page: number, pageSize: number): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getRequirements
    }${page}/${pageSize}`,
    type: "SA-GET-ALL",
  };
}

export function createSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.create
    }`,
    type: "SA-CRE",
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
  };
}

export function selectSaleOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.selectOffer
    }`,
    type: "SA-SE-OF",
  };
}

export function getBasicRateDataSaleService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.getBasicRateData
    }${id}`,
    type: "SA-BA-RA",
  };
}

export function deleteSaleService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.delete
    }${id}`,
    type: "SA-DEL",
  };
}

export function republishSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.republish
    }`,
    type: "SA-REP",
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
  };
}

export function culminateSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.culminate
    }`,
    type: "SA-CUL",
  };
}

export function cancelSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.cancel
    }`,
    type: "SA-CAN",
  };
}

export function homeSaleFilterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchMainFilters
    }`,
    type: "SA-HO-FI",
  };
}

export function searchSalesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirements}${
      ApiRoutes.requirements.searchRequirements
    }`,
    type: "SA-SE-RE",
  };
}

export function uploadDocsSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "SA-DO-UP",
  };
}

export function uploadImagesSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImagesReq
    }`,
    type: "SA-IM-UP",
  };
}
