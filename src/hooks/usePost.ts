import { HttpObject } from "../models/Interfaces";

type CallbackFunction<T> = (data: T) => Promise<HttpObject>;

function usePost<T>(CallbackFunction: CallbackFunction<T>, dataToSend: T) {
  const response = CallbackFunction(dataToSend);
  return response;
}

export default usePost;
