import { EntityType, UserRoles } from "../utilities/types";

export interface UserState {
  token: string;
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
  mainUser: UserState;
  loadingUser: LoadingUserState;
}
