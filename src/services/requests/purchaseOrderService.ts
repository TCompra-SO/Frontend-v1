import { HttpService } from "../../models/Interfaces";
import { ApiMainRoutes, ApiRoutes } from "../../utilities/routes";
import { UserRoles } from "../../utilities/types";

export function getReqIssuedPurchaseOrderByUserService(
  userId: string
): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.getPurchaseOrderByUser}${userId}`,
    type: "PO-RE-IS-US",
  };
}

export function getPurchaseOrderPDFService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.getPurchaseOrderPDF}${id}`,
    type: "PO-PDF",
  };
}

export function getPurchaseOrderByIdService(id: string): HttpService {
  return {
    url: `${import.meta.env.VITE_REQUIREMENTS_URL}${
      ApiMainRoutes.purchaseOrder
    }${ApiRoutes.purchaseOrder.getPurchaseOrderById}${id}`,
    type: "PO-ID",
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getPurchaseOrdersByClientEntityService(
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
  };
}

// Para cuentas principales (empresa y persona). Incluye órdenes de subusuarios
export function getPurchaseOrdersByProviderEntityService(
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
  };
}
