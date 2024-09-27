import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export function registerSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.register
    }`,
    type: "SU-REG",
  };
}
