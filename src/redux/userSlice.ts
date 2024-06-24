import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: '',
  type: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {token, type} = action.payload;
      state.token = token;
      state.type = type;
    }
  }
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;