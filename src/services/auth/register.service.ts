import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/postRequest";

export const register = async (registerData: RegisterRequest) => {
  const url = 'x';
  const response = await httpRequest<RegisterRequest>(url, 'post', registerData);
  return response;
}