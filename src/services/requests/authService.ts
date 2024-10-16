import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function loginService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.login
    }`,
    type: "AU-LOG",
  };
}

export function profileCompanyService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileCompany
    }`,
    type: "AU-PR-CO",
  };
}

export function profileUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileUser
    }`,
    type: "AU-PR-US",
  };
}

export function registerService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.register
    }`,
    type: "AU-REG",
  };
}

export function sendCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.sendCode
    }`,
    type: "AU-SE-CO",
  };
}

export function validateCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.validateCode
    }`,
    type: "AU-VA-CO",
  };
}

export function sendCodeRecoveryService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.sendCodeRecovery
    }`,
    type: "AU-SE-CO-RE",
  };
}

export function recoverPasswordService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.recoverPassword
    }`,
    type: "AU-RE-PA",
  };
}

export function newPasswordService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.newPassword
    }`,
    type: "AU-NE-PA",
  };
}

export function getBaseDataUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.getBaseDataUser
    }${uid}`,
    type: "AU-GE-BD-US",
  };
}

export function getUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.getUser
    }${uid}`,
    type: "AU-GE-US",
  };
}
