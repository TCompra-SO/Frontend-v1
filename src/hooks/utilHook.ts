import { App } from "antd";

export default function useShowNotification() {
  const { notification: api } = App.useApp();

  function showNotification(
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

  return { showNotification };
}
