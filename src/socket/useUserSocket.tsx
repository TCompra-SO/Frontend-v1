import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useLogout } from "../hooks/authHooks";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";

let socketUserAPI: Socket | null = null;

export default function useUserSocket() {
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const logout = useLogout();
  function disconnectSocket() {
    if (socketUserAPI) {
      console.log("Socket user disconnected");
      socketUserAPI.disconnect();
      socketUserAPI = null;
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      if (!socketUserAPI) {
        socketUserAPI = io(import.meta.env.VITE_SALES_SOCKET_URL);
      }
      if (socketUserAPI) {
        socketUserAPI.on("connect", () => {
          console.log("Connected user");
        });
        // setTimeout(() => {
        //   console.log("dddddd");
        //   logout();
        // }, 5000);
      }
    } else disconnectSocket();
    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
}
