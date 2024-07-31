import { HttpObject } from "../models/Interfaces";

type CallbackFunction = () => Promise<HttpObject>;

function useGet(CallbackFunction: CallbackFunction) {
  const response = CallbackFunction();
  return response;
}

export default useGet;
