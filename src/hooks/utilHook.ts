import { App } from "antd";

export default function useShowNotification() {
  const { notification: api } = App.useApp();
  console.log(api);

  function showNotificationHook(
    type: "success" | "error" | "info" | "warning",
    description: string | null
  ) {
    console.log(api);
    if (api && description)
      api[type]({
        message: description,
        // description: description,
        showProgress: true,
        pauseOnHover: true,
        placement: "topRight",
      });
  }

  return { showNotificationHook };
}
