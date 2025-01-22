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
import { searchRequirementsService } from "../services/requests/requirementService";
import {
  pageSizeOptionsSt,
  searchSinceLength,
  tableSearchAfterMseconds,
} from "../utilities/globals";
import {
  getParamsFromSorterAndFilter,
  getSearchString,
} from "../utilities/globalFunctions";
import { searchOffersService } from "../services/requests/offerService";
import { debounce } from "lodash";
import {
  searchPurchaseOrdersByClientService,
  searchPurchaseOrdersByProviderService,
} from "../services/requests/purchaseOrderService";
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
    const newKeyWords = getSearchString(keyWords ?? "");
    if (newKeyWords.length >= searchSinceLength || !keyWords) {
      setLoadingTable?.(true);
      let service: HttpService | null = null;
      switch (stTableType) {
        case TableTypes.REQUIREMENT:
        case TableTypes.ALL_REQUIREMENTS:
          if (stSubType == RequirementType.GOOD)
            service = searchRequirementsService();
          // r3v endpoints para servicios y liquidaciones
          else if (stSubType == RequirementType.SERVICE)
            service = searchRequirementsService();
          else if (stSubType == RequirementType.SALE)
            service = searchRequirementsService();
          break;
        case TableTypes.OFFER:
        case TableTypes.ALL_OFFERS:
          if (stSubType == RequirementType.GOOD)
            service = searchOffersService();
          else if (stSubType == RequirementType.SERVICE)
            service = searchOffersService();
          else if (stSubType == RequirementType.SALE)
            service = searchOffersService();
          break;
        case TableTypes.PURCHASE_ORDER:
        case TableTypes.ALL_PURCHASE_ORDERS:
          if (stSubType == PurchaseOrderTableTypes.ISSUED)
            service = searchPurchaseOrdersByClientService();
          else if (stSubType == PurchaseOrderTableTypes.RECEIVED)
            service = searchPurchaseOrdersByProviderService();
          break;
        case TableTypes.SALES_ORDER:
        case TableTypes.ALL_SALES_ORDERS:
          if (stSubType == PurchaseOrderTableTypes.ISSUED)
            // r3v cambiar endpoints
            service = searchPurchaseOrdersByProviderService();
          else if (stSubType == PurchaseOrderTableTypes.RECEIVED)
            service = searchPurchaseOrdersByClientService();
          break;
      }
      // console.log("dds", service, tableType, subType);
      setApiParams({
        service,
        method: "post",
        dataToSend: {
          userId: stUid,
          page,
          pageSize,
          keyWords: keyWords === undefined ? keyWords : newKeyWords,
          typeUser: entityType,
          fieldName,
          orderType,
          filterColumn,
          filterData,
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
    console.log(filters);
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
