import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: '',
  type: '',
  uid: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {token, type} = action.payload;
      state.token = token;
      state.type = type;
    },
    setUid: (state, action) => {
      const {uid} = action.payload;
      state.uid = uid;
    },
  }
});

export const {setUser, setUid} = userSlice.actions;
export default userSlice.reducer;