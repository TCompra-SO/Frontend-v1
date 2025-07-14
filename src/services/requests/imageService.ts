import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function uploadAvatarService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.image}${
      ApiRoutes.image.uploadAvatar
    }`,
    type: "IM-UP-AV",
    cookieAllowed: true,
  };
}
