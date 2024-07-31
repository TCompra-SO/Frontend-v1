import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import httpErrorInterceptor from "../interceptors/httpErrorInterceptor";
import { HttpService } from "../models/Interfaces";

export default function useApi<T = any>(
  httpService: HttpService,
  method: "get" | "post" | "put" | "delete",
  dataToSend?: T
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  async function fetch() {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        method: method,
        url: httpService.url,
        data: dataToSend,
        // headers: {
        //   Authorization: service.bearerToken
        //     ? `Bearer ${service.bearerToken}`
        //     : undefined,
        //   "Content-Type": "application/json",
        // },
      };
      const result: AxiosResponse = await axios(config);
      setData(result.data);
    } catch (err) {
      console.log("=====", err);
      setError(err as AxiosError);
      const errorMsg_ = httpErrorInterceptor(err, httpService.type);
      setErrorMsg(errorMsg_);
    } finally {
      setLoading(false);
    }
  }

  return { loading, data, error, errorMsg, fetch };
}
