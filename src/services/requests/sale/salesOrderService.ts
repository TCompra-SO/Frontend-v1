import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";
import { UserRoles } from "../../../utilities/types";

export function getSalesOrderPDFService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrderPDF
    }${id}`,
    type: "PO-PDF",
  };
}

export function getSalesOrderByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrderById
    }${id}`,
    type: "PO-ID",
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getSalesOrdersByClientEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByClient
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-C",
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getSalesOrdersByProviderEntityService(
  id: string,
  userRole: UserRoles,
  page: number,
  pageSize: number
): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.getPurchaseOrdersByProvider
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-P",
  };
}

export function searchSalesOrdersByClientService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.searchPurchaseOrdersByClient
    }`,
    type: "PO-SE-CL",
  };
}

export function searchSalesOrdersByProviderService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.purchaseOrder}${
      ApiRoutes.purchaseOrder.searchPurchaseOrdersByProvider
    }`,
    type: "PO-SE-PR",
  };
}
