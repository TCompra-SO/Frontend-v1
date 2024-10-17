import { createSlice } from "@reduxjs/toolkit";
import { LoadingUserState } from "../models/Redux";

const initialState: LoadingUserState = {
  isLoading: true,
};

export const loadingUserSlice = createSlice({
  name: "loadingUser",
  initialState,
  reducers: {
    setIsUserLoading: (state, action) => {
      const isLoading = action.payload;
      state.isLoading = isLoading;
    },
  },
});

export const { setIsUserLoading } = loadingUserSlice.actions;
export default loadingUserSlice.reducer;
