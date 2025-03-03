import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/Redux";
import { EntityType, UserRoles } from "../utilities/types";
import { BaseUser } from "../models/MainInterfaces";
import { encryptData } from "../utilities/crypto";
import { userDataKey } from "../utilities/globals";

export const userInitialState: UserState = {
  token: "",
  uid: "",
  name: "",
  email: "",
  typeID: UserRoles.NONE,
  planID: 0,
  typeEntity: EntityType.PERSON,
  document: "",
  isPremium: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      if (action.payload.dataUser) {
        const { uid, name, email, type, typeID, planID } =
          action.payload.dataUser[0];
        state.token = token;
        state.typeEntity = type;
        state.name = name;
        state.email = email;
        state.typeID = typeID;
        state.planID = planID;
        state.uid = uid;

        localStorage.setItem(userDataKey, encryptData(JSON.stringify(state)));
        console.log(state.uid);
      } else localStorage.removeItem(userDataKey);
    },
    setBaseUser: (state, action: { payload: BaseUser; type: string }) => {
      state.tenure = action.payload.tenure;
      state.customerScore = action.payload.customerScore;
      state.sellerScore = action.payload.sellerScore;
      state.customerCount = action.payload.customerCount;
      state.sellerCount = action.payload.sellerCount;
      state.typeEntity = action.payload.typeEntity;
      state.document = action.payload.document;
      state.image = action.payload.image;
      state.isPremium = true; // r3v
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFullUser: (_, action: { payload: UserState; type: string }) => {
      return { ...action.payload };
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserImage: (
      state,
      action: {
        payload: string | undefined;
        type: string;
      }
    ) => {
      state.image = action.payload;
    },
  },
});

export const {
  setUser,
  setUid,
  setEmail,
  setBaseUser,
  setFullUser,
  setIsLoggedIn,
  setUserImage,
  setUserName,
} = userSlice.actions;
export default userSlice.reducer;
