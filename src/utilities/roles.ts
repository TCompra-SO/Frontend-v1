import { pageRoutes, pageSubRoutes } from "./routes";
import { RequirementType, UserRoles } from "./types";

export const RolesForSection: {
  [key in keyof typeof pageRoutes]: Record<UserRoles, boolean>;
} = {
  home: {
    [UserRoles.NONE]: true,
    [UserRoles.ADMIN]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
  },
  myRequirements: {
    [UserRoles.ADMIN]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.NONE]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.LEGAL]: false,
  },
  myOffers: {
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.NONE]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  myPurchaseOrders: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: false,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
  },
  mySalesOrders: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: false,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
  },
  users: {
    [UserRoles.ADMIN]: true,
    [UserRoles.NONE]: false,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  profile: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: true,
  },
  chat: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: true,
  },
  allRequirements: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  allOffers: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  certificates: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: true,
  },
  allPurchaseOrders: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  allSalesOrders: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  statistics: {
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
  productDetail: {
    [UserRoles.NONE]: true,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: true,
  },
  admin: {
    // Sólo una cuenta principal tiene acceso
    [UserRoles.NONE]: false,
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
};

export const RolesForSubSection: {
  [key: string]: Record<string, Record<UserRoles, boolean>>;
} = {
  [pageRoutes.myPurchaseOrders]: {
    [pageSubRoutes.issued]: {
      // requerimiento: comprador emite órdenes de compra
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: false,
      [UserRoles.SELLER]: false,
      [UserRoles.SELLER_BUYER]: true,
    },
    [pageSubRoutes.received]: {
      // requerimiento: vendedor recibe órdenes de compra
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: false,
      [UserRoles.LEGAL]: false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
  },
  [pageRoutes.mySalesOrders]: {
    [pageSubRoutes.issued]: {
      // liquidación: vendedor emite órdenes de venta
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: false,
      [UserRoles.LEGAL]: false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
    [pageSubRoutes.received]: {
      // liquidación: comprador receive órdenes de venta
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: false,
      [UserRoles.SELLER]: false,
      [UserRoles.SELLER_BUYER]: true,
    },
  },
};

export const roleCanCreateRequirementType: {
  [key in UserRoles]: RequirementType[];
} = {
  [UserRoles.NONE]: [],
  [UserRoles.ADMIN]: [
    RequirementType.GOOD,
    RequirementType.SERVICE,
    RequirementType.SALE,
  ],
  [UserRoles.SELLER_BUYER]: [
    RequirementType.GOOD,
    RequirementType.SERVICE,
    RequirementType.SALE,
  ],
  [UserRoles.SELLER]: [RequirementType.SALE],
  [UserRoles.BUYER]: [RequirementType.GOOD, RequirementType.SERVICE],
  [UserRoles.LEGAL]: [],
};

export const roleCanOfferRequirementType: {
  [key in UserRoles]: RequirementType[];
} = {
  [UserRoles.NONE]: [],
  [UserRoles.ADMIN]: [
    RequirementType.GOOD,
    RequirementType.SERVICE,
    RequirementType.SALE,
  ],
  [UserRoles.SELLER_BUYER]: [
    RequirementType.GOOD,
    RequirementType.SERVICE,
    RequirementType.SALE,
  ],
  [UserRoles.SELLER]: [RequirementType.GOOD, RequirementType.SERVICE],
  [UserRoles.BUYER]: [RequirementType.SALE],
  [UserRoles.LEGAL]: [],
};
