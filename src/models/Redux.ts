export interface UserState {
  token: string,
  type: string,
  uid: string
}

export interface MainState {
  user: UserState,
}