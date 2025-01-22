import { useTranslation } from "react-i18next";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import { useEffect, useRef, useState } from "react";
import { TableTypeAllRequirements } from "../models/Interfaces";
import { Action, TableTypes } from "../utilities/types";
import { BasicRequirement } from "../models/MainInterfaces";
import {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { transformDataToBasicRequirement } from "../utilities/transform";
import { pageRoutes } from "../utilities/routes";
import { fieldNameSearchRequestRequirement } from "../utilities/globals";
import useShowNotification from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";

export default function AllRequirements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dataUser = useSelector((state: MainState) => state.user);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { showNotification } = useShowNotification();
  const [type, setType] = useState(getRouteType(location.pathname));
  const { searchTable, responseData, error, errorMsg } = useSearchTable(
    dataUser.uid,
    TableTypes.ALL_REQUIREMENTS,
    dataUser.typeEntity,
    type
  );
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    fieldSort,
    filteredInfo,
    handleChangePageAndPageSize,
    handleSearch,
    reset,
  } = useFilterSortPaginationForTable();
  const [loadingTable, setLoadingTable] = useState(true);
  const [tableContent, setTableContent] = useState<TableTypeAllRequirements>({
    type: TableTypes.ALL_REQUIREMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total: 0,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });

  /** Obtener datos de tabla */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize }, setLoadingTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setCurrentPage(1);
      setTableContent((prev) => ({
        ...prev,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
        data: [],
        total: 0,
        page: currentPage,
        pageSize: currentPageSize,
        fieldSort,
        filteredInfo,
      }));
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Actualizar tabla */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  async function setData() {
    try {
      const data = await Promise.all(
        responseData.data.map(async (e: any) => {
          return transformDataToBasicRequirement(e, type);
        })
      );
      setTableContent((prev) => ({
        ...prev,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
        data,
        total: responseData.res?.totalDocuments,
        page: currentPage,
        pageSize: currentPageSize,
        fieldSort,
        filteredInfo,
      }));
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  function handleOnButtonClick(action: Action, requirement: BasicRequirement) {
    if (action == Action.VIEW_REQUIREMENT)
      navigate(`${pageRoutes.productDetail}/${requirement.key}`);
  }

  return (
    <TablePageContent
      title={t("requirements")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={(e) => handleSearch(e, searchTable)}
      loading={loadingTable}
      onChangePageAndPageSize={(params) =>
        handleChangePageAndPageSize(
          params,
          fieldNameSearchRequestRequirement,
          searchTable,
          setLoadingTable
        )
      }
      ref={searchValueRef}
    />
  );
}
