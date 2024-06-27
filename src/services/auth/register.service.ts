import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export default async function register(registerData: RegisterRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}register`;
  const response: any = await httpRequest<RegisterRequest>(url, 'post', registerData);
  return response;
}