import {
  expiresInKey,
  loginKey,
  logoutKey,
  refreshExpiresInKey,
  refreshingRefreshTokenKey,
  refreshingTokenKey,
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
import { useContext } from "react";
import { MainState } from "../models/Redux";
import { decryptData } from "../utilities/crypto";
import { getBaseUserForUserSubUser } from "../services/general/generalServices";
import useShowNotification from "./utilHooks";
import { useTranslation } from "react-i18next";
import { LoginResponse } from "../models/Interfaces";
import { MainSocketsContext } from "../contexts/MainSocketsContext";
import makeRequest, {
  getTokenExpirationTime,
} from "../utilities/globalFunctions";
import { logoutService } from "../services/requests/authService";
import { LogoutRequest } from "../models/Requests";
import { setIsLoading } from "../redux/loadingSlice";

export function useLogin() {
  const { t } = useTranslation();
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
      dispatch(setIsLoading(true));
      localStorage.setItem(tokenKey, loginResponse.accessToken);
      localStorage.setItem(refreshTokenKey, loginResponse.refreshToken);
      if (loginResponse.accessExpiresIn) {
        const tokenExp = getTokenExpirationTime(loginResponse.accessExpiresIn);
        localStorage.setItem(expiresInKey, tokenExp.toString());
      }
      if (loginResponse.refreshExpiresIn) {
        const tokenExp = getTokenExpirationTime(loginResponse.refreshExpiresIn);
        localStorage.setItem(refreshExpiresInKey, tokenExp.toString());
      }

      await loadUserInfo(false);
      showNotification("success", t("welcome"));
      localStorage.setItem(loginKey, Date.now().toString());
      dispatch(setIsLoading(false));
    }
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
  const uid = useSelector((state: MainState) => state.user.uid);
  const { setTokenExpiration, setRefreshTokenExpiration } =
    useContext(MainSocketsContext);

  async function logout() {
    // if (isLoggedIn) {
    console.log("calling logout");
    dispatch(setIsLoading(true));
    const refreshToken = localStorage.getItem(refreshTokenKey);
    if (refreshToken) {
      await makeRequest<LogoutRequest>({
        service: logoutService(),
        method: "post",
        dataToSend: {
          userId: uid,
          refreshToken,
        },
      });
    }
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(userDataKey);
    localStorage.removeItem(expiresInKey);
    localStorage.removeItem(refreshExpiresInKey);
    localStorage.removeItem(refreshingTokenKey);
    localStorage.removeItem(refreshingRefreshTokenKey);
    setTokenExpiration(null);
    setRefreshTokenExpiration(null);
    dispatch(setFullMainUser(mainUserInitialState));
    dispatch(setFullUser(userInitialState));
    localStorage.setItem(logoutKey, Date.now().toString());
    localStorage.removeItem(logoutKey);
    dispatch(setIsLoading(false));
    // }
  }

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch();
  const {
    setTokenExpiration,
    setRefreshTokenExpiration,
    refreshTokenAndHandleResult,
  } = useContext(MainSocketsContext);
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

  async function loadUserInfo(refreshAccessToken: boolean) {
    let refreshTokenData = localStorage.getItem(refreshTokenKey);
    if (refreshTokenData) {
      if (refreshAccessToken) await refreshTokenAndHandleResult(true);
      const userData = localStorage.getItem(userDataKey);
      const tokenData = localStorage.getItem(tokenKey);
      const expiresIn = localStorage.getItem(expiresInKey);
      const refreshExpiresIn = localStorage.getItem(refreshExpiresInKey);
      refreshTokenData = localStorage.getItem(refreshTokenKey);
      if (
        tokenData &&
        refreshTokenData &&
        userData &&
        expiresIn !== null &&
        refreshExpiresIn !== null
      ) {
        const userInfo = JSON.parse(decryptData(userData));
        setTokenExpiration(Number(expiresIn));
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
    }
    dispatch(setIsLoggedIn(false));
    logout();
  }

  return loadUserInfo;
}
