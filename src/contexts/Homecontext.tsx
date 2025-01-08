import { createContext, ReactNode, useState } from "react";
import { Requirement } from "../models/MainInterfaces";
import { useGetRequirementList } from "../hooks/requirementHook";
import { HomeFilterRequest } from "../models/Requests";

interface HomeContextType {
  userId: string;
  updateUserId: (id: string) => void;
  useFilter: boolean;
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
}

export const HomeContext = createContext<HomeContextType>({
  userId: "",
  updateUserId: () => {},
  useFilter: false,
  updateUseFilter: () => {},
  requirementList: [],
  totalRequirementList: 0,
  page: 1,
  updatePage: () => {},
  retrieveRequirements: () => {},
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const [useFilter, setUseFilter] = useState(false);
  const {
    getRequirementList,
    requirements: requirementList,
    total: totalRequirementList,
    loading: loadingRequirementList,
  } = useGetRequirementList();
  const [page, setPage] = useState(1);

  function retrieveRequirements(
    page: number,
    pageSize?: number,
    params?: HomeFilterRequest
  ) {
    getRequirementList(page, pageSize, params);
  }

  function updateUserId(id: string) {
    setUserId(id);
  }

  return (
    <HomeContext.Provider
      value={{
        userId,
        updateUserId,

        useFilter,
        updateUseFilter: (val: boolean) => setUseFilter(val),
        page,
        updatePage: (val: number) => setPage(val),
        retrieveRequirements,
        requirementList,
        totalRequirementList,
        loadingRequirementList,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
