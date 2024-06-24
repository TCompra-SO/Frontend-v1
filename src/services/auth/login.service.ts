import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export default function login (loginData: RegisterRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}login`;
  const response = httpRequest<RegisterRequest>(url, 'post', loginData);
  return response;
}