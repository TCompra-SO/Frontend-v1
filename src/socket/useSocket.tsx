import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import {
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { SocketResponse } from "../models/Interfaces";

let socketAPI: Socket | null = null;

export default function useSocket(
  tableType: TableTypes,
  subType: RequirementType | PurchaseOrderTableTypes,
  updateChangesQueue: (payload: SocketResponse) => void
) {
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const uid = useSelector((state: MainState) => state.user.uid);

  useEffect(() => {
    if (!socketAPI) {
      socketAPI = io(import.meta.env.VITE_SOCKET_URL);

      socketAPI.on("connect", () => {
        console.log("Connected");
        const roomName = getRoomName();
        if (roomName) socketAPI?.emit("joinRoom", roomName + mainUid);
      });

      socketAPI.on("joinedRoom", (message) => {
        console.log(message);
      });

      socketAPI.on("updateRoom", (data: SocketResponse) => {
        console.log("Recibimos esto de la sala", data);
        if (uid == data.userId) updateChangesQueue(data);
      });
    }

    return () => {
      if (socketAPI) {
        console.log("Disconnected");
        socketAPI.disconnect();
        socketAPI = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRoomName() {
    let roomName: string = "";
    if (
      tableType == TableTypes.REQUIREMENT ||
      tableType == TableTypes.ALL_REQUIREMENTS
    ) {
      if (subType == RequirementType.GOOD) roomName = "roomRequeriment";
      else if (subType == RequirementType.SERVICE) roomName = "roomRequeriment";
      else if (subType == RequirementType.SALE) roomName = "roomRequeriment";
    }
    if (tableType == TableTypes.OFFER || tableType == TableTypes.ALL_OFFERS) {
      if (subType == RequirementType.GOOD) roomName = "roomRequeriment";
      else if (subType == RequirementType.SERVICE) roomName = "roomRequeriment";
      else if (subType == RequirementType.SALE) roomName = "roomRequeriment";
    }
    if (
      tableType == TableTypes.PURCHASE_ORDER ||
      tableType == TableTypes.ALL_PURCHASE_ORDERS
    ) {
      if (subType == PurchaseOrderTableTypes.ISSUED)
        roomName = "roomRequeriment";
      else if (subType == PurchaseOrderTableTypes.RECEIVED)
        roomName = "roomRequeriment";
    }
    if (
      tableType == TableTypes.SALES_ORDER ||
      tableType == TableTypes.ALL_SALES_ORDERS
    ) {
      if (subType == PurchaseOrderTableTypes.ISSUED)
        roomName = "roomRequeriment";
      else if (subType == PurchaseOrderTableTypes.RECEIVED)
        roomName = "roomRequeriment";
    }
    return roomName;
  }
}
