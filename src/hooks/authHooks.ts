import { useNavigate } from "react-router-dom";
import {
  loginKey,
  logoutKey,
  navigateToAfterLoggingOut,
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
  setUid,
  setUser,
  setUserName,
  userInitialState,
} from "../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainState } from "../models/Redux";
import { decryptData } from "../utilities/crypto";
import { getBaseUserForUserSubUser } from "../services/general/generalServices";
import useShowNotification from "./utilHooks";
import { useTranslation } from "react-i18next";
import { LoginResponse } from "../models/Interfaces";

export function useLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadUserInfo = useLoadUserInfo();
  const { showNotification } = useShowNotification();

  async function login(responseData: any) {
    const loginResponse: LoginResponse = responseData.res;
    dispatch(setUser(loginResponse));
    if (loginResponse && loginResponse.accessToken)
      localStorage.setItem(tokenKey, loginResponse.accessToken);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadUserInfo = useLoadUserInfo();
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);

  function logout() {
    // if (isLoggedIn) {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userDataKey);
    dispatch(setFullMainUser(mainUserInitialState));
    dispatch(setFullUser(userInitialState));
    localStorage.setItem(logoutKey, Date.now().toString());
    localStorage.removeItem(logoutKey);
    // }
  }

  useEffect(() => {
    async function handleStorageChange(event: StorageEvent) {
      if (event.key === logoutKey) {
        dispatch(setIsLoggedIn(false));
        navigate(navigateToAfterLoggingOut);
      } else if (event.key === loginKey) {
        await loadUserInfo();
        localStorage.removeItem(loginKey);
      }
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch();
  // const logout = useLogout();

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
      console.log(userInfo);
      // if (!checkToken()) return;
      if (userInfo) {
        // localStorage.setItem(tokenKey, userInfo.token);
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
          return;
        } else {
          dispatch(setMainUser(user));
        }
        if (subUser) {
          dispatch(setBaseUser(subUser));
        }
        dispatch(setIsLoggedIn(user && subUser ? true : false));
        return;
      }
      dispatch(setIsLoggedIn(false));
      return;
    }
    dispatch(setIsLoggedIn(false));
  }
  return loadUserInfo;
}
