import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { useApiParams } from "../models/Interfaces";
import { useTranslation } from "react-i18next";

export default function useApi<T = any>({
  service,
  method,
  dataToSend,
  token,
}: useApiParams<T>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError<any, any> | null>(null);

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
        setError(err as AxiosError);
        const errorMsg_ = t(httpErrorInterceptor(err, service.type));
        setErrorMsg(errorMsg_);
      } finally {
        setLoading(false);
      }
    }
  }

  return { loading, responseData, error, errorMsg, fetchData };
}
