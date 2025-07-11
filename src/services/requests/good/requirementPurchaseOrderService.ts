import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";
import { UserRoles } from "../../../utilities/types";

export function getReqPurchaseOrderPDFService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.getPurchaseOrderPDF}${id}`,
    type: "PO-PDF",
    cookieAllowed: true,
  };
}

export function getReqPurchaseOrderByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.getPurchaseOrderById}${id}`,
    type: "PO-ID",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getReqPurchaseOrdersByClientEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByClient
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-C",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getReqPurchaseOrdersByProviderEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByProvider
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-P",
    cookieAllowed: true,
  };
}

export function searchReqPurchaseOrdersByClientService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.searchPurchaseOrdersByClient}`,
    type: "PO-SE-CL",
    cookieAllowed: true,
  };
}

export function searchReqPurchaseOrdersByProviderService(): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.searchPurchaseOrdersByProvider}`,
    type: "PO-SE-PR",
    cookieAllowed: true,
  };
}
