import axios, { AxiosResponse } from "axios";
import { HttpObject } from "../../models/HttpObject";
import { useState } from "react";

export default async function httpRequest<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  dataToSend?: T
): Promise<HttpObject> {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
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

    setData(response.data);
    setLoading(false);
  } catch (err) {
    setError('Error al obtener datos');
    setLoading(false);
    console.error('HTTP Request Error:', err);
  }

  return { data, loading, error };
}