import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/Redux";

const initialState: UserState = {
  token: "",
  type: "",
  uid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, type } = action.payload;
      state.token = token;
      state.type = type;
    },
    setUid: (state, action) => {
      state.uid = action.payload.res.uid;
    },
  },
});

export const { setUser, setUid } = userSlice.actions;
export default userSlice.reducer;
