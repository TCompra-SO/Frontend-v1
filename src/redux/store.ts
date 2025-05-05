import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mainUserReducer from "./mainUserSlice";
import loadingReducer from "./loadingSlice";
import loadingUserSlice from "./loadingUserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    mainUser: mainUserReducer,
    loading: loadingReducer,
    loadingUser: loadingUserSlice,
  },
});
