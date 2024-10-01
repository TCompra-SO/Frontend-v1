import { UserRoles } from "../utilities/types";
import { BaseUser } from "./MainInterfaces";

export interface SubUserProfile extends BaseUser {
  address: string;
  cityID: number;
  companyID: string;
  document: string;
  phone: string;
  email?: undefined;
  typeID?: UserRoles;
}
