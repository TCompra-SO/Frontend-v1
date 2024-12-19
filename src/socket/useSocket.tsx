import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  transformDataToRequirement,
  transformToBaseUser,
} from "../utilities/transform";
import { RequirementType } from "../utilities/types";
import { Requirement } from "../models/MainInterfaces";
import makeRequest from "../utilities/globalFunctions";
import { getRequirementsService } from "../services/requests/requirementService";
import { getBaseDataUserService } from "../services/requests/authService";

export default function useSocket() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { responseData }: any = await makeRequest({
          service: getRequirementsService(),
          method: "get",
        });
        // console.log(responseData);
        if (responseData) {
          const data = await Promise.all(
            responseData.data.map(async (e: any) => {
              const { responseData: respData }: any = await makeRequest({
                service: getBaseDataUserService(e.subUser),
                method: "get",
              });
              const { user, subUser } = transformToBaseUser(respData.data[0]);
              return transformDataToRequirement(
                e,
                RequirementType.GOOD,
                e.user == e.subUser ? user : subUser,
                user
              );
            })
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
            service: getRequirementsService(),
            method: "get",
          });
          if (responseData) {
            const data = await Promise.all(
              responseData.data.map(async (e: any) => {
                const { responseData: respData }: any = await makeRequest({
                  service: getBaseDataUserService(e.subUser),
                  method: "get",
                });
                const { user, subUser } = transformToBaseUser(respData.data[0]);
                return transformDataToRequirement(
                  e,
                  RequirementType.GOOD,
                  e.user == e.subUser ? user : subUser,
                  user
                );
              })
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
  }, []);
  return { requirements, loading };
}
