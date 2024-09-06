import { RegisterTypeId } from "../utilities/types";

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
  country: string;
  city: string;
  categories: number[];
  avatar?: string;
  plan: number;
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

export interface GetNameReniecRequest {
  dni?: string;
  ruc?: string;
}
