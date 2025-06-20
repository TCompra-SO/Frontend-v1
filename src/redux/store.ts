import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mainUserReducer from "./mainUserSlice";
import loadingReducer from "./loadingSlice";
import loadingUserSlice from "./loadingUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainUser: mainUserReducer,
    loading: loadingReducer,
    loadingUser: loadingUserSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
