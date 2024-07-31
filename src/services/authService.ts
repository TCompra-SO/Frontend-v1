import { HttpService } from "../models/Interfaces";
import { MainRoutes, Routes } from "../utilities/routes";

export const loginService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.login
  }`,
  type: Routes.auth.login,
};

export const profileService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.profile
  }`,
  type: Routes.auth.profile,
};

export const registerService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.register
  }`,
  type: Routes.auth.register,
};

export const sendCodeService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.sendCode
  }`,
  type: Routes.auth.sendCode,
};

export const validateCodeService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.validateCode
  }`,
  type: Routes.auth.validateCode,
};
