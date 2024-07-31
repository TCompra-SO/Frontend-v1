import { HttpService } from "../models/Interfaces";
import { MainRoutes, Routes } from "../utilities/routes";

export const loginService: HttpService = {
  url: `${import.meta.env.VITE_API_BASE_URL}${MainRoutes.auth}${
    Routes.auth.login
  }`,
  type: Routes.auth.login,
};
