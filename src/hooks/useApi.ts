import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { SystemNotificationData, useApiParams } from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import {
  ErrorMsgRequestType,
  ErrorRequestType,
  ResponseRequestType,
} from "../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { csrfTokenName } from "../utilities/globals";
import { getAxiosConfig, getCookie } from "../utilities/globalFunctions";

export interface UseApiType {
  saveInQueue?: boolean;
  functionToExecute: (
    response: ResponseRequestType,
    error: ErrorRequestType,
    errorMsg: ErrorMsgRequestType
  ) => void;
  SystemNotificationData?: SystemNotificationData;
}

export default function useApi<T = any>(
  apiParams: useApiParams<T>,
  { functionToExecute }: UseApiType = {
    saveInQueue: false,
    functionToExecute: () => {},
    SystemNotificationData: {
      type: "error",
      description: null,
    },
  },
  useReduxToken?: boolean
) {
  const { service } = apiParams;
  let reduxToken: string | undefined = useSelector(
    (state: MainState) => state.user.token
  );
  reduxToken = useReduxToken ? reduxToken : undefined;
  const csrfToken = getCookie(csrfTokenName);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [responseData, setResponseData] = useState<ResponseRequestType>(null);
  const [errorMsg, setErrorMsg] = useState<ErrorMsgRequestType>(null);
  const [error, setError] = useState<ErrorRequestType>(null);

  useEffect(() => {
    if (responseData || error) functionToExecute(responseData, error, errorMsg);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function fetchData() {
    reset();
    if (service) {
      const config = getAxiosConfig(apiParams, reduxToken, csrfToken);
      if (config) {
        setLoading(true);
        try {
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
    }
  }

  function reset() {
    setResponseData(null);
    setErrorMsg(null);
    setError(null);
    setLoading(undefined);
  }

  return { loading, responseData, error, errorMsg, fetchData, reset };
}
