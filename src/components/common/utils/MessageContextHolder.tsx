import { message as antdMessage } from "antd";
import { useEffect } from "react";

let globalMessageApi: any;

export function MessageContextHolder() {
  const [messageApi, contextHolder] = antdMessage.useMessage();

  useEffect(() => {
    globalMessageApi = messageApi;
  }, [messageApi]);

  return <>{contextHolder}</>;
}

export default function getMessageApi() {
  return globalMessageApi;
}
