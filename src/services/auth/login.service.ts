import { LoginRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/postRequest";

export default async function login (loginData: LoginRequest) {
  const url = 'x';
  const response = await httpRequest<LoginRequest>(url, 'post', loginData);
  return response;
}