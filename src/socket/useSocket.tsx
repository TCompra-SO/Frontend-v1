import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { pageSizeOptionsSt } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";

export default function useSocket(page: number) {
  const { useFilter, retrieveRequirements } = useContext(HomeContext);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function getData() {
    retrieveRequirements(page, pageSizeOptionsSt[0]);
  }

  useEffect(() => {
    async function fetchData() {
      socketAPI.on("getRequeriments", async () => {
        if (!useFilter)
          if (page == 1) {
            getData();
          }
      });
    }

    fetchData();

    // Limpiar el socket al desmontar el componente
    return () => {
      socketAPI.off("getRequeriments");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {};
}
