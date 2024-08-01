import { HttpService } from "../models/Interfaces";
import { MainRoutes, Routes } from "../utilities/routes";

export const TLDsService: HttpService = {
  url: "https://data.iana.org/TLD/tlds-alpha-by-domain.txt",
  type: "",
};

export const countriesService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.countries
  }`,
  type: Routes.auth.countries,
};
