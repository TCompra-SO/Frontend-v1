import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function getAllPlansService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.plan}${
      ApiRoutes.plan.getAllPlans
    }`,
    type: "PL-GE-AL",
  };
}
