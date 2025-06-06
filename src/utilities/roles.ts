import { pageRoutes, pageSubRoutes } from "./routes";
import { UserRoles } from "./types";

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

// export const RolesForSection: {
//   [key in keyof typeof pageRoutes]: Record<UserRoles, boolean>;
// } = {
//   home: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.SELLER_BUYER]: true,
//   },
//   search: {
//     [UserRoles.ADMIN]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.NONE]: true,
//   },
//   myRequirements: {
//     [UserRoles.ADMIN]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.NONE]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   myOffers: {
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.NONE]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   myPurchaseOrders: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.SELLER_BUYER]: true,
//   },
//   users: {
//     [UserRoles.ADMIN]: true,
//     [UserRoles.NONE]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   profile: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   chat: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   allRequirements: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   allOffers: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   certificates: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   allPurchaseOrders: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
//   statistics: {
//     [UserRoles.NONE]: true,
//     [UserRoles.ADMIN]: true,
//     [UserRoles.SELLER_BUYER]: true,
//     [UserRoles.SELLER]: true,
//     [UserRoles.BUYER]: true,
//     [UserRoles.LEGAL]: true,
//   },
// };

// export const RolesForSubSection: {
//   [key: string]: Record<string, Record<UserRoles, boolean>>;
// } = {
//   [pageRoutes.myPurchaseOrders]: {
//     [pageSubRoutes.issued]: {
//       [UserRoles.NONE]: true,
//       [UserRoles.ADMIN]: true,
//       [UserRoles.BUYER]: true,
//       [UserRoles.LEGAL]: true,
//       [UserRoles.SELLER]: true,
//       [UserRoles.SELLER_BUYER]: true,
//     },
//     [pageSubRoutes.issuedSales]: {
//       [UserRoles.NONE]: true,
//       [UserRoles.ADMIN]: true,
//       [UserRoles.BUYER]: true,
//       [UserRoles.LEGAL]: true,
//       [UserRoles.SELLER]: true,
//       [UserRoles.SELLER_BUYER]: true,
//     },
//     [pageSubRoutes.received]: {
//       [UserRoles.NONE]: true,
//       [UserRoles.ADMIN]: true,
//       [UserRoles.BUYER]: true,
//       [UserRoles.LEGAL]: true,
//       [UserRoles.SELLER]: true,
//       [UserRoles.SELLER_BUYER]: true,
//     },
//     [pageSubRoutes.receivedSales]: {
//       [UserRoles.NONE]: true,
//       [UserRoles.ADMIN]: true,
//       [UserRoles.BUYER]: true,
//       [UserRoles.LEGAL]: true,
//       [UserRoles.SELLER]: true,
//       [UserRoles.SELLER_BUYER]: true,
//     },
//   },
// };
