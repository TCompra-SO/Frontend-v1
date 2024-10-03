import { HttpService } from "../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

export function registerSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.register
    }`,
    type: "SU-REG",
  };
}

export function getSubUserService(uid: String): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.root
    }${uid}`,
    type: "SU-GET",
  };
}

export function changeRoleSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.changeRole
    }`,
    type: "SU-CH-RO",
  };
}

export function updateProfileSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.update
    }`,
    type: "SU-UP-PR",
  };
}
