import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function uploadDocsRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsReq
    }`,
    type: "DO-REQ-UP",
  };
}

export function uploadDocsOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.documents}${
      ApiRoutes.documents.uploadDocumentsOffer
    }`,
    type: "DO-OFF-UP",
  };
}
