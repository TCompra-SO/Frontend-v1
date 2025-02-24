import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useLogout } from "../hooks/authHooks";

let socketUserAPI: Socket | null = null;

export default function useUserSocket() {
  const logout = useLogout();

  useEffect(() => {
    if (!socketUserAPI) {
      socketUserAPI = io(import.meta.env.VITE_SALES_SOCKET_URL);
    }
    if (socketUserAPI) {
      socketUserAPI.on("connect", () => {
        console.log("Connected user");
      });

      setTimeout(() => {
        logout();
      }, 5000);
    }

    return () => {
      if (socketUserAPI) {
        console.log("Socket user disconnected");
        socketUserAPI.disconnect();
        socketUserAPI = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
