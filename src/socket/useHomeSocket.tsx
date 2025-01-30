import { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { pageSizeOptionsSt } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";
import { SocketResponse } from "../models/Interfaces";

let socketAPI: Socket | null = null;

export default function useHomeSocket() {
  const { useFilter, retrieveRequirements, page, type, updateChangesQueue } =
    useContext(HomeContext);
  const useFilterRef = useRef(useFilter);
  const pageRef = useRef(page);

  useEffect(() => {
    if (!useFilter) getData();

    if (!socketAPI) {
      socketAPI = io(import.meta.env.VITE_SOCKET_URL);

      socketAPI.on("connect", () => {
        console.log("Connected");
        socketAPI?.emit("joinRoom", "homeRequeriment");
      });

      socketAPI.on("requeriment", (payload: SocketResponse) => {
        console.log("Nuevo requerimiento creado recibido:", payload);
        if (pageRef.current == 1 && !useFilterRef.current)
          updateChangesQueue(payload);
      });
    }

    return () => {
      if (socketAPI) {
        console.log("Socket disconnected");
        socketAPI.disconnect();
        socketAPI = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    useFilterRef.current = useFilter;
  }, [useFilter]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (!useFilter) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, useFilter]);

  async function getData() {
    retrieveRequirements(page, pageSizeOptionsSt[0]);
  }
}
