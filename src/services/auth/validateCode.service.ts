import { ValidateCodeRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/postRequest";

export const validateCode = async (validateCodeData: ValidateCodeRequest) => {
  const url = 'x';
  const response = await httpRequest<ValidateCodeRequest>(url, 'post', validateCodeData);
  return response;
}