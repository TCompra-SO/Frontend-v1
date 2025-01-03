import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Requirement } from "../models/MainInterfaces";
import makeRequest from "../utilities/globalFunctions";
import { getRequirementsService } from "../services/requests/requirementService";
import { getRequirementFromData } from "../services/complete/general";
import { pageSizeOptionsSt } from "../utilities/globals";

export default function useSocket(page: number) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function getData() {
    setLoading(true);
    try {
      const { responseData }: any = await makeRequest({
        service: getRequirementsService(page, pageSizeOptionsSt[0]),
        method: "get",
      });
      if (responseData) {
        const data: (Requirement | null)[] = await Promise.all(
          responseData.data.map(async (e: any) => getRequirementFromData(e))
        );
        setRequirements(data.filter((req) => req !== null));
        setTotal(responseData.res?.totalDocuments);
      }
    } catch (error) {
      console.log(error);
      setRequirements([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      socketAPI.on("getRequeriments", async () => {
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
  return { requirements, loading, totalRequirements: total };
}
