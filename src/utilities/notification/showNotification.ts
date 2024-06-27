import { NotificationInstance } from "antd/es/notification/interface";

export default function showNotification(api: NotificationInstance, type: 'success' | 'error' | 'info' | 'warning', description: string) {
  if (api)
    api[type]({
      message: description,
      // description: description,
      showProgress: true,
      pauseOnHover: true,
      placement: 'topRight'
    });
}