import { useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { pageSizeOptionsSt } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";
import { SocketResponse } from "../models/Interfaces";

let socketAPI: Socket | null = null; // Singleton instance of the socket

export default function useSocket() {
  const { useFilter, retrieveRequirements, page, type, updateChangesQueue } =
    useContext(HomeContext);

  // Initialize socket connection once
  useEffect(() => {
    if (!socketAPI) {
      socketAPI = io(import.meta.env.VITE_SOCKET_URL);

      socketAPI.on("connect", () => {
        console.log("Connected");
        socketAPI?.emit("joinRoom", "homeRequeriment");
      });

      socketAPI.on("requeriment", (payload: SocketResponse) => {
        console.log("Nuevo requerimiento creado recibido:", payload);
        if (page == 1 && !useFilter) updateChangesQueue(payload);
      });
    }

    // Cleanup when the component unmounts
    return () => {
      if (socketAPI) {
        console.log("Socket disconnected");
        socketAPI.disconnect();
        socketAPI = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!useFilter) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (!useFilter) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, useFilter]);

  async function getData() {
    retrieveRequirements(page, pageSizeOptionsSt[0]);
  }

  return {};
}
