import { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import { Action } from "../utilities/types";
import { NotificationData } from "../models/Interfaces";
import { App } from "antd";
import showNotification from "../utilities/notification/showNotification";
import useShowNotification from "../hooks/utilHook";

interface RequestQueueItem {
  response: any;
  error: AxiosError | null;
  errorMsg: string | null;
}

interface RequestContextType {
  executeAfterResponseOrError: (
    requestId: string,
    updates: Partial<RequestQueueItem>,
    notificationData?: NotificationData
  ) => void;
  pushToRequestQueue: (
    requestId: string,
    action: Action,
    functionToExecute: () => void
  ) => void;
}

export const RequestContext = createContext<RequestContextType>({
  pushToRequestQueue: () => {},
  executeAfterResponseOrError: () => {},
});

export function RequestProvider({ children }: { children: ReactNode }) {
  const { notification } = App.useApp();
  const { showNotificationHook } = useShowNotification();
  const [requestQueue, setRequestQueue] = useState<
    Record<string, { action: Action; functionToExecute: () => void }>
  >({});

  function pushToRequestQueue(
    requestId: string,
    action: Action,
    functionToExecute: () => void
  ) {
    setRequestQueue((prevQueue) => ({
      ...prevQueue,
      [requestId]: { action, functionToExecute },
    }));
  }

  function executeAfterResponseOrError(
    requestId: string,
    updates: Partial<RequestQueueItem>,
    notificationData?: NotificationData
  ) {
    // if (notificationData) {
    //   showNotification(
    //     notification,
    //     notificationData.type,
    //     notificationData.description
    //   );
    // }
    if (updates.response) {
      if (requestQueue[requestId]) {
        requestQueue[requestId].functionToExecute();
        console.log("444444");
      }
    } else if (updates.error) {
      console.log("44444dd4");
    }
    setRequestQueue((prevQueue) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [requestId]: _, ...rest } = prevQueue;
      return rest;
    });
  }

  return (
    <RequestContext.Provider
      value={{
        pushToRequestQueue,
        executeAfterResponseOrError,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
