import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function registerScoreService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.score}${
      ApiRoutes.score.registerScore
    }`,
    type: "SC-REG",
  };
}
