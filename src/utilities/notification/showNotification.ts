import { NotificationInstance } from "antd/es/notification/interface";
import { MessageInstance } from "antd/lib/message/interface";

export default function showNotification(
  api: NotificationInstance,
  type: "success" | "error" | "info" | "warning",
  description: string | null
) {
  if (api && description)
    api[type]({
      message: description,
      // description: description,
      showProgress: true,
      pauseOnHover: true,
      placement: "topRight",
    });
}

export function showLoadingMessage(
  message: MessageInstance,
  text: string = "Cargando..."
) {
  if (message)
    message.open({
      type: "loading",
      content: text,
      duration: 0,
    });
}

export function destroyMessage(message: MessageInstance) {
  message.destroy();
}
