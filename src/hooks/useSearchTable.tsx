import { useEffect, useState } from "react";
import { HttpService, useApiParams } from "../models/Interfaces";
import { SearchTableRequest } from "../models/Requests";
import useApi from "./useApi";
import { EntityType, TableTypes } from "../utilities/types";
import { searchRequirementsService } from "../services/requests/requirementService";
import { searchSinceLength } from "../utilities/globals";
import { getSearchString } from "../utilities/globalFunctions";

export default function useSearchTable(
  uid: string,
  type: TableTypes,
  entityType: EntityType
) {
  const [lastSearchValue, setLastSearchValue] = useState("");
  const [tableType] = useState<TableTypes>(type);
  const [searchType] = useState<EntityType>(entityType); // subuser: registros de usuario | otro: registros de usuario + subusuarios
  const [apiParams, setApiParams] = useState<useApiParams<SearchTableRequest>>({
    service: null,
    method: "get",
  });
  const {
    responseData,
    error,
    errorMsg,
    fetchData,
    loading,
    reset: resetUseApi,
  } = useApi<SearchTableRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  // useEffect(() => {
  //   if (error) {
  //     showNotification("error", errorMsg);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [error]);

  function reset() {
    setApiParams({
      service: null,
      method: "get",
    });
    resetUseApi();
    setLastSearchValue("");
  }

  function searchTable(page: number, pageSize: number, keyWords?: string) {
    const newKeyWords = getSearchString(keyWords ?? "");
    console.log(keyWords);
    if (
      (newKeyWords != lastSearchValue &&
        newKeyWords.length >= searchSinceLength) ||
      !keyWords
    ) {
      console.log("¿====");
      if (newKeyWords) setLastSearchValue(newKeyWords);
      let service: HttpService | null = null;
      switch (tableType) {
        case TableTypes.REQUIREMENT:
          service = searchRequirementsService();
          break;
      }
      setApiParams({
        service,
        method: "post",
        dataToSend: {
          userId: uid,
          page,
          pageSize,
          keyWords: keyWords === undefined ? keyWords : newKeyWords,
          typeUser: searchType,
        },
      });
    }
  }

  return {
    responseData,
    loading,
    error,
    errorMsg,
    searchTable,
    resetSearchTable: reset,
    apiParams,
  };
}
