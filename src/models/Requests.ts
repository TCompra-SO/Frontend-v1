export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  profileType?: string;
  userType?: string;
  dni?: string;
  ruc?: string;
}

export interface ProfileRequest2 {
  uid: string;
  gender?: string;
  birthdate: string;
  phone: string;
  country: string;
  city: string;
  type_learning?: string;
}

export interface ProfileRequest {
  uid: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  categories: string[];
  avatar?: string;
  plan: string;
  specialty?: string;
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
