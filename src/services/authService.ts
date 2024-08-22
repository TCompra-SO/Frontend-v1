import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export const loginService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.login
  }`,
  type: ApiRoutes.auth.login,
};

export const profileService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.profile
  }`,
  type: ApiRoutes.auth.profile,
};

export const registerService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.register
  }`,
  type: ApiRoutes.auth.register,
};

export const sendCodeService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.sendCode
  }`,
  type: ApiRoutes.auth.sendCode,
};

export const validateCodeService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
    ApiRoutes.auth.validateCode
  }`,
  type: ApiRoutes.auth.validateCode,
};
