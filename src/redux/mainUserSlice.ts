import { createSlice } from "@reduxjs/toolkit";
import { MainUserState } from "../models/Redux";
import { EntityType, UserRoles } from "../utilities/types";
import { BaseUser } from "../models/MainInterfaces";

export const mainUserInitialState: MainUserState = {
  uid: "",
  name: "",
  email: "",
  typeID: UserRoles.NONE,
  planID: "",
  typeEntity: EntityType.COMPANY,
  document: "",
  isPremium: false,
  categories: [],
};

export const mainUserSlice = createSlice({
  name: "mainUser",
  initialState: mainUserInitialState,
  reducers: {
    setMainUser: (state, action: { payload: BaseUser; type: string }) => {
      state.typeEntity = action.payload.typeEntity;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
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
    setFullMainUser: (_, action: { payload: MainUserState; type: string }) => {
      return { ...action.payload };
    },
  },
});

export const { setMainUser, setFullMainUser } = mainUserSlice.actions;
export default mainUserSlice.reducer;
