import { ChangeEvent, useEffect, useState } from "react";
import { HttpService, useApiParams } from "../models/Interfaces";
import { FieldFilter, FieldSort, SearchTableRequest } from "../models/Requests";
import useApi from "./useApi";
import {
  EntityType,
  Filters,
  OnChangePageAndPageSizeTypeParams,
  OrderType,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import {
  pageSizeOptionsSt,
  searchSinceLength,
  tableSearchAfterMseconds,
} from "../utilities/globals";
import {
  getParamsFromSorterAndFilter,
  getSearchOffersService,
  getSearchOrdersByClientService,
  getSearchOrdersByProviderService,
  getSearchRecordsService,
  getSearchString,
} from "../utilities/globalFunctions";
import { debounce } from "lodash";
import { FilterValue } from "antd/lib/table/interface";

type SearchTableTypeParams = {
  page: number;
  pageSize: number;
  keyWords?: string;
  fieldName?: string;
  orderType?: OrderType;
  filterData?: FilterValue;
  filterColumn?: string;
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

  function searchTable(
    {
      page,
      pageSize,
      keyWords,
      fieldName,
      orderType,
      filterColumn,
      filterData,
    }: SearchTableTypeParams,
    setLoadingTable?: (val: boolean) => void,
    tableTypeParam?: TableTypes,
    subTypeParam?: RequirementType | PurchaseOrderTableTypes,
    uidParam?: string
  ) {
    const stUid: string = uidParam ?? uid;
    const stTableType: TableTypes = tableTypeParam ?? tableType;
    const stSubType: RequirementType | PurchaseOrderTableTypes | undefined =
      subTypeParam ?? subType;
    const newKeyWords = getSearchString(keyWords, true);
    if (
      (newKeyWords && newKeyWords.length >= searchSinceLength) ||
      !newKeyWords
    ) {
      setLoadingTable?.(true);
      const service: HttpService | null = getService(stTableType, stSubType);
      setApiParams({
        service,
        method: "post",
        dataToSend: {
          userId: stUid,
          page,
          pageSize,
          keyWords: newKeyWords,
          typeUser: entityType,
          fieldName,
          orderType,
          filterColumn,
          filterData,
        },
      });
    }
  }

  function getService(
    stTableType: TableTypes,
    stSubType: RequirementType | PurchaseOrderTableTypes | undefined
  ) {
    let service: HttpService | null = null;
    switch (stTableType) {
      case TableTypes.REQUIREMENT:
      case TableTypes.ALL_REQUIREMENTS:
        service = getSearchRecordsService(stSubType);
        break;
      case TableTypes.OFFER:
      case TableTypes.ALL_OFFERS:
        service = getSearchOffersService(stSubType);
        break;
      case TableTypes.PURCHASE_ORDER:
      case TableTypes.ALL_PURCHASE_ORDERS:
        if (stSubType == PurchaseOrderTableTypes.ISSUED)
          service = getSearchOrdersByClientService(stSubType);
        else if (stSubType == PurchaseOrderTableTypes.RECEIVED)
          service = getSearchOrdersByProviderService(stSubType);
        break;
      case TableTypes.SALES_ORDER:
      case TableTypes.ALL_SALES_ORDERS:
        if (stSubType == PurchaseOrderTableTypes.ISSUED)
          service = getSearchOrdersByProviderService(stSubType);
        else if (stSubType == PurchaseOrderTableTypes.RECEIVED)
          service = getSearchOrdersByClientService(stSubType);
        break;
    }
    return service;
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
  const [fieldFilter, setFieldFilter] = useState<FieldFilter | undefined>({});
  const [currentPageSize, setCurrentPageSize] = useState(pageSizeOptionsSt[0]);
  const [filteredInfo, setFilteredInfo] = useState<Filters | undefined>({});

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
        filterColumn: fieldFilter?.filterColumn,
        filterData: fieldFilter?.filterData,
      });
    },
    tableSearchAfterMseconds
  );

  function handleChangePageAndPageSize(
    { page, pageSize, sorter, filters }: OnChangePageAndPageSizeTypeParams,
    fieldNameObj: Record<string, string>,
    searchTable: (params: SearchTableTypeParams) => void,
    setLoadingTable?: (val: boolean) => void
  ) {
    setLoadingTable?.(true);
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
    const newFilteredInfo = getNewFilteredInfo(filteredInfo, filters);
    const { fieldSort, fieldFilter } = getParamsFromSorterAndFilter(
      sorter,
      newFilteredInfo,
      fieldNameObj
    );
    setFieldSort(fieldSort);
    setFieldFilter(fieldFilter);
    setFilteredInfo(newFilteredInfo);
    searchTable({
      page,
      pageSize,
      keyWords: searchValue,
      fieldName: fieldSort?.fieldName,
      orderType: fieldSort?.orderType,
      filterColumn: fieldFilter?.filterColumn,
      filterData: fieldFilter?.filterData,
    });
  }

  // Mantiene sólo el filtro más reciente
  function getNewFilteredInfo(
    prev: Filters | undefined,
    filters: Filters | undefined
  ) {
    if (filters) {
      const newFilters = Object.keys(filters);
      if (newFilters.length <= 1) return filters;
      else {
        const prevFilter = Object.keys(prev || {})[0];
        for (let i = 0; i < newFilters.length; i++) {
          if (newFilters[i] != prevFilter)
            return { [newFilters[i]]: filters[newFilters[i]] };
        }
      }
    } else return filters;
  }

  function reset() {
    setCurrentPage(1);
    setFieldSort({});
    setFieldFilter({});
    setFilteredInfo({});
    setSearchValue("");
  }

  return {
    currentPage,
    currentPageSize,
    fieldSort,
    filteredInfo,
    handleChangePageAndPageSize,
    handleSearch,
    setCurrentPage,
    reset,
  };
}
