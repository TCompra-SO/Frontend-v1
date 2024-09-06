import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export function TLDsService(): HttpService {
  return {
    url: "https://data.iana.org/TLD/tlds-alpha-by-domain.txt",
    type: "",
  };
}

export function countriesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.countries
    }`,
    type: ApiRoutes.util.countries,
  };
}

export function categoriesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.categories
    }`,
    type: ApiRoutes.util.categories,
  };
}

export function tenureService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.tenure
    }`,
    type: ApiRoutes.util.tenure,
  };
}

export function getNameReniecService(doc: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.root.getName
    }${doc}`,
    type: ApiRoutes.root.getName,
  };
}
