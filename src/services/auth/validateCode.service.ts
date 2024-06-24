import { ValidateCodeRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export const validateCode = async (validateCodeData: ValidateCodeRequest) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}validate-code`;
  const response = await httpRequest<ValidateCodeRequest>(url, 'post', validateCodeData);
  return response;
}