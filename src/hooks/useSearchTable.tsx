import { useEffect, useState } from "react";
import { HttpService, useApiParams } from "../models/Interfaces";
import { SearchTableRequest } from "../models/Requests";
import useApi from "./useApi";
import { EntityType, OrderType, TableTypes } from "../utilities/types";
import { searchRequirementsService } from "../services/requests/requirementService";
import { searchSinceLength } from "../utilities/globals";
import { getSearchString } from "../utilities/globalFunctions";
import { searchOffersService } from "../services/requests/offerService";

export default function useSearchTable(
  uid: string,
  tableType: TableTypes,
  entityType: EntityType // subuser: registros de usuario | otro: registros de usuario + subusuarios
) {
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

  function reset() {
    setApiParams({
      service: null,
      method: "get",
    });
    resetUseApi();
  }

  function searchTable(
    page: number,
    pageSize: number,
    keyWords?: string,
    fieldName?: string,
    orderType?: OrderType
  ) {
    const newKeyWords = getSearchString(keyWords ?? "");
    if (newKeyWords.length >= searchSinceLength || !keyWords) {
      let service: HttpService | null = null;
      switch (tableType) {
        case TableTypes.REQUIREMENT:
          service = searchRequirementsService();
          break;
        case TableTypes.OFFER:
          service = searchOffersService();
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
          typeUser: entityType,
          fieldName,
          orderType,
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
