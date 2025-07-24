import { useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { homePageSize } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";
import { connectHomeSocket } from "./connectHomeSocket";

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

    if (!socketHomeAPI)
      socketHomeAPI = connectHomeSocket(
        type,
        () => pageRef.current,
        () => useFilterRef.current,
        updateChangesQueue
      );

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
