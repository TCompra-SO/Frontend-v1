import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export function loginService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.login
    }`,
    type: ApiRoutes.auth.login,
  };
}

export function profileCompanyService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileCompany
    }`,
    type: ApiRoutes.auth.profileCompany,
  };
}

export function profileUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileUser
    }`,
    type: ApiRoutes.auth.profileUser,
  };
}

export function registerService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.register
    }`,
    type: ApiRoutes.auth.register,
  };
}

export function sendCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.sendCode
    }`,
    type: ApiRoutes.auth.sendCode,
  };
}

export function validateCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.validateCode
    }`,
    type: ApiRoutes.auth.validateCode,
  };
}
