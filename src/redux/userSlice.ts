import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/Redux";
import { UserRoles } from "../utilities/types";

const initialState: UserState = {
  token: "",
  type: "",
  uid: "",
  name: "",
  email: "",
  typeID: UserRoles.NONE,
  planID: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      if (action.payload.dataUser) {
        const { uid, name, email, type, typeID, planID } =
          action.payload.dataUser[0];
        console.log(action.payload);
        state.token = token;
        state.type = type;
        state.name = name;
        state.email = email;
        state.typeID = typeID;
        state.planID = planID;
        state.uid = uid;
      }
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUser, setUid, setEmail } = userSlice.actions;
export default userSlice.reducer;
