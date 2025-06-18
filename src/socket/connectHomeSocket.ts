import { io, Socket } from "socket.io-client";
import { RequirementType, SocketChangeType } from "../utilities/types";
import { SocketResponse } from "../models/Interfaces";

export function connectHomeSocket(
  type: RequirementType,
  currentPage: number,
  useFilter: boolean,
  updateChangesQueue: (
    payload: SocketResponse,
    canAddRowUpdate: boolean
  ) => void
) {
  let socketHomeAPI: Socket | null = null;
  if (type == RequirementType.GOOD)
    socketHomeAPI = io(import.meta.env.VITE_REQUIREMENTS_SOCKET_URL);
  else if (type == RequirementType.SERVICE)
    socketHomeAPI = io(import.meta.env.VITE_SERVICES_SOCKET_URL);
  else if (type == RequirementType.SALE)
    socketHomeAPI = io(import.meta.env.VITE_SALES_SOCKET_URL);

  if (socketHomeAPI) {
    socketHomeAPI.on("connect", () => {
      console.log("Connected");
      socketHomeAPI?.emit(
        "joinRoom",
        type == RequirementType.GOOD
          ? "homeRequerimentProduct"
          : type == RequirementType.SERVICE
          ? "homeRequerimentService"
          : "homeRequerimentLiquidation"
      );
    });

    socketHomeAPI.on("joinedRoom", (message) => {
      console.log(message);
    });

    socketHomeAPI.on("updateRoom", (payload: SocketResponse) => {
      console.log("Nuevos datos recibido:", payload);
      try {
        const canAddRow: boolean = currentPage == 1 && !useFilter;
        if (
          payload.typeSocket == SocketChangeType.UPDATE ||
          (payload.typeSocket == SocketChangeType.CREATE && canAddRow)
        )
          updateChangesQueue(payload, canAddRow);
      } catch (e) {
        console.log(e);
      }
    });
  }
}
