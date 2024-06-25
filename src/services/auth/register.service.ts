import { RegisterRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";
import sendCode from "./sendCode.service";

export default async function register(registerData: RegisterRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}register`;
  const response: any = await httpRequest<RegisterRequest>(url, 'post', registerData);
  const sendCodeResp = await sendCode({email: registerData.email, type: 'identity_verified'});
  response['sendCodeResp'] = sendCodeResp;
  return response;
}