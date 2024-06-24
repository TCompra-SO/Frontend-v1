export interface LoginRequest {
  email: string,
  password: string
}

export interface RegisterRequest {
  email: string,
  password: string,
  profileType?: string,
  userType?: string,
  dni?: string
}

export interface ProfileRequest {
  uid: string,
  gender: string,
  birthdate: string,
  phone: string,
  country: string,
  city: string,
  type_learning: string
}

export interface ValidateCodeRequest {
  email: string,
  code: string,
  type: string
}

export interface SendCodeRequest {
  email: string,
  type: string
}