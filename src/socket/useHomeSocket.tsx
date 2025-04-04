import { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { homePageSize } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";
import { SocketResponse } from "../models/Interfaces";
import { RequirementType, SocketChangeType } from "../utilities/types";

let socketHomeAPI: Socket | null = null;

export default function useHomeSocket() {
  const {
    useFilter,
    retrieveRequirements,
    page,
    type,
    updateChangesQueue,
    updatePage,
    notificationSearchData,
  } = useContext(HomeContext);
  const useFilterRef = useRef(useFilter);
  const pageRef = useRef(page);

  useEffect(() => {
    updatePage(1);
    if (!useFilter && !notificationSearchData.categoryId) {
      getData(true);
    }

    if (!socketHomeAPI) {
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
            const canAddRow: boolean =
              pageRef.current == 1 && !useFilterRef.current;
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

    return () => {
      if (socketHomeAPI) {
        console.log("Socket disconnected");
        socketHomeAPI.removeAllListeners();
        socketHomeAPI.disconnect();
        socketHomeAPI = null;
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
    if (!useFilter && !notificationSearchData.categoryId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, useFilter]);

  async function getData(reset?: boolean) {
    retrieveRequirements(reset ? 1 : page, homePageSize);
  }

  function retrievePageAgain() {}

  return { retrievePageAgain };
}
