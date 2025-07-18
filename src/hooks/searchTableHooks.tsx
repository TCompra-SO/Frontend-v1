import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  HttpService,
  PaginationDataResponse,
  useApiParams,
} from "../models/Interfaces";
import { FieldFilter, FieldSort, SearchTableRequest } from "../models/Requests";
import useApi from "./useApi";
import {
  EntityType,
  Filters,
  OnChangePageAndPageSizeTypeParams,
  OrderType,
  OrderTableType,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import {
  pageSizeOptionsSt,
  searchSinceLength,
  tableSearchAfterMseconds,
} from "../utilities/globals";
import {
  getAdminHomeFilterService,
  getHomeFilterService,
  getParamsFromSorterAndFilter,
  getSearchOffersService,
  getSearchOrdersByClientService,
  getSearchOrdersByProviderService,
  getSearchRecordsService,
  getSearchString,
} from "../utilities/globalFunctions";
import { debounce } from "lodash";
import { FilterValue } from "antd/lib/table/interface";
import { searchSubUsersService } from "../services/requests/subUserService";
import {
  searchCertificatesService,
  searchReceivedRequestsByEntityService,
  searchSentRequestsByEntityService,
} from "../services/requests/certificateService";

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
  entityType: EntityType, // EntityType.SUBUSER: registros de usuario logueado | otro: registros de usuario logueado + subusuarios
  subType?: RequirementType,
  resetChangesQueue?: () => void,
  orderSubType?: OrderTableType
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

  useEffect(() => {
    if (responseData?.res) {
      const pagination: PaginationDataResponse = responseData.res;
      if (
        pagination.totalPages > 0 &&
        pagination.currentPage > pagination.totalPages &&
        apiParams.dataToSend
      ) {
        const temp = apiParams.dataToSend;
        temp.page = pagination.totalPages;
        setApiParams((prev) => ({
          ...prev,
          dataToSend: temp,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

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
    subTypeParam?: RequirementType,
    uidParam?: string,
    orderSubTypeParam?: OrderTableType
  ) {
    resetChangesQueue?.();
    const stUid: string = uidParam ?? uid;
    const stTableType: TableTypes = tableTypeParam ?? tableType;
    const stSubType = subTypeParam ?? subType;
    const stOrderType = orderSubTypeParam ?? orderSubType;
    const newKeyWords = getSearchString(keyWords, true);
    // console.log(stSubType, stOrderType);
    if (
      (newKeyWords && newKeyWords.length >= searchSinceLength) ||
      !newKeyWords
    ) {
      setLoadingTable?.(true);
      const service: HttpService | null = getService(
        stTableType,
        stSubType,
        stOrderType
      );
      // console.log(service, stTableType, stSubType);
      const apiData: useApiParams<SearchTableRequest> = {
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
          filterData: filterData?.map((filter) =>
            filter === "true" ? true : filter === "false" ? false : filter
          ),
        },
      };
      setApiParams(apiData);
    }
  }

  function getService(
    stTableType: TableTypes,
    stSubType?: RequirementType,
    stOrderType?: OrderTableType
  ) {
    let service: HttpService | null = null;
    switch (stTableType) {
      case TableTypes.USERS:
        service = searchSubUsersService();
        break;
      case TableTypes.MY_DOCUMENTS:
        service = searchCertificatesService();
        break;
      case TableTypes.SENT_CERT:
        service = searchSentRequestsByEntityService();
        break;
      case TableTypes.RECEIVED_CERT:
        service = searchReceivedRequestsByEntityService();
        break;
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
        if (stOrderType == OrderTableType.ISSUED)
          service = getSearchOrdersByClientService(stSubType);
        else if (stOrderType == OrderTableType.RECEIVED)
          service = getSearchOrdersByProviderService(stSubType);
        break;
      case TableTypes.SALES_ORDER:
      case TableTypes.ALL_SALES_ORDERS:
        if (stOrderType == OrderTableType.ISSUED)
          service = getSearchOrdersByProviderService(stSubType);
        else if (stOrderType == OrderTableType.RECEIVED)
          service = getSearchOrdersByClientService(stSubType);
        break;
      case TableTypes.HOME:
        service = getHomeFilterService(stSubType);
        break;
      case TableTypes.ADMIN_SALES:
        service = getAdminHomeFilterService(stSubType);
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

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useMemo(
    () =>
      debounce(
        (
          e: ChangeEvent<HTMLInputElement>,
          searchTable: (
            params: SearchTableTypeParams,
            setLoadingTable?: (val: boolean) => void
          ) => void,
          setLoadingTable?: (val: boolean) => void
        ) => {
          setSearchValue(e.target.value);
          setCurrentPage(1);
          searchTable(
            {
              page: 1,
              pageSize: currentPageSize,
              keyWords: e.target.value,
              fieldName: fieldSort?.fieldName,
              orderType: fieldSort?.orderType,
              filterColumn: fieldFilter?.filterColumn,
              filterData: fieldFilter?.filterData,
            },
            setLoadingTable
          );
        },
        tableSearchAfterMseconds
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function handleChangePageAndPageSize(
    { page, pageSize, sorter, filters }: OnChangePageAndPageSizeTypeParams,
    fieldNameObj: Record<string, string>,
    searchTable: (params: SearchTableTypeParams) => void,
    setLoadingTable?: (val: boolean) => void,
    setLastSearchParams?: (val: OnChangePageAndPageSizeTypeParams) => void
  ) {
    console.log(11111, setLoadingTable);
    setLoadingTable?.(true);
    setLastSearchParams?.({ page, pageSize, sorter, filters });
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
    // setFilteredInfo(newFilteredInfo);
    if (newFilteredInfo)
      setFilteredInfo(() => {
        Object.keys(newFilteredInfo).forEach((filter) => {
          if (newFilteredInfo[filter])
            newFilteredInfo[filter] = newFilteredInfo[filter]?.concat(
              Math.random()
            );
        });
        return newFilteredInfo;
      });

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
