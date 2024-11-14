import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function uploadAvatarService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.image}${
      ApiRoutes.image.uploadAvatar
    }`,
    type: "IM-UP-AV",
  };
}

export function uploadImagesRequirementService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImages
    }`,
    type: "IM-REQ-UP",
  };
}

export function uploadImagesOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${ApiMainRoutes.images}${
      ApiRoutes.images.uploadImages
    }`,
    type: "IM-OFF-UP",
  };
}
