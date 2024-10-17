import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";
import { transformDataToRequirement } from "../utilities/transform";
import { EntityType, RequirementType } from "../utilities/types";
import { BaseUser, Requirement } from "../models/MainInterfaces";
import makeRequest from "../utilities/globalFunctions";
import { getRequirementsService } from "../services/requests/requirementService";

const user: BaseUser = {
  uid: "user10",
  name: "EcoWheels Ltd.",
  email: "info@ecowheels.example.com",

  typeEntity: EntityType.COMPANY,
  customerScore: 0,
  sellerScore: 0,

  tenure: 3,
  customerCount: 0,
  sellerCount: 0,
};

export default function useSocket() {
  const [requeriments, setRequeriments] = useState<Requirement[]>([]);
  const socketAPI = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    async function fetchData() {
      const { responseData }: any = await makeRequest({
        service: getRequirementsService(),
        method: "get",
      });
      console.log(responseData);
      if (responseData) {
        const data = await Promise.all(
          responseData.data.map(
            async (e: any) =>
              await transformDataToRequirement(
                e,
                RequirementType.GOOD,
                user,
                user
              )
          )
        );
        setRequeriments(data);
      }

      socketAPI.on("getRequeriments", async () => {
        const { responseData }: any = await makeRequest({
          service: getRequirementsService(),
          method: "get",
        });
        if (responseData) {
          const data = await Promise.all(
            responseData.data.map(
              async (e: any) =>
                await transformDataToRequirement(
                  e,
                  RequirementType.GOOD,
                  user,
                  user
                )
            )
          );
          setRequeriments(data);
        }
      });
    }

    fetchData();

    // Limpiar el socket al desmontar el componente
    return () => {
      socketAPI.off("getRequeriments");
    };
  }, []);
  return requeriments;
}
