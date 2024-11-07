import { useNavigate } from "react-router-dom";
import { tokenKey, userDataKey } from "../utilities/globals";
import {
  mainUserInitialState,
  setFullMainUser,
  setMainUser,
} from "../redux/mainUserSlice";
import {
  setBaseUser,
  setFullUser,
  setIsLoggedIn,
  setUser,
  userInitialState,
} from "../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { pageRoutes } from "../utilities/routes";
import { useEffect, useState } from "react";
import { MainState } from "../models/Redux";
import { setIsUserLoading } from "../redux/loadingUserSlice";
import { decryptData } from "../utilities/crypto";
import { getBaseUserForUserSubUser } from "../services/complete/general";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);

  const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userDataKey);
    dispatch(setFullMainUser(mainUserInitialState));
    dispatch(setFullUser(userInitialState));
    localStorage.setItem("logout", Date.now().toString());
    dispatch(setIsLoggedIn(false));
  };

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "logout") {
        navigate(pageRoutes.home);
      }
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoggedIn]);

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch();

  async function loadUserInfo() {
    dispatch(setIsUserLoading(true));
    const userData = localStorage.getItem(userDataKey);
    if (userData) {
      const userInfo = JSON.parse(decryptData(userData));
      // console.log(userInfo);
      if (userInfo) {
        localStorage.setItem(tokenKey, userInfo.token);
        dispatch(
          setUser({
            token: userInfo.token,
            dataUser: [
              {
                uid: userInfo.uid,
                name: userInfo.name,
                email: userInfo.email,
                typeID: userInfo.typeID,
                planID: userInfo.planID,
                type: userInfo.typeEntity,
              },
            ],
          })
        );

        const { user, subUser } = await getBaseUserForUserSubUser(
          userInfo.uid,
          true
        );
        if (user) {
          dispatch(setMainUser(user));
        }
        if (subUser) {
          dispatch(setBaseUser(subUser));
        }
        dispatch(setIsUserLoading(false));
        dispatch(setIsLoggedIn(user && subUser ? true : false));
        return;
      }
      dispatch(setIsUserLoading(false));
      dispatch(setIsLoggedIn(false));
      return;
    }

    dispatch(setIsUserLoading(false));
    dispatch(setIsLoggedIn(false));
  }
  return loadUserInfo;
}
