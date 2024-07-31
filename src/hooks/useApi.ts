import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { useApiParams } from "../models/Interfaces";

export default function useApi<T = any>({
  service,
  method,
  dataToSend,
}: useApiParams<T>) {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  console.log("aaaaaa", error);
  async function fetchData() {
    if (service) {
      console.log(dataToSend);
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

        setResponseData(result.data);
      } catch (err) {
        console.log("=====", err);
        setError(err as AxiosError);
        const errorMsg_ = httpErrorInterceptor(err, service.type);
        setErrorMsg(errorMsg_);
      } finally {
        setLoading(false);
      }
    }
  }

  return { loading, responseData, error, errorMsg, fetchData };
}
