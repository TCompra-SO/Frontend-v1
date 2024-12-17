import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";

export function uploadCertificateService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.uploadCertificate
    }`,
    type: "CE-UPL",
  };
}

export function getCertificatesService(userId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getCertificates
    }${userId}`,
    type: "CE-GET",
  };
}

export function sendCertificationRequestService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.sendCertificationRequest
    }`,
    type: "CE-SEN",
  };
}

export function updateCertificationStateService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.updateCertificationState
    }`,
    type: "CE-UPD",
  };
}
