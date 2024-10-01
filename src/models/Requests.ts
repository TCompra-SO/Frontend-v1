import { RegisterTypeId, UserRoles } from "../utilities/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  typeID: RegisterTypeId;
  dni?: string;
  ruc?: string;
}

export interface ProfileRequest {
  uid: string;
  phone: string;
  address: string;
  countryID: string;
  cityID: string;
  categories: number[];
  avatar?: string;
  planID: number;
  age?: number;
  specialtyID?: string;
  aboutMe?: string;
}

export interface ValidateCodeRequest {
  email: string;
  code: string;
  type: "repassword" | "identity_verified";
}

export interface SendCodeRequest {
  email: string;
  type: "repassword" | "identity_verified";
}

export interface SendCodeRecoveryRequest {
  email: string;
}

export interface RecoverPasswordRequest {
  email: string;
  password: string;
  code: string;
}

export interface GetNameReniecRequest {
  dni?: string;
  ruc?: string;
}

export interface RegisterSubUserRequest {
  dni: string;
  phone: string;
  address: string;
  cityID: number;
  email: string;
  typeID: UserRoles;
  uid: string;
}

export interface UpdateProfileSubUserRequest {
  uid: string;
  phone: string;
  address: string;
  cityID: number;
}

export interface ChangeRoleSubUserRequest {
  uid: string;
  typeID: UserRoles;
}

export interface ChangePasswordSubUserRequest {
  password: string;
}
