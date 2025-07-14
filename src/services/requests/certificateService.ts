import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";
import { CertificationTableType } from "../../utilities/types";

export function uploadCertificateService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.uploadCertificate
    }`,
    type: "CE-UPL",
    cookieAllowed: true,
  };
}

export function getCertificatesService(
  userId: string,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getCertificates
    }${userId}/${page}/${pageSize}`,
    type: "CE-GET",
    cookieAllowed: true,
  };
}

export function searchCertificatesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.searchCertificates
    }`,
    type: "CE-SEA",
    cookieAllowed: true,
  };
}

export function sendCertificationRequestService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.sendCertificationRequest
    }`,
    type: "CE-SEN",
    cookieAllowed: true,
  };
}

export function updateCertificationStateService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.updateCertificationState
    }`,
    type: "CE-UPD",
    cookieAllowed: true,
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
    cookieAllowed: true,
  };
}

export function searchSentRequestsByEntityService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.searchSentRequestByEntity
    }`,
    type: "CE-SE-SE",
    cookieAllowed: true,
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
    cookieAllowed: true,
  };
}

export function searchReceivedRequestsByEntityService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.searchReceivedRequestByEntity
    }`,
    type: "CE-SE-RE",
    cookieAllowed: true,
  };
}

export function deleteCertificateService(certId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.deleteCertificate
    }${certId}`,
    type: "CE-DEL",
    cookieAllowed: true,
  };
}

export function resendCertificatesService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.resendCertificates
    }`,
    type: "CE-RES",
    cookieAllowed: true,
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
    cookieAllowed: true,
  };
}

export function updateRequiredDocumentsService(): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.updateRequiredDocuments
    }`,
    type: "CE-UPD-DOC",
    cookieAllowed: true,
  };
}

export function getRequiredDocumentsService(companyId: string): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getRequiredDocuments
    }${companyId}`,
    type: "CE-GET-DOC",
    cookieAllowed: true,
  };
}

export function getCertificateRequestService(
  requestId: string,
  type: CertificationTableType
): HttpService {
  return {
    url: `${import.meta.env.VITE_API_BASE_URL}${ApiMainRoutes.certificate}${
      ApiRoutes.certificate.getCertificateRequest
    }${type}/${requestId}`,
    type: "CE-GET-REQ",
    cookieAllowed: true,
  };
}
