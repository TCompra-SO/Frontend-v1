import { HttpService } from "../../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../../utilities/routes";
import { UserRoles } from "../../../utilities/types";

export function getSalesOrderPDFService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.getSaleOrderPDF
    }${id}`,
    type: "PO-PDF",
    cookieAllowed: true,
  };
}

export function getSalesOrderByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.getSaleOrderById
    }${id}`,
    type: "PO-ID",
    cookieAllowed: true,
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
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.getSaleOrdersByClient
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-C",
    cookieAllowed: true,
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
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.getSaleOrdersByProvider
    }${id}/${userRole}/${page}/${pageSize}`,
    type: "PO-GET-ENT-P",
    cookieAllowed: true,
  };
}

export function searchSalesOrdersByClientService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.searchSaleOrdersByClient
    }`,
    type: "PO-SE-CL",
    cookieAllowed: true,
  };
}

export function searchSalesOrdersByProviderService(): HttpService {
  return {
    url: `${import.meta.env.VITE_SALES_URL}${ApiMainRoutes.saleOrder}${
      ApiRoutes.saleOrder.searchSaleOrdersByProvider
    }`,
    type: "PO-SE-PR",
    cookieAllowed: true,
  };
}
