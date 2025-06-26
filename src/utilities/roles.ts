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
    [UserRoles.SELLER]: true,
    [UserRoles.LEGAL]: false,
  },
  myOffers: {
    [UserRoles.ADMIN]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.NONE]: false,
    [UserRoles.BUYER]: true,
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

// Los roles de subusuarios tienen acceso a las subsecciones
// porque solo el creador puede realizar acciones como seleccionar,
// cancelar, etc. Las cuentas principales (admin) no pueden.
// Con restricciones, si un usuario cambia de seller a buyer, no podría
// realizar ninguna acción si no tiene acceso a la subsección.
export const RolesForSubSection: {
  [key: string]: Record<
    string | number,
    Record<UserRoles, boolean> | Record<UserRoles, boolean>
  >;
} = {
  [pageRoutes.myRequirements]: {
    [RequirementType.GOOD]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true, //false,
      [UserRoles.SELLER_BUYER]: true,
    },
    [RequirementType.SERVICE]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true, //false,
      [UserRoles.SELLER_BUYER]: true,
    },
    [RequirementType.SALE]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true, //false,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
  },
  [pageRoutes.myOffers]: {
    [RequirementType.GOOD]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true, //false,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
    [RequirementType.SERVICE]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true, //false,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
    [RequirementType.SALE]: {
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true, //false,
      [UserRoles.SELLER_BUYER]: true,
    },
  },
  [pageRoutes.myPurchaseOrders]: {
    [pageSubRoutes.issued]: {
      // requerimiento: comprador emite órdenes de compra
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true, //false,
      [UserRoles.SELLER_BUYER]: true,
    },
    [pageSubRoutes.received]: {
      // requerimiento: vendedor recibe órdenes de compra
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true, //false,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
  },
  [pageRoutes.mySalesOrders]: {
    [pageSubRoutes.issued]: {
      // liquidación: vendedor emite órdenes de venta
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true, //false,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true,
      [UserRoles.SELLER_BUYER]: true,
    },
    [pageSubRoutes.received]: {
      // liquidación: comprador receive órdenes de venta
      [UserRoles.NONE]: false,
      [UserRoles.ADMIN]: true,
      [UserRoles.BUYER]: true,
      [UserRoles.LEGAL]: true, //false,
      [UserRoles.SELLER]: true, //false,
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
