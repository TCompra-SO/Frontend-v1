import { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import { SystemNotificationData } from "../models/Interfaces";
import useShowNotification from "../hooks/utilHooks";

interface RequestQueueItem {
  response: any;
  error: AxiosError | null;
  errorMsg: string | null;
}

interface RequestContextType {
  executeAfterResponseOrError: (
    requestId: string,
    updates: Partial<RequestQueueItem>,
    SystemNotificationData?: SystemNotificationData
  ) => void;
  pushToRequestQueue: (
    requestId: string,
    functionToExecute: () => void
  ) => void;
}

export const RequestContext = createContext<RequestContextType>({
  pushToRequestQueue: () => {},
  executeAfterResponseOrError: () => {},
});

export function RequestProvider({ children }: { children: ReactNode }) {
  const { showNotification } = useShowNotification();
  const [requestQueue, setRequestQueue] = useState<
    Record<string, { functionToExecute: () => void }>
  >({});

  function pushToRequestQueue(
    requestId: string,
    functionToExecute: () => void
  ) {
    setRequestQueue((prevQueue) => ({
      ...prevQueue,
      [requestId]: { functionToExecute },
    }));
  }

  function executeAfterResponseOrError(
    requestId: string,
    updates: Partial<RequestQueueItem>,
    SystemNotificationData?: SystemNotificationData
  ) {
    if (SystemNotificationData) {
      showNotification(
        SystemNotificationData.type,
        SystemNotificationData.description
      );
    }
    requestQueue[requestId].functionToExecute();

    if (updates.response) {
      if (requestQueue[requestId]) {
      }
    } else if (updates.error) {
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
