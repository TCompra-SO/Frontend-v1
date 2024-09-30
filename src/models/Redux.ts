import { UserRoles } from "../utilities/types";

export interface UserState {
  token: string;
  type: string;
  uid: string;
  name: string;
  email: string;
  typeID: UserRoles;
  planID: number;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface MainState {
  user: UserState;
  loading: LoadingState;
}
