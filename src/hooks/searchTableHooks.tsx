import { ChangeEvent, useEffect, useState } from "react";
import { HttpService, useApiParams } from "../models/Interfaces";
import { FieldSort, SearchTableRequest } from "../models/Requests";
import useApi from "./useApi";
import {
  EntityType,
  OnChangePageAndPageSizeTypeParams,
  OrderType,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { searchRequirementsService } from "../services/requests/requirementService";
import {
  pageSizeOptionsSt,
  searchSinceLength,
  tableSearchAfterMseconds,
} from "../utilities/globals";
import {
  getParamsFromSorter,
  getSearchString,
} from "../utilities/globalFunctions";
import { searchOffersService } from "../services/requests/offerService";
import { debounce } from "lodash";
import {
  searchPurchaseOrdersByClientService,
  searchPurchaseOrdersByProviderService,
} from "../services/requests/purchaseOrderService";

type SearchTableTypeParams = {
  page: number;
  pageSize: number;
  keyWords?: string;
  fieldName?: string;
  orderType?: OrderType;
};

export default function useSearchTable(
  uid: string,
  tableType: TableTypes,
  entityType: EntityType, // subuser: registros de usuario | otro: registros de usuario + subusuarios
  subType?: RequirementType | PurchaseOrderTableTypes
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

  function searchTable({
    page,
    pageSize,
    keyWords,
    fieldName,
    orderType,
  }: SearchTableTypeParams) {
    const newKeyWords = getSearchString(keyWords ?? "");
    if (newKeyWords.length >= searchSinceLength || !keyWords) {
      let service: HttpService | null = null;
      switch (tableType) {
        case TableTypes.REQUIREMENT:
        case TableTypes.ALL_REQUIREMENTS:
          service = searchRequirementsService();
          break;
        case TableTypes.OFFER:
        case TableTypes.ALL_OFFERS:
          service = searchOffersService();
          break;
        case TableTypes.PURCHASE_ORDER:
          if (subType == PurchaseOrderTableTypes.ISSUED)
            service = searchPurchaseOrdersByClientService();
          else if (subType == PurchaseOrderTableTypes.RECEIVED)
            service = searchPurchaseOrdersByProviderService();
          break;
        case TableTypes.SALES_ORDER:
          if (subType == PurchaseOrderTableTypes.ISSUED)
            // r3v cambiar endpoints
            service = searchPurchaseOrdersByClientService();
          else if (subType == PurchaseOrderTableTypes.RECEIVED)
            service = searchPurchaseOrdersByProviderService();
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

export function useFilterSortPaginationForTable() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fieldSort, setFieldSort] = useState<FieldSort | undefined>({});
  const [currentPageSize, setCurrentPageSize] = useState(pageSizeOptionsSt[0]);

  const handleSearch = debounce(
    (
      e: ChangeEvent<HTMLInputElement>,
      searchTable: (params: SearchTableTypeParams) => void
    ) => {
      setSearchValue(e.target.value);
      setCurrentPage(1);
      searchTable({
        page: 1,
        pageSize: currentPageSize,
        keyWords: e.target.value,
        fieldName: fieldSort?.fieldName,
        orderType: fieldSort?.orderType,
      });
    },
    tableSearchAfterMseconds
  );

  function handleChangePageAndPageSize(
    { page, pageSize, sorter }: OnChangePageAndPageSizeTypeParams,
    fieldNameObj: Record<string, string>,
    searchTable: (params: SearchTableTypeParams) => void,
    setLoadingTable?: (val: boolean) => void
  ) {
    if (setLoadingTable) setLoadingTable(true);
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
    const sortParams = getParamsFromSorter(sorter, fieldNameObj);
    setFieldSort(sortParams);
    searchTable({
      page,
      pageSize,
      keyWords: searchValue,
      fieldName: sortParams?.fieldName,
      orderType: sortParams?.orderType,
    });
  }

  function reset() {
    setCurrentPage(1);
    setFieldSort({});
    setSearchValue("");
  }

  return {
    currentPage,
    currentPageSize,
    fieldSort,
    handleChangePageAndPageSize,
    handleSearch,
    setCurrentPage,
    reset,
  };
}
