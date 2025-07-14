import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";
import { UserRoles } from "../../../utilities/types";

export function getServicePurchaseOrderPDFService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrderPDF
    }${id}`,
    type: "PO-PDF",
    cookieAllowed: true,
  };
}

export function getServicePurchaseOrderByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrderById
    }${id}`,
    type: "PO-ID",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getServicePurchaseOrdersByClientEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByClient
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-C",
    cookieAllowed: true,
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getServicePurchaseOrdersByProviderEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByProvider
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-P",
    cookieAllowed: true,
  };
}

export function searchServicePurchaseOrdersByClientService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.searchPurchaseOrdersByClient
    }`,
    type: "PO-SE-CL",
    cookieAllowed: true,
  };
}

export function searchServicePurchaseOrdersByProviderService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SERVICES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.searchPurchaseOrdersByProvider
    }`,
    type: "PO-SE-PR",
    cookieAllowed: true,
  };
}
