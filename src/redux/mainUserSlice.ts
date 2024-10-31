import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/Redux";
import { EntityType, UserRoles } from "../utilities/types";
import { BaseUser } from "../models/MainInterfaces";

export const mainUserInitialState: UserState = {
  token: "",
  uid: "",
  name: "",
  email: "",
  typeID: UserRoles.ADMIN,
  planID: 0,
  typeEntity: EntityType.COMPANY,
  tenure: undefined,
  customerScore: undefined,
  sellerScore: undefined,
  customerCount: undefined,
  sellerCount: undefined,
  document: "",
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
    },
    setFullMainUser: (state, action: { payload: UserState; type: string }) => {
      return { ...action.payload };
    },
  },
});

export const { setMainUser, setFullMainUser } = mainUserSlice.actions;
export default mainUserSlice.reducer;
