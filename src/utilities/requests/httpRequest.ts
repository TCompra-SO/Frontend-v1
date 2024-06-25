import axios, { AxiosResponse } from "axios";
import { HttpObject } from "../../models/HttpObject";
// import { useState } from "react";

export default async function httpRequest<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  dataToSend?: T
): Promise<HttpObject> {
  // const [loading, setLoading] = useState(true);
  let loading = true;
  let data: any = null;
  let error: {default: string, msg: string} | null = null;
  
  try {
    let response: AxiosResponse;
    
    switch (method) {
      case 'get':
        response = await axios.get(url);
        break;
      case 'post':
        response = await axios.post(url, dataToSend);
        break;
      case 'put':
        response = await axios.put(url, dataToSend);
        break;
      case 'delete':
        response = await axios.delete(url);
        break;
    }

    data = response.data;
    // setLoading(false);
    loading = false;
  } catch (err: any) {
    error = { default: 'Error al obtener datos', msg: err.response.data.msg };
    // setLoading(false);
    loading = false;
    console.error('HTTP Request Error:', err);
  }

  return { data, loading, error };
}