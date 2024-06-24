import { ProfileRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { Routes } from "../../utilities/routes";

export const createProfile = async (profileData: ProfileRequest) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}${Routes.auth}profile`;
  const response = await httpRequest<ProfileRequest>(url, 'post', profileData);
  return response;
}