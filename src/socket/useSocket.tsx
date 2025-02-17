import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  PurchaseOrderTableTypes,
  RequirementType,
  SocketChangeType,
  TableTypes,
} from "../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { SocketResponse } from "../models/Interfaces";
import { SearchTableRequest } from "../models/Requests";
import { hasNoSortNorFilter } from "../utilities/globalFunctions";

let socketAPI: Socket | null = null;

export default function useSocket(
  tableType: TableTypes,
  subType: RequirementType,
  page: number,
  searchTableRequest: SearchTableRequest | undefined,
  updateChangesQueue: (
    payload: SocketResponse,
    canAddRowUpdate: boolean
  ) => void,
  orderType?: PurchaseOrderTableTypes
) {
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const uid = useSelector((state: MainState) => state.user.uid);
  const pageRef = useRef(page);
  const searchTableRequestRef = useRef(searchTableRequest);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    searchTableRequestRef.current = searchTableRequest;
  }, [searchTableRequest]);

  useEffect(() => {
    if (!socketAPI) {
      if (subType == RequirementType.GOOD)
        socketAPI = io(import.meta.env.VITE_REQUIREMENTS_SOCKET_URL);
      else if (subType == RequirementType.SERVICE)
        socketAPI = io(import.meta.env.VITE_SERVICES_SOCKET_URL);
      else if (subType == RequirementType.SALE) {
        socketAPI = io(import.meta.env.VITE_SALES_SOCKET_URL);
      }
      if (socketAPI) {
        socketAPI.on("connect", () => {
          console.log("Connected");
          const roomName = getRoomName();
          if (roomName) socketAPI?.emit("joinRoom", roomName + mainUid);
        });

        socketAPI.on("joinedRoom", (message) => {
          console.log(message);
        });

        socketAPI.on("updateRoom", (data: SocketResponse) => {
          console.log("Received", data);
          const isAllTypeTableVar = isAllTypeTable();
          const canAddRow = pageRef.current == 1;

          if (
            // Agregar cambios a cola si la tabla es de  tipo All o si el cambio pertenece a usuario
            (isAllTypeTableVar || (!isAllTypeTableVar && uid == data.userId)) &&
            (data.typeSocket == SocketChangeType.UPDATE ||
              (data.typeSocket == SocketChangeType.CREATE &&
                canAddRow &&
                searchTableRequestRef.current &&
                hasNoSortNorFilter(searchTableRequestRef.current)))
          )
            updateChangesQueue(data, canAddRow);
        });
      }
    }

    return () => {
      if (socketAPI) {
        console.log("Disconnected");
        socketAPI.disconnect();
        socketAPI = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subType, orderType]);

  function getRoomName() {
    let roomName: string = "";
    if (
      tableType == TableTypes.REQUIREMENT ||
      tableType == TableTypes.ALL_REQUIREMENTS
    ) {
      if (subType == RequirementType.GOOD) roomName = "roomRequerimentProduct";
      else if (subType == RequirementType.SERVICE)
        roomName = "roomRequerimentService";
      else if (subType == RequirementType.SALE)
        roomName = "roomRequerimentLiquidation";
    }
    if (tableType == TableTypes.OFFER || tableType == TableTypes.ALL_OFFERS) {
      if (subType == RequirementType.GOOD) roomName = "roomOfferProduct";
      else if (subType == RequirementType.SERVICE)
        roomName = "roomOfferService";
      else if (subType == RequirementType.SALE)
        roomName = "roomOfferLiquidation";
    }
    if (
      tableType == TableTypes.PURCHASE_ORDER ||
      tableType == TableTypes.ALL_PURCHASE_ORDERS
    ) {
      if (subType == RequirementType.GOOD) {
        if (orderType == PurchaseOrderTableTypes.ISSUED)
          roomName = "roomPurchaseOrderClientProduct";
        else if (orderType == PurchaseOrderTableTypes.RECEIVED)
          roomName = "roomPurchaseOrderProviderProduct";
      } else if (subType == RequirementType.SERVICE) {
        if (orderType == PurchaseOrderTableTypes.ISSUED)
          roomName = "roomPurchaseOrderClientService";
        else if (orderType == PurchaseOrderTableTypes.RECEIVED)
          roomName = "roomPurchaseOrderProviderService";
      }
    }
    if (
      tableType == TableTypes.SALES_ORDER ||
      tableType == TableTypes.ALL_SALES_ORDERS
    ) {
      if (subType == RequirementType.SALE) {
        if (orderType == PurchaseOrderTableTypes.ISSUED)
          roomName = "roomSaleOrderProviderLiquidation";
        else if (orderType == PurchaseOrderTableTypes.RECEIVED)
          roomName = "roomSaleOrderClientLiquidation";
      }
    }
    return roomName;
  }

  function isAllTypeTable() {
    return (
      tableType == TableTypes.ALL_REQUIREMENTS ||
      tableType == TableTypes.ALL_OFFERS ||
      tableType == TableTypes.ALL_PURCHASE_ORDERS ||
      tableType == TableTypes.ALL_SALES_ORDERS
    );
  }
}
