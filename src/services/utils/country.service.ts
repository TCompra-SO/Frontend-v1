import { CountriesRequest } from "../../models/Auth";
import httpRequest from "../../utilities/requests/httpRequest";
import { MainRoutes, Routes } from "../../utilities/routes";

export default async function getCountries (data: CountriesRequest) {
  const url = `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${Routes.auth.countries}`;
  const response = await httpRequest<CountriesRequest>(url, 'post', Routes.auth.countries, data);
  return response;
}