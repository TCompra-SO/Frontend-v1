export interface UserState {
  token: string,
  type: string,
  uid: string
}

export interface LoadingState {
  isLoading: boolean
}

export interface MainState {
  user: UserState,
  loading: LoadingState
}