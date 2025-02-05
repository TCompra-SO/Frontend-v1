import { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { pageSizeOptionsSt } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";
import { SocketResponse } from "../models/Interfaces";
import { RequirementType, SocketChangeType } from "../utilities/types";

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
        socketAPI?.emit(
          "joinRoom",
          type == RequirementType.GOOD
            ? "homeRequerimentProduct"
            : type == RequirementType.SERVICE
            ? "homeRequerimentService"
            : "homeRequerimentLiquidation"
        );
      });

      socketAPI.on("joinedRoom", (message) => {
        console.log(message);
      });

      socketAPI.on("updateRoom", (payload: SocketResponse) => {
        console.log("Nuevo requerimiento recibido:", payload);
        const canAddRow: boolean =
          pageRef.current == 1 && !useFilterRef.current;
        if (
          payload.typeSocket == SocketChangeType.UPDATE ||
          (payload.typeSocket == SocketChangeType.CREATE && canAddRow)
        )
          updateChangesQueue(payload, canAddRow);
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
