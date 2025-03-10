import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function getNotificationsService(
  userId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.notification}${
      ApiRoutes.notification.getNotifications
    }${userId}/${page}/${pageSize}`,
    type: "NO-GET",
  };
}
