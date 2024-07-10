import { ValidateCodeRequest } from "../../models/Requests";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function validateCode(validateCodeData: ValidateCodeRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.validateCode}`;
  const response = await httpRequest<ValidateCodeRequest>(url, 'post', Routes.auth.validateCode, validateCodeData);
  return response;
}