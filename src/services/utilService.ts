import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export const TLDsService: HttpService = {
  url: "https://data.iana.org/TLD/tlds-alpha-by-domain.txt",
  type: "",
};

export const countriesService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.countries
  }`,
  type: ApiRoutes.auth.countries,
};

export const dummyService: HttpService = {
  url: "https://reqres.in/api/users",
  type: "",
};
