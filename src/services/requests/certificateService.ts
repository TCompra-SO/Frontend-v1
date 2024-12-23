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

export function getSentRequestsByEntityService(
  userId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getSentRequestsByEntity
    }${userId}/${page}/${pageSize}`,
    type: "CE-GE-SE",
  };
}

export function getReceivedRequestsByEntityService(
  userId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getReceivedRequestsByEntity
    }${userId}/${page}/${pageSize}`,
    type: "CE-GE-RE",
  };
}

export function deleteCertificateService(certId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.deleteCertificate
    }${certId}`,
    type: "CE-DEL",
  };
}

export function resendCertificatesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.resendCertificates
    }`,
    type: "CE-RES",
  };
}

export function verifyCertificationService(
  userId: string,
  companyIdToVerify: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.verifyCertification
    }${userId}/${companyIdToVerify}`,
    type: "CE-VER",
  };
}
