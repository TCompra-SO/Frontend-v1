import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Requirement } from "../models/MainInterfaces";
import makeRequest from "../utilities/globalFunctions";
import { getRequirementsService } from "../services/requests/requirementService";
import { getRequirementFromData } from "../services/complete/general";
import { pageSizeOptionsSt } from "../utilities/globals";

export default function useSocket() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { responseData }: any = await makeRequest({
          service: getRequirementsService(1, 50),
          method: "get",
        });
        // console.log(responseData);
        if (responseData) {
          const data = await Promise.all(
            responseData.data.map(async (e: any) => getRequirementFromData(e))
          );
          setRequirements(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);

      socketAPI.on("getRequeriments", async () => {
        setLoading(true);
        try {
          const { responseData }: any = await makeRequest({
            service: getRequirementsService(1, pageSizeOptionsSt[0]),
            method: "get",
          });
          if (responseData) {
            const data = await Promise.all(
              responseData.data.map(async (e: any) => getRequirementFromData(e))
            );
            setRequirements(data);
          }
        } catch (error) {
          console.log(error);
          setRequirements([]);
        }
        setLoading(false);
      });
    }

    fetchData();

    // Limpiar el socket al desmontar el componente
    return () => {
      socketAPI.off("getRequeriments");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { requirements, loading };
}
