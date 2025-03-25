import { useNavigate } from "react-router-dom";
import {
  expiresInKey,
  loginKey,
  logoutKey,
  navigateToAfterLoggingOut,
  refreshExpiresInKey,
  refreshTokenKey,
  tokenKey,
  userDataKey,
} from "../utilities/globals";
import {
  mainUserInitialState,
  setFullMainUser,
  setMainUser,
} from "../redux/mainUserSlice";
import {
  setBaseUser,
  setEmail,
  setFullUser,
  setIsLoggedIn,
  setToken,
  setUid,
  setUser,
  setUserName,
  userInitialState,
} from "../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { MainState } from "../models/Redux";
import { decryptData } from "../utilities/crypto";
import { getBaseUserForUserSubUser } from "../services/general/generalServices";
import useShowNotification from "./utilHooks";
import { useTranslation } from "react-i18next";
import { LoginResponse } from "../models/Interfaces";
import { MainSocketsContext } from "../contexts/MainSocketsContext";
import { getTokenExpirationTime } from "../utilities/globalFunctions";

export function useLogin() {
  const { t } = useTranslation();
  const { setTokenExpiration } = useContext(MainSocketsContext);
  const { setRefreshTokenExpiration } = useContext(MainSocketsContext);
  const dispatch = useDispatch();
  const loadUserInfo = useLoadUserInfo();
  const { showNotification } = useShowNotification();

  async function login(responseData: any) {
    const loginResponse: LoginResponse = responseData.res;
    dispatch(setUser(loginResponse));

    if (
      loginResponse &&
      loginResponse.accessToken &&
      loginResponse.refreshToken
    ) {
      localStorage.setItem(tokenKey, loginResponse.accessToken);
      localStorage.setItem(refreshTokenKey, loginResponse.refreshToken);
      if (loginResponse.accessExpiresIn) {
        const tokenExp = getTokenExpirationTime(loginResponse.accessExpiresIn);
        localStorage.setItem(expiresInKey, tokenExp.toString());
        setTokenExpiration(tokenExp);
      }
      if (loginResponse.refreshExpiresIn) {
        const tokenExp = getTokenExpirationTime(loginResponse.refreshExpiresIn);
        localStorage.setItem(refreshExpiresInKey, tokenExp.toString());
        setRefreshTokenExpiration(tokenExp);
      }
    }

    await loadUserInfo();
    showNotification("success", t("welcome"));
    localStorage.setItem(loginKey, Date.now().toString());
  }

  return login;
}

export function useRegister() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showNotification } = useShowNotification();

  async function register(responseData: any, email: string) {
    showNotification("success", t("registerUserSuccess"));
    dispatch(setUid(responseData.res?.uid));
    if (responseData.res?.name) dispatch(setUserName(responseData.res?.name));
    dispatch(setEmail(email));
  }

  return register;
}

export function useLogout() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);

  function logout() {
    // if (isLoggedIn) {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(userDataKey);
    localStorage.removeItem(expiresInKey);
    localStorage.removeItem(refreshExpiresInKey);
    dispatch(setFullMainUser(mainUserInitialState));
    dispatch(setFullUser(userInitialState));
    localStorage.setItem(logoutKey, Date.now().toString());
    localStorage.removeItem(logoutKey);
    // }
  }

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch();
  const { setTokenExpiration } = useContext(MainSocketsContext);
  const { setRefreshTokenExpiration } = useContext(MainSocketsContext);
  const logout = useLogout();

  // function checkToken() {
  //   try {
  //     // check if token has expired.refresh token
  //     // return true;
  //     throw Error;
  //   } catch (err) {
  //     console.log("error in token");
  //     logout();
  //     return false;
  //   }
  // }

  async function loadUserInfo() {
    const userData = localStorage.getItem(userDataKey);
    const tokenData = localStorage.getItem(tokenKey);
    if (tokenData && userData) {
      const userInfo = JSON.parse(decryptData(userData));
      const expiresIn = localStorage.getItem(expiresInKey);
      if (expiresIn !== null) setTokenExpiration(Number(expiresIn));
      const refreshExpiresIn = localStorage.getItem(refreshExpiresInKey);
      if (refreshExpiresIn !== null)
        setRefreshTokenExpiration(Number(refreshExpiresIn));
      // if (!checkToken()) return;
      if (userInfo) {
        // localStorage.setItem(tokenKey, userInfo.token);
        dispatch(setToken(tokenData));
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
        if (!user) {
          dispatch(setIsLoggedIn(false));
          logout();
          return;
        } else {
          dispatch(setMainUser(user));
        }
        if (subUser) {
          dispatch(setBaseUser(subUser));
        }
        dispatch(setIsLoggedIn(user && subUser ? true : false));
        if (!(user && subUser)) logout();
        return;
      }
      dispatch(setIsLoggedIn(false));
      logout();
      return;
    }
    dispatch(setIsLoggedIn(false));
    logout();
  }

  return loadUserInfo;
}
