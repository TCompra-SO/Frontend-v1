import { createContext, ReactNode, useEffect, useState } from "react";
import { Requirement } from "../models/MainInterfaces";
import { useGetRequirementList } from "../hooks/requirementHooks";
import { HomeFilterRequest } from "../models/Requests";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { RequirementType, SocketChangeType } from "../utilities/types";
import { getRequirementFromData } from "../services/complete/generalServices";
import useSocketQueueHook from "../hooks/socketQueueHook";
import { SocketResponse } from "../models/Interfaces";

interface HomeContextType {
  type: RequirementType;
  updateType: (val: RequirementType) => void;
  userId: string;
  updateUserId: (id: string) => void;
  useFilter: boolean | null;
  updateUseFilter: (val: boolean) => void;
  requirementList: Requirement[];
  totalRequirementList: number;
  loadingRequirementList?: boolean;
  page: number;
  updatePage: (val: number) => void;
  retrieveRequirements: (
    page: number,
    pageSize?: number,
    params?: HomeFilterRequest
  ) => void;
  updateChangesQueue: (payload: SocketResponse) => void;
}

export const HomeContext = createContext<HomeContextType>({
  userId: "",
  updateUserId: () => {},
  useFilter: null,
  updateUseFilter: () => {},
  requirementList: [],
  totalRequirementList: 0,
  page: 1,
  updatePage: () => {},
  retrieveRequirements: () => {},
  type: RequirementType.GOOD,
  updateType: () => {},
  updateChangesQueue: () => {},
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const { updateChangesQueue } = useSocketQueueHook(addNewRow, addNewRow);
  const [requirementList, setRequirementList] = useState<Requirement[]>([]);
  const [totalRequirementList, setTotalRequirementList] = useState(0);
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [userId, setUserId] = useState("");
  const [useFilter, setUseFilter] = useState<null | boolean>(null);
  const {
    getRequirementList,
    requirements: requirementListOrig,
    total: totalRequirementListOrig,
    loading: loadingRequirementList,
  } = useGetRequirementList();
  const [page, setPage] = useState(1);

  // Copia de lista de requerimientos y total
  useEffect(() => {
    setRequirementList(requirementListOrig);
  }, [requirementListOrig]);

  useEffect(() => {
    setTotalRequirementList(totalRequirementListOrig);
  }, [totalRequirementListOrig]);

  useEffect(() => {
    if (!isLoggedIn) setUserId("");
  }, [isLoggedIn]);

  useEffect(() => {
    if (useFilter === false) setPage(1);
  }, [useFilter]);

  function retrieveRequirements(
    page: number,
    pageSize?: number,
    params?: HomeFilterRequest
  ) {
    getRequirementList(page, type, pageSize, params);
  }

  function updateUserId(id: string) {
    setUserId(id);
  }

  function updateType(val: RequirementType) {
    setType(val);
  }

  async function addNewRow(data: any) {
    const newRequirement: Requirement = await getRequirementFromData(data);
    setRequirementList((prev) => {
      return [newRequirement, ...prev.slice(0, prev.length - 1)];
    });
    setTotalRequirementList(totalRequirementList + 1);
  }

  return (
    <HomeContext.Provider
      value={{
        userId,
        updateUserId,

        useFilter,
        updateUseFilter: (val: boolean) => setUseFilter(val),
        page,
        updatePage: (val: number) => {
          setPage(val);
        },
        retrieveRequirements,
        requirementList,
        totalRequirementList,
        loadingRequirementList,

        type,
        updateType,

        updateChangesQueue,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
