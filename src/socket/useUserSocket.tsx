import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLogout } from "../hooks/authHooks";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  expiresInKey,
  logoutAfterNoTokenRefreshTime,
  refreshExpiresInKey,
  refreshingRefreshTokenKey,
  refreshingTokenKey,
  remainingTokenTime,
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
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const [refreshTokenExpiration, setRefreshTokenExpiration] = useState<
    number | null
  >(null);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      disconnectSocket();
      if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      const cleanup = handleTokenExpiration(tokenExpiration, true);
      return cleanup;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokenExpiration]
  );

  useEffect(
    () => {
      const cleanup = handleTokenExpiration(refreshTokenExpiration, false);
      return cleanup;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshTokenExpiration]
  );

  /** Funciones */

  function handleTokenUpdatedEvent(event: StorageEvent) {
    if (event.key === refreshingTokenKey) {
      console.log("Actualizando Token, sincronizando...");
    } else if (event.key === refreshingRefreshTokenKey) {
      console.log("Actualizando Refresh Token, sincronizando...");
    }
  }

  function connectSocket() {
    window.addEventListener("storage", handleTokenUpdatedEvent);

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
    window.removeEventListener("storage", handleTokenUpdatedEvent);
    if (socketUserAPI) {
      console.log("Socket user disconnected");
      socketUserAPI.removeAllListeners();
      socketUserAPI.disconnect();
      socketUserAPI = null;
    }
  }

  function handleTokenExpiration(
    expirationTime: number | null,
    isAccessToken: boolean
  ) {
    if (expirationTime == null) return;
    console.log("calling handleTokenExpiration");
    // let retryInterval: NodeJS.Timeout | null = null;

    const interval = setInterval(async () => {
      const timeLeft = Math.floor((expirationTime - Date.now()) / 1000);
      console.log(
        `Tiempo restante para la expiración del ${
          isAccessToken ? "" : "refresh"
        } token: ${timeLeft} segundos`
      );
      // // Refrescar token si queda menos de cierto tiempo
      // if (
      //   timeLeft -
      //     (attemptsToRetryRefreshingToken + 1) *
      //       intervalToRetryRefreshingToken <=
      //   remainingTokenTime -
      //     (attemptsToRetryRefreshingToken + 1) * intervalToRetryRefreshingToken
      // ) {
      //   let count = 0;
      //   // Interval para reintentar refrescar el token si hubo un error
      //   retryInterval = setInterval(async () => {
      //     const success = await refreshToken(isAccessToken);
      //     // Si no se pudo refrescar token, cerrar sesión después de un tiempo
      //     if (
      //       success === false &&
      //       count + 1 === attemptsToRetryRefreshingToken
      //     ) {
      //       localStorage.removeItem(tokenKey);
      //       localStorage.removeItem(refreshTokenKey);
      //       localStorage.removeItem(expiresInKey);
      //       localStorage.removeItem(refreshExpiresInKey);
      //       setTokenExpiration(null);
      //       setRefreshTokenExpiration(null);
      //       showNotification("error", t("noRefreshTokenMsg"));
      //       clearInterval(retryInterval!);
      //       retryInterval = null;
      //       logoutTimeout.current = setTimeout(() => {
      //         logout();
      //       }, logoutAfterNoTokenRefreshTime * 1000);
      //     }
      //     if (
      //       success === null ||
      //       success ||
      //       count + 1 === attemptsToRetryRefreshingToken
      //     ) {
      //       console.log("clear interval");
      //       clearInterval(retryInterval!);
      //       retryInterval = null;
      //       return;
      //     }
      //     count += 1;
      //   }, intervalToRetryRefreshingToken * 1000);
      // }

      // Refrescar token si queda menos de cierto tiempo
      if (timeLeft <= remainingTokenTime) {
        await refreshTokenAndHandleResult(isAccessToken);
      }
    }, remainingTokenTime * 1000);

    return () => {
      clearInterval(interval);
      // if (retryInterval) clearInterval(retryInterval);
    };
  }

  async function refreshTokenAndHandleResult(isAccessToken: boolean) {
    const success = await refreshToken(isAccessToken);
    // Si no se pudo refrescar token, cerrar sesión después de un tiempo
    if (success === false) {
      localStorage.removeItem(expiresInKey);
      localStorage.removeItem(refreshExpiresInKey);
      setTokenExpiration(null);
      setRefreshTokenExpiration(null);
      showNotification("error", t("noRefreshTokenMsg"));
      logoutTimeout.current = setTimeout(() => {
        logout();
      }, logoutAfterNoTokenRefreshTime * 1000);
    }
    if (success === null || success) {
      console.log("successful || actualizando en otra ventana");
      return;
    }
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

      localStorage.setItem(refreshingTokenKey, "true");

      if (!isAccesToken)
        localStorage.setItem(refreshingRefreshTokenKey, "true");

      let apiParams:
        | useApiParams<RefreshAccessTokenRequest>
        | useApiParams<RefreshRefreshTokenRequest>
        | null = null;
      if (isAccesToken) {
        const apiParams2: useApiParams<RefreshAccessTokenRequest> = {
          service: refreshAccessTokenService(),
          method: "post",
          dataToSend: {},
        };
        apiParams = apiParams2;
      } else if (!isAccesToken) {
        const apiParams2: useApiParams<RefreshRefreshTokenRequest> = {
          service: refreshRefreshTokenService(),
          method: "post",
          dataToSend: {},
        };
        apiParams = apiParams2;
      }

      if (apiParams) {
        const { responseData, errorMsg } = await makeRequest(apiParams);
        if (responseData) {
          if (isAccesToken) {
            const respData = responseData as RefreshAccessTokenResponse;
            saveToken(respData.expiresIn, true);
            window.dispatchEvent(new Event(refreshingTokenKey));
            console.log(`Token actualizado correctamente`);
            return true;
          } else {
            const respData = responseData as RefreshRefreshTokenResponse;
            saveToken(respData.accessExpiresIn, true);
            saveToken(respData.refreshExpiresIn, false);
            window.dispatchEvent(new Event(refreshingTokenKey));
            window.dispatchEvent(new Event(refreshingRefreshTokenKey));
            console.log("Refresh token actualizado correctamente");
            return true;
          }
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
      if (!isAccesToken) localStorage.removeItem(refreshingRefreshTokenKey);
    }
  }

  function saveToken(newExpiresIn: number, isAccesToken: boolean) {
    const tokenExp = getTokenExpirationTime(newExpiresIn);
    localStorage.setItem(
      isAccesToken ? expiresInKey : refreshExpiresInKey,
      tokenExp.toString()
    );
    if (isAccesToken) {
      setTokenExpiration(tokenExp);
    } else setRefreshTokenExpiration(tokenExp);
  }

  return {
    connectUserSocket: connectSocket,
    disconnectUserSocket: disconnectSocket,
    setTokenExpiration,
    setRefreshTokenExpiration,
    refreshTokenAndHandleResult,
  };
}
