import { SendCodeRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function sendCode(sendCodeData: SendCodeRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.sendCode}`;
  const response = await httpRequest<SendCodeRequest>(url, 'post', Routes.auth.sendCode, sendCodeData);
  return response;
}