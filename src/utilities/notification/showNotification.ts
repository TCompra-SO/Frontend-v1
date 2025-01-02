import { MessageInstance } from "antd/lib/message/interface";

export function showLoadingMessage(
  message: MessageInstance,
  show: boolean | undefined,
  text: string = "Cargando..."
) {
  if (message && show)
    message.open({
      type: "loading",
      content: text,
      duration: 0,
    });
  if (!show) message.destroy();
}
