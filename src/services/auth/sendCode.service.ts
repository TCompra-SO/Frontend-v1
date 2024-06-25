import { SendCodeRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export default async function sendCode(sendCodeData: SendCodeRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}validation-code`;
  const response = await httpRequest<SendCodeRequest>(url, 'post', sendCodeData);
  return response;
}