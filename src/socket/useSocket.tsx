import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { pageSizeOptionsSt } from "../utilities/globals";
import { HomeContext } from "../contexts/Homecontext";

// Obtiene requerimientos sin considerar filtros
export default function useSocket() {
  const { useFilter, retrieveRequirements, page, type } =
    useContext(HomeContext);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

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
      // socketAPI.off("getRequeriments");
      socketAPI.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {};
}
