import { pageRoutes } from "./routes";
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
  search: {
    [UserRoles.ADMIN]: true,
    [UserRoles.BUYER]: true,
    [UserRoles.LEGAL]: true,
    [UserRoles.SELLER]: true,
    [UserRoles.SELLER_BUYER]: true,
    [UserRoles.NONE]: false,
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
  users: {
    [UserRoles.ADMIN]: true,
    [UserRoles.NONE]: false,
    [UserRoles.SELLER_BUYER]: false,
    [UserRoles.SELLER]: false,
    [UserRoles.BUYER]: false,
    [UserRoles.LEGAL]: false,
  },
};
