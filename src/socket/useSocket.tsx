import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  CertificateRooms,
  OrderTableType,
  RequirementType,
  SocketChangeType,
  TableTypes,
} from "../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { SocketResponse } from "../models/Interfaces";
import { SearchTableRequest } from "../models/Requests";
import { hasNoSortNorFilter } from "../utilities/globalFunctions";
import { connectHomeSocket } from "./connectHomeSocket";

let socketAPI: Socket | null = null;
let extraSocketAPI: Socket | null = null;

export default function useSocket(
  tableType: TableTypes,
  subType: RequirementType | undefined,
  page: number,
  searchTableRequest: SearchTableRequest | undefined,
  updateChangesQueue: (
    payload: SocketResponse,
    canAddRowUpdate: boolean
  ) => void,
  orderType?: OrderTableType,
  getUseFilter?: () => boolean | null
) {
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const uid = useSelector((state: MainState) => state.user.uid);
  const pageRef = useRef(page);
  const searchTableRequestRef = useRef(searchTableRequest);

  useEffect(() => {
    return () => {
      disconnectSockets();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    searchTableRequestRef.current = searchTableRequest;
  }, [searchTableRequest]);

  useEffect(() => {
    if (!socketAPI) {
      if (tableType == TableTypes.ADMIN_SALES && getUseFilter) {
        socketAPI = connectHomeSocket(
          RequirementType.SALE,
          () => pageRef.current,
          getUseFilter,
          updateChangesQueue
        );
      } else {
        if (
          tableType == TableTypes.MY_DOCUMENTS ||
          tableType == TableTypes.SENT_CERT ||
          tableType == TableTypes.RECEIVED_CERT ||
          tableType == TableTypes.USERS
        )
          socketAPI = io(import.meta.env.VITE_USERS_SOCKET_URL);
        else if (subType == RequirementType.GOOD)
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
            try {
              const isAllTypeTableVar = isAllTypeTable();
              const canAddRow = pageRef.current == 1;

              if (
                // Agregar cambios a cola si la tabla es de  tipo All o si el cambio pertenece a usuario
                (isAllTypeTableVar ||
                  (!isAllTypeTableVar && uid == data.userId)) &&
                (data.typeSocket == SocketChangeType.DELETE ||
                  data.typeSocket == SocketChangeType.UPDATE_FIELD ||
                  data.typeSocket == SocketChangeType.UPDATE ||
                  (data.typeSocket == SocketChangeType.CREATE &&
                    canAddRow &&
                    searchTableRequestRef.current &&
                    hasNoSortNorFilter(searchTableRequestRef.current)))
              ) {
                if (tableType == TableTypes.MY_DOCUMENTS) {
                  // caso especial: lista de certificados agregados
                  if (data.typeSocket == SocketChangeType.CREATE)
                    data.dataPack.data.forEach((cert) => {
                      updateChangesQueue(
                        { ...data, dataPack: { data: [cert] } },
                        canAddRow
                      );
                    });
                  else if (
                    data.typeSocket == SocketChangeType.DELETE ||
                    data.typeSocket == SocketChangeType.UPDATE_FIELD
                  )
                    updateChangesQueue(data, canAddRow);
                } else updateChangesQueue(data, canAddRow);
              }
            } catch (e) {
              console.log(e);
            }
          });
        }
      }
    }

    if (tableType == TableTypes.OFFER) {
      // segundo socket para ofertas
      if (!extraSocketAPI) {
        extraSocketAPI = io(import.meta.env.VITE_USERS_SOCKET_URL);

        if (extraSocketAPI) {
          extraSocketAPI.on("connect", () => {
            console.log("Connected e");
            const roomName = getRoomName(true);
            if (roomName) extraSocketAPI?.emit("joinRoom", roomName + mainUid);
          });

          extraSocketAPI.on("joinedRoom", (message) => {
            console.log(message);
          });

          extraSocketAPI.on("updateRoom", (data: SocketResponse) => {
            console.log("Received", data);
            try {
              const isAllTypeTableVar = isAllTypeTable();
              const canAddRow = pageRef.current == 1;

              if (
                // Agregar cambios a cola si la tabla es de  tipo All o si el cambio pertenece a usuario
                (isAllTypeTableVar ||
                  (!isAllTypeTableVar && uid == data.userId)) &&
                (data.typeSocket == SocketChangeType.DELETE ||
                  data.typeSocket == SocketChangeType.UPDATE ||
                  (data.typeSocket == SocketChangeType.CREATE &&
                    canAddRow &&
                    searchTableRequestRef.current &&
                    hasNoSortNorFilter(searchTableRequestRef.current)))
              ) {
                updateChangesQueue(data, canAddRow);
              }
            } catch (e) {
              console.log(e);
            }
          });
        }
      }
    }

    return () => {
      disconnectSockets();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subType, orderType]);

  /** Funciones */

  function disconnectSockets() {
    if (socketAPI) {
      socketAPI.removeAllListeners();
      socketAPI.disconnect();
      socketAPI = null;
      console.log("Disconnected", tableType);
    }
    if (extraSocketAPI) {
      extraSocketAPI.removeAllListeners();
      extraSocketAPI.disconnect();
      extraSocketAPI = null;
      console.log("Disconnected e");
    }
  }

  function getRoomName(forScore?: boolean) {
    if (forScore) return "roomScore";
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
    } else if (
      tableType == TableTypes.OFFER ||
      tableType == TableTypes.ALL_OFFERS
    ) {
      if (subType == RequirementType.GOOD) roomName = "roomOfferProduct";
      else if (subType == RequirementType.SERVICE)
        roomName = "roomOfferService";
      else if (subType == RequirementType.SALE)
        roomName = "roomOfferLiquidation";
    } else if (
      tableType == TableTypes.PURCHASE_ORDER ||
      tableType == TableTypes.ALL_PURCHASE_ORDERS
    ) {
      if (subType == RequirementType.GOOD) {
        if (orderType == OrderTableType.ISSUED)
          roomName = "roomPurchaseOrderClientProduct";
        else if (orderType == OrderTableType.RECEIVED)
          roomName = "roomPurchaseOrderProviderProduct";
      } else if (subType == RequirementType.SERVICE) {
        if (orderType == OrderTableType.ISSUED)
          roomName = "roomPurchaseOrderClientService";
        else if (orderType == OrderTableType.RECEIVED)
          roomName = "roomPurchaseOrderProviderService";
      }
    } else if (
      tableType == TableTypes.SALES_ORDER ||
      tableType == TableTypes.ALL_SALES_ORDERS
    ) {
      if (subType == RequirementType.SALE) {
        if (orderType == OrderTableType.ISSUED)
          roomName = "roomSaleOrderProviderLiquidation";
        else if (orderType == OrderTableType.RECEIVED)
          roomName = "roomSaleOrderClientLiquidation";
      }
    } else if (tableType == TableTypes.MY_DOCUMENTS)
      roomName = CertificateRooms.DOCUMENT;
    else if (tableType == TableTypes.SENT_CERT)
      roomName = CertificateRooms.SENT;
    else if (tableType == TableTypes.RECEIVED_CERT)
      roomName = CertificateRooms.RECEIVED;
    else if (tableType == TableTypes.USERS) roomName = "subUser";
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
