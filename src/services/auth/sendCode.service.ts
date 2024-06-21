import { SendCodeRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/postRequest";

export const sendCode = async (sendCodeData: SendCodeRequest) => {
  const url = 'x';
  const response = await httpRequest<SendCodeRequest>(url, 'post', sendCodeData);
  return response;
}