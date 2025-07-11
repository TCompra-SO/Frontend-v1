import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function registerSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.register
    }`,
    type: "SU-REG",
    cookieAllowed: true,
  };
}

export function getSubUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.getUser
    }${uid}`,
    type: "SU-GET",
    cookieAllowed: true,
  };
}

export function changeRoleSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.changeRole
    }`,
    type: "SU-CH-RO",
    cookieAllowed: true,
  };
}

export function updateProfileSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.update
    }`,
    type: "SU-UP-PR",
    cookieAllowed: true,
  };
}

export function searchSubUsersService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.searchSubUser
    }`,
    type: "SU-SE",
    cookieAllowed: true,
  };
}

export function changeStatusSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.changeStatus
    }`,
    type: "SU-UP-ST",
    cookieAllowed: true,
  };
}
