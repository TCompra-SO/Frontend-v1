import { App } from "antd";
import { useTranslation } from "react-i18next";

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

export function useShowLoadingMessage() {
  const { message } = App.useApp();
  const { t } = useTranslation();

  function showLoadingMessage(
    show: boolean | undefined,
    textKey: string = "loading"
  ) {
    // console.log(textKey, show);
    // const message = getMessageApi();
    if (message && show) {
      message.open({
        type: "loading",
        content: t(textKey),
        duration: 0,
      });
    }
    if (show === false && message) message.destroy();
  }

  return { showLoadingMessage };
}
