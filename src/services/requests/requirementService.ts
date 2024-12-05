import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function getRequirementsService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequirements}`,
    type: "RE-GET-ALL",
  };
}

export function createRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.create}`,
    type: "RE-CRE",
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
  };
}

export function selectOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.selectOffer}`,
    type: "RE-SE-OF",
  };
}

export function getBasicRateDataReqService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getBasicRateData}${id}`,
    type: "RE-BA-RA",
  };
}

export function deleteRequirementService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.delete}${id}`,
    type: "RE-DEL",
  };
}

export function republishRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.republish}`,
    type: "RE-REP",
  };
}

// Para cuentas principales (empresa y persona). Incluye requerimientos de subusuarios
export function getRequirementsByEntityService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequirementsByEntity}${id}`,
    type: "RE-GET-ENT",
  };
}

// Para subusuarios + cuentas principales. No incluye requerimientos de subusuarios
export function getRequirementsBySubUserService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequirementsBySubUser}${id}`,
    type: "RE-GET-SUB",
  };
}

export function culminateRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.culminate}`,
    type: "RE-CUL",
  };
}

export function cancelRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.cancel}`,
    type: "RE-CAN",
  };
}
