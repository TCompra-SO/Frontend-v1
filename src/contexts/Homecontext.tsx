import { createContext, ReactNode, useEffect, useState } from "react";
import { DisplayUser, Requirement } from "../models/MainInterfaces";
import { useGetRequirementList } from "../hooks/requirementHooks";
import { HomeFilterRequest } from "../models/Requests";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { RequirementType, TableTypes } from "../utilities/types";
import { getRequirementFromData } from "../services/general/generalServices";
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import {
  NotificationSearchData,
  SocketDataPackType,
  SocketResponse,
} from "../models/Interfaces";
import { homePageSize } from "../utilities/globals";

interface HomeContextType {
  type: RequirementType;
  updateType: (val: RequirementType) => void;
  userId: DisplayUser;
  updateUserId: (user: DisplayUser) => void;
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
  keywordSearch: string;
  updateKeywordSearch: (val: string) => void;
  notificationSearchData: NotificationSearchData;
  updateNotificationSearchData: (data: NotificationSearchData) => void;
  resetNotificationSearchData: () => void;
}

export const HomeContext = createContext<HomeContextType>({
  userId: {
    uid: "",
    name: "",
    document: "",
  },
  updateUserId: () => { },
  useFilter: null,
  updateUseFilter: () => { },
  requirementList: [],
  totalRequirementList: 0,
  page: 1,
  updatePage: () => { },
  retrieveRequirements: () => { },
  retrieveLastSearchRequeriments: () => { },
  type: RequirementType.SALE,
  updateType: () => { },
  updateChangesQueue: () => { },
  resetChangesQueue: () => { },
  keywordSearch: "",
  updateKeywordSearch: () => { },
  notificationSearchData: { categoryId: 0, targetType: RequirementType.SALE },
  updateNotificationSearchData: () => { },
  resetNotificationSearchData: () => { },
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const [requirementList, setRequirementList] = useState<Requirement[]>([]);
  const [totalRequirementList, setTotalRequirementList] = useState(0);

  // 👇 1. INICIALIZACIÓN: Lee de sessionStorage si existe, sino usa SALE por defecto
  const [type, setType] = useState<RequirementType>(() => {
    const saved = sessionStorage.getItem("lastHomeType");

    return saved ? (Number(saved) as RequirementType) : RequirementType.SALE;
  });

  const [userId, setUserId] = useState<DisplayUser>({
    uid: "",
    name: "",
    document: "",
  });
  const [useFilter, setUseFilter] = useState<null | boolean>(null);
  const [notificationSearchData, setNotificationSearchData] =
    useState<NotificationSearchData>({
      categoryId: 0,
      targetType: RequirementType.SALE,
    });
  const [keywordSearch, setKeywordSearch] = useState("");
  const {
    getRequirementList,
    requirements: requirementListOrig,
    total: totalRequirementListOrig,
    loading: loadingRequirementList,
    usersCache,
  } = useGetRequirementList(type);
  const [page, setPage] = useState(1);
  const { addNewRow, updateRow } = useActionsForRow(
    TableTypes.HOME,
    (data: SocketDataPackType) =>
      getRequirementFromData(data, type, undefined, undefined, usersCache),
    requirementList,
    setRequirementList,
    totalRequirementList,
    setTotalRequirementList,
    homePageSize,
    retrieveLastSearchRequeriments,
    () => useFilter
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
    if (!isLoggedIn) setUserId({ uid: "", name: "", document: "" });
  }, [isLoggedIn]);

  useEffect(() => {
    if (useFilter === false) setPage(1);
  }, [useFilter]);

  /** Funciones */

  function resetNotificationSearchData() {
    setNotificationSearchData({
      categoryId: 0,
      targetType: RequirementType.SALE,
    });
  }

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
      if (!success && totalPages) {
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

  function updateUserId(user: DisplayUser) {
    setUserId(user);
  }

  function updateKeywordSearch(val: string) {
    setKeywordSearch(val);
  }

  function updateNotificationSearchData(data: NotificationSearchData) {
    setNotificationSearchData(data);
  }

  // 👇 2. ACTUALIZACIÓN: Guarda en sessionStorage cada vez que cambia el tipo
  function updateType(val: RequirementType) {
    console.log(`🔵 [HomeContext] updateType llamado con: ${val}`);

    // 👇 ESTO NOS DIRÁ EL ARCHIVO Y LA LÍNEA EXACTA DEL CULPABLE
    console.trace("🔍 Rastreo: ¿Quién está forzando este cambio?");

    setType(val);
    sessionStorage.setItem("lastHomeType", val.toString());
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

        keywordSearch,
        updateKeywordSearch,

        notificationSearchData,
        updateNotificationSearchData,
        resetNotificationSearchData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}