import { ProfileRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function createProfile(profileData: ProfileRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.profile}`;
  const response = await httpRequest<ProfileRequest>(url, 'post', Routes.auth.profile, profileData);
  return response;
}