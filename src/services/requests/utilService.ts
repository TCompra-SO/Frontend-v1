import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function TLDsService(): HttpService {
  return {
    url: "https://data.iana.org/TLD/tlds-alpha-by-domain.txt",
    type: "",
    cookieAllowed: false,
  };
}

export function countriesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.countries
    }`,
    type: "UT-COU",
    cookieAllowed: true,
  };
}

export function categoriesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.categories
    }`,
    type: "UT-CAT",
    cookieAllowed: true,
  };
}

export function tenureService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.utilData.name
    }${ApiRoutes.util.utilData.items.tenure}`,
    type: "UT-TEN",
    cookieAllowed: true,
  };
}

export function currencyService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.utilData.name
    }${ApiRoutes.util.utilData.items.currency}`,
    type: "UT-CUR",
    cookieAllowed: true,
  };
}

export function paymentMethodService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.utilData.name
    }${ApiRoutes.util.utilData.items.methodPayment}`,
    type: "UT-PA-ME",
    cookieAllowed: true,
  };
}

export function deliveryTimeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.utilData.name
    }${ApiRoutes.util.utilData.items.deliveryTime}`,
    type: "UT-DE-TI",
    cookieAllowed: true,
  };
}

export function whoCanOfferService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.utilData.name
    }${ApiRoutes.util.utilData.items.typeBidders}`,
    type: "UT-WH-CA-OF",
    cookieAllowed: true,
  };
}

export function getNameReniecService(doc: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.root.getName
    }${doc}`,
    type: "UT-GE-NA-RE",
    cookieAllowed: true,
  };
}

export function userRolesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.userRoles
    }`,
    type: "UT-US-RO",
    cookieAllowed: true,
  };
}

export function chatBotService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.util}${
      ApiRoutes.util.chatBot
    }`,
    type: "UT-CH-BO",
    cookieAllowed: true,
  };
}
