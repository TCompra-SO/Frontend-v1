import { FilterValue } from "antd/lib/table/interface";
import {
  CertificationState,
  CommonFilter,
  EntityType,
  OrderType,
  RegisterTypeId,
  RequirementType,
  UserRoles,
} from "../utilities/types";
import { NotificationData } from "./MainInterfaces";

export interface IncludeNotificationRequest {
  notification?: NotificationData;
  extraNotifications?: NotificationData[];
}

export interface LoginRequest extends IncludeNotificationRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends IncludeNotificationRequest {
  email: string;
  password: string;
  typeID: RegisterTypeId;
  dni?: string;
  ruc?: string;
}

export interface UpdateProfileRequest extends IncludeNotificationRequest {
  uid: string;
  phone: string;
  address: string;
  categories?: number[];
  cityID: string;
  about_me?: string;
  age?: number;
  specialtyID?: string;
}

export interface ProfileRequest
  extends UpdateProfileRequest,
    IncludeNotificationRequest {
  categories: number[];
  countryID: string;
  avatar?: string;
  planID: number;
}

export interface ValidateCodeRequest extends IncludeNotificationRequest {
  email: string;
  code: string;
  type: "repassword" | "identity_verified";
}

export interface SendCodeRequest extends IncludeNotificationRequest {
  email: string;
  type: "repassword" | "identity_verified";
}

export interface SendCodeRecoveryRequest extends IncludeNotificationRequest {
  email: string;
}

export interface RecoverPasswordRequest extends IncludeNotificationRequest {
  email: string;
  password: string;
  code: string;
}

export interface GetNameReniecRequest extends IncludeNotificationRequest {
  dni?: string;
  ruc?: string;
}

export interface RegisterSubUserRequest extends IncludeNotificationRequest {
  dni: string;
  phone: string;
  address: string;
  cityID: number;
  email: string;
  typeID: UserRoles;
  uid: string;
}

export interface UpdateProfileSubUserRequest
  extends IncludeNotificationRequest {
  uid: string;
  phone: string;
  address: string;
  cityID: number;
}

export interface ChangeRoleSubUserRequest extends IncludeNotificationRequest {
  uid: string;
  typeID: UserRoles;
}

export interface NewPasswordRequest extends IncludeNotificationRequest {
  email: string;
  password: string;
}

export interface CreateRequirementRequest extends IncludeNotificationRequest {
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

export interface UploadAvatarRequest extends IncludeNotificationRequest {
  avatar: File;
  uid: string;
}

export interface CreateOfferRequest extends IncludeNotificationRequest {
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
  includesIGV?: boolean;
  includesDelivery?: boolean;
  requerimentID: string;
  userID: string;
}

export interface RegisterScoreRequest extends IncludeNotificationRequest {
  typeScore: "Client" | "Provider";
  uidEntity: string;
  uidUser: string;
  score: number;
  comments?: string;
  offerId: string;
  type: RequirementType;
}

export interface SelectOfferRequest extends IncludeNotificationRequest {
  requerimentID: string;
  offerID: string;
  observation?: string;
  price_Filter: CommonFilter;
  deliveryTime_Filter: number;
  location_Filter: number;
  warranty_Filter: CommonFilter;
}

export interface RepublishRequest extends IncludeNotificationRequest {
  uid: string;
  completion_date: string;
}

export interface CulminateRequest extends IncludeNotificationRequest {
  delivered: boolean;
  score: number;
  comments?: string;
  requerimentID?: string;
  offerID?: string;
}

export interface CancelRequirementRequest extends IncludeNotificationRequest {
  requerimentID: string;
  reason?: string;
}

export interface CancelOfferRequest extends IncludeNotificationRequest {
  offerID: string;
  reason?: string;
  canceledByCreator: boolean;
}

export interface SendCertificationRequest extends IncludeNotificationRequest {
  userID: string;
  companyID: string;
  certificateIDs: string[];
}

export interface UpdateCertificationStateRequest
  extends IncludeNotificationRequest {
  certificateID: string;
  state: CertificationState;
  note?: string;
}

export interface ResendCertificatesRequest extends IncludeNotificationRequest {
  certificateRequestID: string;
  certificateIDs: string[];
}

export interface UpdateRequiredDocsRequest extends IncludeNotificationRequest {
  companyID: string;
  requiredDocuments: string;
}

export interface HomeFilterRequest extends IncludeNotificationRequest {
  keyWords?: string;
  location?: number;
  category?: number;
  startDate?: string;
  endDate?: string;
  companyId?: number;
  page: number;
  pageSize: number;
}

export interface FieldSort {
  fieldName?: string;
  orderType?: OrderType;
  columnKey?: string;
}

export interface FieldFilter {
  filterData?: FilterValue;
  filterColumn?: string;
}

export interface SearchTableRequest
  extends FieldSort,
    FieldFilter,
    IncludeNotificationRequest {
  keyWords?: string;
  userId: string;
  page: number;
  pageSize: number;
  typeUser: EntityType;
}

export interface ChangeStatusRequest extends IncludeNotificationRequest {
  uid: string;
  status: boolean;
}

export interface RefreshAccessTokenRequest {
  accessToken: string;
  refreshToken: string;
}
