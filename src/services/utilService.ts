import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export const TLDsService: HttpService = {
  url: "https://data.iana.org/TLD/tlds-alpha-by-domain.txt",
  type: "",
};

export const countriesService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
    ApiRoutes.util.countries
  }`,
  type: ApiRoutes.util.countries,
};

export const categoriesService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
    ApiRoutes.util.categories
  }`,
  type: ApiRoutes.util.categories,
};

export const tenureService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
    ApiRoutes.util.tenure
  }`,
  type: ApiRoutes.util.tenure,
};

export const getNameReniecService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiRoutes.root.getName}`,
  type: ApiRoutes.root.getName,
};
