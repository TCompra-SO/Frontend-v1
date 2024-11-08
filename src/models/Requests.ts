import { CommonFilter, RegisterTypeId, UserRoles } from "../utilities/types";

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

export interface NewPasswordRequest {
  email: string;
  password: string;
}

export interface CreateRequirementRequest {
  name: string;
  description: string;
  categoryID: number;
  cityID: number;
  budget: number;
  currencyID: number;
  payment_methodID: number;
  completion_date: string;
  submission_dateID: number;
  warranty?: number;
  durationID?: number;
  allowed_bidersID: number;
  userID: string;
  used?: boolean;
}

export interface UploadAvatarRequest {
  avatar: File;
  uid: string;
}

export interface CreateOfferRequest {
  name: string;
  email: string;
  description: string;
  cityID: number;
  deliveryTimeID: number;
  currencyID: number;
  warranty: number;
  timeMeasurementID: number;
  support: number;
  budget: number;
  includesIGV: boolean;
  includesDelivery: boolean;
  requerimentID: string;
  userID: string;
}

export interface RegisterScoreRequest {
  typeScore: "Client" | "Provider";
  uidEntity: string; // calificado
  uidUser: string; // calificador
  score: number;
  comments?: string;
}

export interface SelectOfferRequest {
  requerimentID: string;
  offerID: string;
  observation?: string;
  price_Filter: CommonFilter;
  deliveryTime_Filter: number;
  location_Filter: number;
  warranty_Filter: CommonFilter;
}
