import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../models/Redux";

const initialState: LoadingState = {
  isLoading: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      const isLoading = action.payload;
      state.isLoading = isLoading;
    },
  }
});

export const {setIsLoading} = loadingSlice.actions;
export default loadingSlice.reducer;