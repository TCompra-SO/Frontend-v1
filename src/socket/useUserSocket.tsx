import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLogout } from "../hooks/authHooks";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  expiresInKey,
  inactivityTime,
  logoutAfterNoTokenRefreshTime,
  refreshingTokenKey,
  refreshTokenKey,
  remainingTokenTime,
  tokenKey,
} from "../utilities/globals";
import makeRequest, {
  getTokenExpirationTime,
} from "../utilities/globalFunctions";
import { refreshAccessTokenService } from "../services/requests/authService";
import { RefreshAccessTokenRequest } from "../models/Requests";
import { setToken } from "../redux/userSlice";
import useShowNotification from "../hooks/utilHooks";
import { useTranslation } from "react-i18next";
import { refreshAccessTokenResponse } from "../models/Interfaces";

let socketUserAPI: Socket | null = null;

export default function useUserSocket() {
  const logout = useLogout();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [isUserActive, setIsUserActive] = useState(true);
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const activityTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleTokenUpdatedEvent(event: StorageEvent) {
      if (event.key === refreshingTokenKey) {
        console.log("Token actualizado, sincronizando...");
      }
    }

    window.addEventListener("storage", handleTokenUpdatedEvent);

    // Detectar inactividad del usuario
    window.addEventListener("mousemove", resetActivity);
    window.addEventListener("keydown", resetActivity);
    window.addEventListener("click", resetActivity);

    return () => {
      disconnectSocket();
      window.removeEventListener("mousemove", resetActivity);
      window.removeEventListener("keydown", resetActivity);
      window.removeEventListener("click", resetActivity);
      window.removeEventListener("storage", handleTokenUpdatedEvent);
      if (activityTimeout.current) clearTimeout(activityTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(tokenExpiration, isUserActive);

    let retryInterval: NodeJS.Timeout | null = null;

    if (tokenExpiration) {
      const interval = setInterval(async () => {
        const timeLeft = Math.floor((tokenExpiration - Date.now()) / 1000);
        console.log(
          `Tiempo restante para la expiración del token: ${timeLeft} segundos`
        );
        // Refrescar token si el usuario está activo y queda menos de cierto tiempo
        if (timeLeft <= remainingTokenTime && isUserActive) {
          const attemptsNumber = 3;
          let count = 0;
          // Reintentar refrescar el token si hubo un error
          retryInterval = setInterval(async () => {
            const success = await refreshToken();
            if (success === null || success || count + 1 === attemptsNumber) {
              clearInterval(retryInterval!);
              retryInterval = null;
              // Si no se pudo refrescar token, cerrar sesión después de un tiempo
              if (success === false) {
                localStorage.removeItem(tokenKey);
                localStorage.removeItem(refreshTokenKey);
                localStorage.removeItem(expiresInKey);
                showNotification("error", t("noRefreshTokenMsg"));
                setTimeout(() => {
                  logout();
                }, logoutAfterNoTokenRefreshTime * 1000);
              }
              return;
            }
            count += 1;
          }, 1500);
        }
      }, remainingTokenTime * 1000);

      return () => {
        if (interval) clearInterval(interval);
        if (retryInterval) clearInterval(retryInterval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenExpiration, isUserActive]);

  /** Funciones */

  function connectSocket() {
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
    if (socketUserAPI) {
      console.log("Socket user disconnected");
      socketUserAPI.removeAllListeners();
      socketUserAPI.disconnect();
      socketUserAPI = null;
    }
  }

  // Resetear actividad del usuario
  function resetActivity() {
    if (activityTimeout.current) clearTimeout(activityTimeout.current);
    setIsUserActive(true);
    activityTimeout.current = setTimeout(() => {
      setIsUserActive(false);
    }, inactivityTime * 1000);
  }

  async function refreshToken() {
    console.log("Solicitando nuevo token...");
    try {
      if (localStorage.getItem(refreshingTokenKey) === "true") {
        console.log("Refrescamiento en proceso.");
        return null;
      }

      localStorage.setItem(refreshingTokenKey, "true");

      const accessToken = localStorage.getItem(tokenKey);
      const refreshToken = localStorage.getItem(refreshTokenKey);
      if (accessToken && refreshToken) {
        const { responseData, errorMsg } =
          await makeRequest<RefreshAccessTokenRequest>({
            service: refreshAccessTokenService(),
            method: "post",
            dataToSend: {
              accessToken,
              refreshToken,
            },
          });

        if (responseData) {
          const respData = responseData.data as refreshAccessTokenResponse;
          const newToken = respData.accessToken;
          const newExpiresIn = respData.expiresIn;
          saveAccessToken(newToken, newExpiresIn);
          window.dispatchEvent(new Event(refreshingTokenKey));

          socketUserAPI?.emit("authenticate", newToken);
          console.log("Token actualizado correctamente");
          return true;
        }
        throw new Error(errorMsg ?? "Refresh token error");
      }
      return false;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      return false;
      // localStorage.removeItem('refreshToken');
    } finally {
      localStorage.removeItem(refreshingTokenKey);
    }
  }

  function saveAccessToken(newToken: string, newExpiresIn: number) {
    const tokenExp = getTokenExpirationTime(newExpiresIn);
    localStorage.setItem(expiresInKey, tokenExp.toString());
    localStorage.setItem(tokenKey, newToken);
    dispatch(setToken(newToken));
  }

  return {
    connectUserSocket: connectSocket,
    disconnectUserSocket: disconnectSocket,
    setTokenExpiration,
  };
}
