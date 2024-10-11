import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mainUserReducer from "./mainUserSlice";
import loadingReducer from "./loadingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    mainUser: mainUserReducer,
    loading: loadingReducer,
  },
});
