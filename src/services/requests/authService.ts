import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function loginService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.login
    }`,
    type: "AU-LOG",
    cookieAllowed: true,
  };
}

export function profileCompanyService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileCompany
    }`,
    type: "AU-PR-CO",
    cookieAllowed: true,
  };
}

export function profileUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.profileUser
    }`,
    type: "AU-PR-US",
    cookieAllowed: true,
  };
}

export function updateProfileCompanyService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.updateCompany
    }`,
    type: "AU-UP-PR-CO",
    cookieAllowed: true,
  };
}

export function updateProfileUserService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.updateUser
    }`,
    type: "AU-UP-PR-US",
    cookieAllowed: true,
  };
}

export function registerService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.register
    }`,
    type: "AU-REG",
    cookieAllowed: true,
  };
}

export function sendCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.sendCode
    }`,
    type: "AU-SE-CO",
    cookieAllowed: true,
  };
}

export function validateCodeService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.validateCode
    }`,
    type: "AU-VA-CO",
    cookieAllowed: true,
  };
}

export function sendCodeRecoveryService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.sendCodeRecovery
    }`,
    type: "AU-SE-CO-RE",
    cookieAllowed: true,
  };
}

export function recoverPasswordService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.recoverPassword
    }`,
    type: "AU-RE-PA",
    cookieAllowed: true,
  };
}

export function newPasswordService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.newPassword
    }`,
    type: "AU-NE-PA",
    cookieAllowed: true,
  };
}

export function getBaseDataUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.getBaseDataUser
    }${uid}`,
    type: "AU-GE-BD-US",
    cookieAllowed: true,
  };
}

export function getUserService(uid: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.getUser
    }${uid}`,
    type: "AU-GE-US",
    cookieAllowed: true,
  };
}

export function searchCompanyByNameService(name: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.searchCompanyByName
    }${name}`,
    type: "AU-SE-CO-NA",
    cookieAllowed: true,
  };
}

export function refreshAccessTokenService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.refreshAccessToken
    }`,
    type: "AU-RE-AC-TO",
    cookieAllowed: true,
  };
}

export function refreshRefreshTokenService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.refreshRefreshToken
    }`,
    type: "AU-RE-RE-TO",
    cookieAllowed: true,
  };
}

export function logoutService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.logout
    }`,
    type: "AU-LOG-OU",
    cookieAllowed: true,
  };
}

export function getCsrfTokenService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.auth}${
      ApiRoutes.auth.getCsrfToken
    }`,
    type: "AU-GET-CSRF",
    cookieAllowed: true,
  };
}
