import { HttpObject } from "../models/HttpObject";

type CallbackFunction = () => Promise<HttpObject>;

function useGet( CallbackFunction: CallbackFunction) {
  const response = CallbackFunction();
  return response;
}

export default useGet;