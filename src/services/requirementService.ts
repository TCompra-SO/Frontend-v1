import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export function getRequirementsService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.requirements
    }${ApiRoutes.requirements.getRequeriments}`,
    type: "RE-REG",
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
