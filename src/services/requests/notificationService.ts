import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function getNotificationsService(
  mainUserId: string,
  userId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.notification}${
      ApiRoutes.notification.getNotifications
    }${mainUserId}/${userId}/${page}/${pageSize}`,
    type: "NO-GET",
  };
}

export function readNotificationService(notificationId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.notification}${
      ApiRoutes.notification.readNotification
    }${notificationId}`,
    type: "NO-REA",
  };
}

export function getUnreadNotificationsCounterService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.notification}${
      ApiRoutes.notification.getUnreadNotificationsCounter
    }`,
    type: "NO-UN-CO",
  };
}
