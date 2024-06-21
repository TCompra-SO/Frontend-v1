import { ProfileRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/postRequest";

export const createProfile = async (profileData: ProfileRequest) => {
  const url = 'x';
  const response = await httpRequest<ProfileRequest>(url, 'post', profileData);
  return response;
}