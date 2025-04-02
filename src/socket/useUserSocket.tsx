import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLogout } from "../hooks/authHooks";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  expiresInKey,
  inactivityTime,
  logoutAfterNoTokenRefreshTime,
  refreshExpiresInKey,
  refreshingRefreshTokenKey,
  refreshingTokenKey,
  refreshTokenKey,
  remainingTokenTime,
  tokenKey,
} from "../utilities/globals";
import makeRequest, {
  getTokenExpirationTime,
} from "../utilities/globalFunctions";
import {
  refreshAccessTokenService,
  refreshRefreshTokenService,
} from "../services/requests/authService";
import {
  RefreshAccessTokenRequest,
  RefreshRefreshTokenRequest,
} from "../models/Requests";
import { setToken } from "../redux/userSlice";
import useShowNotification from "../hooks/utilHooks";
import { useTranslation } from "react-i18next";
import {
  RefreshAccessTokenResponse,
  RefreshRefreshTokenResponse,
  useApiParams,
} from "../models/Interfaces";

let socketUserAPI: Socket | null = null;

export default function useUserSocket() {
  const logout = useLogout();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [isUserActive, setIsUserActive] = useState(true);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const [refreshTokenExpiration, setRefreshTokenExpiration] = useState<
    number | null
  >(null);
  const activityTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      disconnectSocket();
      if (activityTimeout.current) clearTimeout(activityTimeout.current);
      if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => handleTokenExpiration(tokenExpiration, true),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokenExpiration]
  );

  useEffect(
    () => handleTokenExpiration(refreshTokenExpiration, false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshTokenExpiration]
  );

  /** Funciones */

  function handleTokenUpdatedEvent(event: StorageEvent) {
    if (event.key === refreshingTokenKey) {
      console.log("Actualizado Token, sincronizando...");
    } else if (event.key === refreshingRefreshTokenKey) {
      console.log("Actualizado Refresh Token, sincronizando...");
    }
  }

  function connectSocket() {
    window.addEventListener("storage", handleTokenUpdatedEvent);

    // Detectar inactividad del usuario
    window.addEventListener("mousemove", resetActivity);
    window.addEventListener("keydown", resetActivity);
    window.addEventListener("click", resetActivity);

    if (!socketUserAPI) {
      socketUserAPI = io(import.meta.env.VITE_USERS_SOCKET_URL);

      if (socketUserAPI) {
        socketUserAPI.on("connect", () => {
          console.log("Connected user");
          socketUserAPI?.emit("joinRoom", `roomLogin${uid}`);
        });

        socketUserAPI.on("joinedRoom", (message) => {
          console.log(message);
        });

        socketUserAPI.on("updateToken", (data) => {
          console.log("Sala token", data);
        });

        socketUserAPI.on("suspend", () => {
          logout();
        });
      }
    }
  }

  function disconnectSocket() {
    console.log("REMOVING");
    window.removeEventListener("mousemove", resetActivity);
    window.removeEventListener("keydown", resetActivity);
    window.removeEventListener("click", resetActivity);
    window.removeEventListener("storage", handleTokenUpdatedEvent);
    if (socketUserAPI) {
      console.log("Socket user disconnected");
      socketUserAPI.removeAllListeners();
      socketUserAPI.disconnect();
      socketUserAPI = null;
    }
  }

  // Resetear actividad del usuario
  const resetActivity = useCallback(() => {
    // if (activityTimeout.current) clearTimeout(activityTimeout.current);
    // setIsUserActive(true);
    // console.log("setting IsUserActive to", true);
    // activityTimeout.current = setTimeout(() => {
    //   setIsUserActive(false);
    // }, inactivityTime * 1000);
  }, []);

  function handleTokenExpiration(
    expirationTime: number | null,
    isAccessToken: boolean
  ) {
    console.log(
      `${isAccessToken ? "" : "Refresh"}tokenExpiration, isUserActive`,
      tokenExpiration,
      isUserActive
    );
    if (expirationTime == null) return;

    let retryInterval: NodeJS.Timeout | null = null;

    const interval = setInterval(async () => {
      const timeLeft = Math.floor((expirationTime - Date.now()) / 1000);
      console.log(
        `Tiempo restante para la expiración del ${
          isAccessToken ? "" : "refresh"
        } token: ${timeLeft} segundos`
      );
      // Refrescar token si queda menos de cierto tiempo
      if (timeLeft <= remainingTokenTime) {
        // && isUserActive
        const attemptsNumber = 3;
        let count = 0;
        // Interval para reintentar refrescar el token si hubo un error
        retryInterval = setInterval(async () => {
          const success = await refreshToken(isAccessToken);
          // Si no se pudo refrescar token, cerrar sesión después de un tiempo
          if (success === false) {
            localStorage.removeItem(tokenKey);
            localStorage.removeItem(refreshTokenKey);
            localStorage.removeItem(expiresInKey);
            localStorage.removeItem(refreshExpiresInKey);
            setTokenExpiration(null);
            setRefreshTokenExpiration(null);
            showNotification("error", t("noRefreshTokenMsg"));
            clearInterval(retryInterval!);
            retryInterval = null;
            logoutTimeout.current = setTimeout(() => {
              logout();
            }, logoutAfterNoTokenRefreshTime * 1000);
          }
          if (success === null || success || count + 1 === attemptsNumber) {
            clearInterval(retryInterval!);
            retryInterval = null;
            return;
          }
          count += 1;
        }, 2000);
      }
    }, remainingTokenTime * 1000);

    return () => {
      clearInterval(interval);
      if (retryInterval) clearInterval(retryInterval);
    };
  }

  async function refreshToken(isAccesToken: boolean) {
    console.log(`Solicitando nuevo ${isAccesToken ? "" : "refresh"} token...`);
    try {
      if (
        localStorage.getItem(
          isAccesToken ? refreshingTokenKey : refreshingRefreshTokenKey
        ) === "true"
      ) {
        console.log(
          `Refrescamiento de ${isAccesToken ? "" : "refresh"} token en proceso.`
        );
        return null;
      }

      localStorage.setItem(
        isAccesToken ? refreshingTokenKey : refreshingRefreshTokenKey,
        "true"
      );

      const accessToken = localStorage.getItem(tokenKey);
      const refreshToken = localStorage.getItem(refreshTokenKey);
      if (
        (isAccesToken && accessToken && refreshToken) ||
        (!isAccesToken && refreshToken)
      ) {
        let apiParams:
          | useApiParams<RefreshAccessTokenRequest>
          | useApiParams<RefreshRefreshTokenRequest>
          | null = null;
        if (isAccesToken && accessToken && refreshToken) {
          const apiParams2: useApiParams<RefreshAccessTokenRequest> = {
            service: refreshAccessTokenService(),
            method: "post",
            dataToSend: {
              accessToken,
              refreshToken,
            },
          };
          apiParams = apiParams2;
        } else if (!isAccesToken && refreshToken) {
          const apiParams2: useApiParams<RefreshRefreshTokenRequest> = {
            service: refreshRefreshTokenService(),
            method: "post",
            dataToSend: {
              refreshToken,
            },
          };
          apiParams = apiParams2;
        }

        if (apiParams) {
          const { responseData, errorMsg } = await makeRequest(apiParams);
          if (responseData) {
            if (isAccesToken) {
              const respData = responseData as RefreshAccessTokenResponse;
              saveToken(respData.accessToken, respData.expiresIn, true);
              window.dispatchEvent(new Event(refreshingTokenKey));
              socketUserAPI?.emit("authenticate", respData.accessToken);
              console.log(`Token actualizado correctamente`);
              return true;
            } else {
              const respData = responseData as RefreshRefreshTokenResponse;
              saveToken(respData.accessToken, respData.accessExpiresIn, true);
              saveToken(
                respData.refreshToken,
                respData.refreshExpiresIn,
                false
              );
              window.dispatchEvent(new Event(refreshingTokenKey));
              window.dispatchEvent(new Event(refreshingRefreshTokenKey));
              socketUserAPI?.emit("authenticate", respData.accessToken);
              console.log("Refresh token actualizado correctamente");
              return true;
            }
          }
          throw new Error(errorMsg ?? "Refresh token error");
        }
      }
      return false;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      return false;
      // localStorage.removeItem('refreshToken');
    } finally {
      localStorage.removeItem(refreshingTokenKey);
      localStorage.removeItem(refreshingRefreshTokenKey);
    }
  }

  function saveToken(
    newToken: string,
    newExpiresIn: number,
    isAccesToken: boolean
  ) {
    const tokenExp = getTokenExpirationTime(newExpiresIn);
    localStorage.setItem(
      isAccesToken ? expiresInKey : refreshExpiresInKey,
      tokenExp.toString()
    );
    localStorage.setItem(isAccesToken ? tokenKey : refreshTokenKey, newToken);
    if (isAccesToken) {
      dispatch(setToken(newToken));
      setTokenExpiration(tokenExp);
    } else setRefreshTokenExpiration(tokenExp);
  }

  return {
    connectUserSocket: connectSocket,
    disconnectUserSocket: disconnectSocket,
    setTokenExpiration,
    setRefreshTokenExpiration,
  };
}
