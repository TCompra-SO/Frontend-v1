import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function registerSubUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.register
    }`,
    type: "SU-REG",
  };
}

export function getSubUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.getUser
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

export function getSubUsersByEntityService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.subUser}${
      ApiRoutes.subUser.getSubUsersByEntity
    }${id}`,
    type: "SU-GET-ENT",
  };
}
