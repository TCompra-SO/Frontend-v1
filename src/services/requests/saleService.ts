import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function createSaleService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.requirement}${
      ApiRoutes.requirement.create
    }`,
    type: "SA-CRE",
  };
}
