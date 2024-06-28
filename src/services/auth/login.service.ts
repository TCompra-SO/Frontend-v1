import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function login (loginData: RegisterRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.login}`;
  const response = await httpRequest<RegisterRequest>(url, 'post', Routes.auth.login, loginData);
  return response;
}