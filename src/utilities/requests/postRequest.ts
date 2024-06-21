import axios from "axios";

export default async function httpRequest<T>(url: string, method: 'get' | 'post' | 'put' | 'delete', dataToSend?: T) {
  let loading: boolean = false;
  let data = null;
  let error: string | null = null;

  try {
    loading = true;
    let response;
    switch(method) {
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
    error = "Error al obtener datos";
    loading = false;
  }

  return {
    data, loading, error
  }
}