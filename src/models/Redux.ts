export interface UserState {
  token: string;
  type: string;
  uid: string;
  name: string;
  email: string;
  typeID: number;
  planID: number;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface MainState {
  user: UserState;
  loading: LoadingState;
}
