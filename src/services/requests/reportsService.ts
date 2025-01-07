import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function getStatisticsService(companyId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.reports}${
      ApiRoutes.reports.statistics
    }${companyId}`,
    type: "RE-ST",
  };
}
