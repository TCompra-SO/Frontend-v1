import { createContext, ReactNode, useEffect, useState } from "react";
import { Requirement } from "../models/MainInterfaces";
import { useGetRequirementList } from "../hooks/requirementHooks";
import { HomeFilterRequest } from "../models/Requests";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { RequirementType, TableTypes } from "../utilities/types";
import { getRequirementFromData } from "../services/general/generalServices";
import useSocketQueueHook, {
  useAddOrUpdateRow,
} from "../hooks/socketQueueHook";
import { SocketDataPackType, SocketResponse } from "../models/Interfaces";
import { homePageSize } from "../utilities/globals";

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
  updateChangesQueue: (
    payload: SocketResponse,
    canAddRowUpdate: boolean
  ) => void;
  resetChangesQueue: () => void;
  retrieveLastSearchRequeriments: () => void;
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
  retrieveLastSearchRequeriments: () => {},
  type: RequirementType.GOOD,
  updateType: () => {},
  updateChangesQueue: () => {},
  resetChangesQueue: () => {},
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
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
    usersCache,
  } = useGetRequirementList();
  const [page, setPage] = useState(1);
  const { addNewRow, updateRow } = useAddOrUpdateRow(
    TableTypes.HOME,
    (data: SocketDataPackType) =>
      getRequirementFromData(data, type, undefined, undefined, usersCache),
    requirementList,
    setRequirementList,
    totalRequirementList,
    setTotalRequirementList,
    homePageSize,
    retrieveLastSearchRequeriments,
    useFilter
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const [lastSearchParams, setLastSearchParams] = useState<{
    page: number;
    pageSize: number | undefined;
    params: HomeFilterRequest | undefined;
  }>({
    page: 0,
    pageSize: undefined,
    params: undefined,
  });

  // Copia de lista de requerimientos
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
    resetChangesQueue();
    setLastSearchParams({
      page,
      pageSize,
      params,
    });
    return getRequirementList(page, type, pageSize, params);
  }

  async function retrieveLastSearchRequeriments() {
    if (lastSearchParams.page) {
      const { success, totalPages } = await retrieveRequirements(
        lastSearchParams.page,
        lastSearchParams.pageSize,
        lastSearchParams.params
      );
      console.log(lastSearchParams.page, success, totalPages);
      if (!success && totalPages) {
        console.log(lastSearchParams.page - 1, totalPages);
        if (lastSearchParams.page - 1 <= totalPages)
          await retrieveRequirements(
            lastSearchParams.page - 1,
            lastSearchParams.pageSize,
            lastSearchParams.params
          );
        else
          await retrieveRequirements(
            totalPages,
            lastSearchParams.pageSize,
            lastSearchParams.params
          );
      }
    }
  }

  function updateUserId(id: string) {
    setUserId(id);
  }

  function updateType(val: RequirementType) {
    console.log(val);
    setType(val);
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
        retrieveLastSearchRequeriments,
        requirementList,
        totalRequirementList,
        loadingRequirementList,

        type,
        updateType,

        updateChangesQueue,
        resetChangesQueue,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
