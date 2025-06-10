import { useTranslation } from "react-i18next";
import TablePageContent, {
  TablePageContentRef,
} from "../components/common/utils/TablePageContent";
import { useEffect, useRef, useState } from "react";
import {
  SocketDataPackType,
  TableTypeAllRequirements,
} from "../models/Interfaces";
import { Action, TableTypes } from "../utilities/types";
import { BasicRequirement } from "../models/MainInterfaces";
import {
  getLabelFromRequirementType,
  getProductDetailRoute,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { transformDataToBasicRequirement } from "../utilities/transform";
import {
  defaultErrorMsg,
  fieldNameSearchRequestRequirement,
} from "../utilities/globals";
import useShowNotification from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";
import { sectionIcons } from "../utilities/colors";

export default function AllRequirements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dataUser = useSelector((state: MainState) => state.user);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { showNotification } = useShowNotification();
  const [type, setType] = useState(getRouteType(location.pathname));
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
  const [requirementList, setRequirementList] = useState<BasicRequirement[]>(
    []
  );
  const [total, setTotal] = useState(0);
  const [tableContent, setTableContent] = useState<TableTypeAllRequirements>({
    type: TableTypes.ALL_REQUIREMENTS,
    data: requirementList,
    hiddenColumns: [],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useActionsForRow(
    TableTypes.ALL_REQUIREMENTS,
    (data: SocketDataPackType) => transformDataToBasicRequirement(data, type),
    requirementList,
    setRequirementList,
    total,
    setTotal,
    currentPageSize
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const { searchTable, responseData, error, errorMsg, apiParams } =
    useSearchTable(
      dataUser.uid,
      TableTypes.ALL_REQUIREMENTS,
      dataUser.typeEntity,
      type,
      resetChangesQueue
    );
  useSocket(
    TableTypes.ALL_REQUIREMENTS,
    type,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      nameColumnHeader: t(getLabelFromRequirementType(type)),
      data: requirementList,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);

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
      setTotal(0);
      setRequirementList([]);
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Obtiene nuevo tipo de tabla */

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
      setTotal(responseData.res?.totalDocuments);
      setRequirementList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      setLoadingTable(false);
    }
  }

  function handleOnButtonClick(action: Action, requirement: BasicRequirement) {
    if (action == Action.VIEW_REQUIREMENT)
      navigate(getProductDetailRoute(requirement.key, requirement.type));
  }

  return (
    <TablePageContent
      title={t("requirements")}
      titleIcon={<i className={`${sectionIcons[type]} c-default`}></i>}
      subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
      subtitleIcon={
        <i className={`${sectionIcons["requirement"]} sub-icon`}></i>
      }
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
