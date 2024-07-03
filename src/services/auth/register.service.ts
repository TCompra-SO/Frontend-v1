import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function register(registerData: RegisterRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.register}`;
  const response: any = await httpRequest<RegisterRequest>(url, 'post', Routes.auth.register, registerData);
  return response;
}