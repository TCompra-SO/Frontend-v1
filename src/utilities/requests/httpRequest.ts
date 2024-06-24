import axios, { AxiosResponse } from "axios";
import { HttpObject } from "../../models/HttpObject";

export default async function httpRequest<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  dataToSend?: T
): Promise<HttpObject> {
  let loading = true;
  let data: any = null;
  let error: string | null = null;
  
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
    loading = false;
  } catch (err) {
    error = 'Error al obtener datos';
    loading = false;
    console.error('HTTP Request Error:', err);
  }

  return { data, loading, error };
}