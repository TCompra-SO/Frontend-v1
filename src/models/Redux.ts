import { EntityType, UserRoles } from "../utilities/types";

export interface MainUserState {
  uid: string;
  name: string;
  email: string;
  typeID: UserRoles;
  planID: number;
  //
  tenure?: number;
  customerScore?: number;
  sellerScore?: number;
  customerCount?: number;
  sellerCount?: number;
  typeEntity: EntityType;
  document: string;
  isLoggedIn?: boolean;
  image?: string;
  isPremium: boolean;
  categories: number[];
}

export interface UserState extends MainUserState {
  token: string;
  lastSession: string;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface LoadingUserState {
  isLoading: boolean;
}

export interface MainState {
  user: UserState;
  loading: LoadingState;
  mainUser: MainUserState;
  loadingUser: LoadingUserState;
}
