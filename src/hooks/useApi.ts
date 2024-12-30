import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { NotificationData, useApiParams } from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import { RequestContext } from "../contexts/RequestContext";
import { generateShortId } from "../utilities/globalFunctions";
import { Action } from "../utilities/types";

export default function useApi<T = any>(
  { service, method, dataToSend, token }: useApiParams<T>,
  {
    saveInQueue,
    action,
    functionToExecute,
    notificationData,
  }: {
    saveInQueue: boolean;
    action: Action;
    functionToExecute: () => void;
    notificationData?: NotificationData;
  } = {
    saveInQueue: false,
    action: Action.NONE,
    functionToExecute: () => {},
    notificationData: {
      type: "error",
      description: null,
    },
  }
) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError<any, any> | null>(null);
  const { pushToRequestQueue, executeAfterResponseOrError } =
    useContext(RequestContext);
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    if (responseData || error)
      if (saveInQueue) {
        console.log("inuseapi");
        executeAfterResponseOrError(
          requestId,
          {
            response: responseData,
            error,
            errorMsg,
          },
          notificationData
        );
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function fetchData(includeHeader: boolean = true) {
    setResponseData(null);
    setErrorMsg(null);
    setError(null);

    if (service) {
      setLoading(true);
      try {
        const config: AxiosRequestConfig = {
          method: method,
          url: service.url,
          data: dataToSend,
          headers: includeHeader
            ? {
                Authorization: token ? `Bearer ${token}` : undefined,
                "Content-Type": "application/json",
              }
            : {
                Authorization: token ? `Bearer ${token}` : undefined,
              },
        };
        // console.log(config);
        const result: AxiosResponse = await axios(config);
        setResponseData(result.data);
      } catch (err) {
        console.log("HTTP error:", err);
        const errorMsg_ = t(httpErrorInterceptor(err, service.type));
        setErrorMsg(errorMsg_);
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    }

    if (saveInQueue) {
      const id = generateShortId();
      setRequestId(id);
      pushToRequestQueue(id, action, functionToExecute);
    }
  }

  return { loading, responseData, error, errorMsg, fetchData };
}
