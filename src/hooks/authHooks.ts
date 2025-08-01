import {
  expiresInKey,
  loginKey,
  logoutKey,
  refreshExpiresInKey,
  refreshingRefreshTokenKey,
  refreshingTokenKey,
  userDataKey,
} from "../utilities/globals";
import {
  mainUserInitialState,
  setFullMainUser,
  setMainUser,
} from "../redux/mainUserSlice";
import {
  loginUser,
  setEmail,
  setFullUser,
  setIsLoggedIn,
  setUid,
  setUser,
  setUserName,
  userInitialState,
} from "../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef } from "react";
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
import {
  getCsrfTokenService,
  logoutService,
} from "../services/requests/authService";
import { LogoutRequest } from "../models/Requests";
import { setIsLoading } from "../redux/loadingSlice";
import { AppDispatch } from "../redux/store";

export function useLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadUserInfo = useLoadUserInfo();
  const { showNotification } = useShowNotification();

  async function login(responseData: any) {
    const loginResponse: LoginResponse = responseData.res;
    dispatch(setUser(loginResponse));

    if (loginResponse) {
      dispatch(setIsLoading(true));
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
  const isLoggedInRef = useRef(isLoggedIn);
  const uidRef = useRef(uid);
  const { setTokenExpiration, setRefreshTokenExpiration } =
    useContext(MainSocketsContext);

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
    uidRef.current = uid;
  }, [isLoggedIn, uid]);

  async function logout() {
    if (isLoggedInRef.current) {
      dispatch(setIsLoading(true));
      await makeRequest<LogoutRequest>({
        service: logoutService(),
        method: "post",
        dataToSend: {
          userId: uidRef.current,
        },
      });

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
      dispatch(setIsLoggedIn(false));
    }
  }

  return logout;
}

export function useLoadUserInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    setTokenExpiration,
    setRefreshTokenExpiration,
    refreshTokenAndHandleResult,
  } = useContext(MainSocketsContext);
  const logout = useLogout();
  const { showNotification } = useShowNotification();
  const { t } = useTranslation();

  async function loadUserInfo(
    refreshAccessToken: boolean,
    showNotif: boolean = true
  ) {
    if (refreshAccessToken) await refreshTokenAndHandleResult(true, showNotif);
    const userData = localStorage.getItem(userDataKey);
    const expiresIn = localStorage.getItem(expiresInKey);
    const refreshExpiresIn = localStorage.getItem(refreshExpiresInKey);
    if (userData && expiresIn !== null && refreshExpiresIn !== null) {
      const userInfo = JSON.parse(decryptData(userData));
      setTokenExpiration(Number(expiresIn));
      setRefreshTokenExpiration(Number(refreshExpiresIn));
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
          logout();
          return;
        } else {
          dispatch(setMainUser(user));
        }
        if (subUser) {
          dispatch(loginUser(subUser));
        }
        if (!(user && subUser)) {
          logout();
        }
        // Si se cargó con exito los datos del usuario, solicitar CSRF token
        await requestCSRFToken();
        return;
      }
      logout();
      return;
    }
    logout();
  }

  /**
   * Obtiene el CSRF token en un cookie
   */
  async function requestCSRFToken() {
    const { error } = await makeRequest({
      service: getCsrfTokenService(),
      method: "get",
    });
    if (error) {
      showNotification("warning", t("CSRFTokenError"));
    }
  }

  return loadUserInfo;
}
