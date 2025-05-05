import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/Redux";
import { EntityType, UserRoles } from "../utilities/types";
import { BaseUser } from "../models/MainInterfaces";
import { encryptData } from "../utilities/crypto";
import { userDataKey } from "../utilities/globals";
import { LoginResponse } from "../models/Interfaces";

export const userInitialState: UserState = {
  token: "",
  uid: "",
  name: "",
  email: "",
  typeID: UserRoles.NONE,
  planID: "",
  typeEntity: EntityType.PERSON,
  document: "",
  isPremium: false,
  isLoggedIn: undefined,
  categories: [],
  lastSession: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      const payload: LoginResponse = action.payload;
      // if (payload.accessToken) state.token = payload.accessToken;
      if (payload.dataUser) {
        const { uid, name, email, type, typeID, planID, lastSession, premium } =
          action.payload.dataUser[0];
        state.typeEntity = type;
        state.name = name;
        state.email = email;
        state.typeID = typeID;
        state.planID = planID;
        state.uid = uid;
        state.lastSession = lastSession;
        state.isPremium = premium ? true : false;

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
      state.categories = action.payload.categories ?? [];
      state.isPremium = action.payload.isPremium ? true : false;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
      console.log("setting", state.isLoggedIn);
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
  setToken,
} = userSlice.actions;
export default userSlice.reducer;
