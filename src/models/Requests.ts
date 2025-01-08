import {
  CertificationState,
  CommonFilter,
  RegisterTypeId,
  UserRoles,
} from "../utilities/types";

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

export interface UpdateProfileRequest {
  uid: string;
  phone: string;
  address: string;
  categories?: number[];
  cityID: string;
  about_me?: string;
  age?: number;
  specialtyID?: string;
}

export interface ProfileRequest extends UpdateProfileRequest {
  categories: number[];
  countryID: string;
  avatar?: string;
  planID: number;
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
  warranty?: number;
  timeMeasurementID?: number;
  support?: number;
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

export interface RepublishRequest {
  uid: string;
  completion_date: string;
}

export interface CulminateRequest {
  delivered: boolean;
  score: number;
  comments?: string;
  requerimentID?: string;
  offerID?: string;
}

export interface CancelRequirementRequest {
  requerimentID: string;
  reason?: string;
}

export interface CancelOfferRequest {
  offerID: string;
  reason?: string;
  canceledByCreator: boolean;
}

export interface SendCertificationRequest {
  userID: string;
  companyID: string;
  certificateIDs: string[];
}

export interface UpdateCertificationStateRequest {
  certificateID: string;
  state: CertificationState;
  note?: string;
}

export interface ResendCertificatesRequest {
  certificateRequestID: string;
  certificateIDs: string[];
}

export interface UpdateRequiredDocsRequest {
  companyID: string;
  requiredDocuments: string;
}

export interface HomeFilterRequest {
  keyWords?: string;
  location?: number;
  category?: number;
  startDate?: string;
  endDate?: string;
  companyId?: number;
  page: number;
  pageSize: number;
}
