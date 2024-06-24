import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export const register = async (registerData: RegisterRequest) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}register`;
  const response = await httpRequest<RegisterRequest>(url, 'post', registerData);
  return response;
}