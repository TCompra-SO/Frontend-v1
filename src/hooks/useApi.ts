import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { useApiParams } from "../models/Interfaces";
import { useTranslation } from "react-i18next";

export default function useApi<T = any>({
  service,
  method,
  dataToSend,
}: useApiParams<T>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  async function fetchData() {
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
          // headers: {
          //   Authorization: service.bearerToken
          //     ? `Bearer ${service.bearerToken}`
          //     : undefined,
          //   "Content-Type": "application/json",
          // },
        };
        const result: AxiosResponse = await axios(config);
        console.log("http request");
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