import { useTranslation } from "react-i18next";
import TablePageContent, {
  TablePageContentRef,
} from "../../components/common/utils/TablePageContent";
import { sectionIcons } from "../../utilities/colors";
import {
  Action,
  EntityType,
  ModalTypes,
  RequirementDetailType,
  // OnChangePageAndPageSizeTypeParams,
  RequirementType,
  TableColumns,
  TableTypes,
} from "../../utilities/types";
import { useEffect, useRef, useState } from "react";
import {
  ModalContent,
  PaginationDataResponse,
  SocketDataPackType,
  TableTypeRequirement,
} from "../../models/Interfaces";
import {
  getInitialModalData,
  getLabelFromRequirementType,
} from "../../utilities/globalFunctions";
import { Requirement } from "../../models/MainInterfaces";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../../hooks/searchTableHooks";
import useSocketQueueHook, {
  useActionsForRow,
} from "../../hooks/socketQueueHook";
import useSocket from "../../socket/useSocket";
import {
  defaultErrorMsg,
  fieldNameSearchRequestRequirement,
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../../utilities/globals";
import { MainState } from "../../models/Redux";
import { useSelector } from "react-redux";
import { getRequirementFromData } from "../../services/general/generalServices";
import useShowNotification from "../../hooks/utilHooks";
import { useValidateSale } from "../../hooks/adminHooks";
import { useGetOffersByRequirementId } from "../../hooks/requirementHooks";
import ModalContainer from "../../components/containers/ModalContainer";

export default function AdminSales() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { validateSale } = useValidateSale();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [usersCache, setUsersCache] = useState<Map<string, any>>(new Map());
  const [type] = useState<RequirementType>(RequirementType.SALE);
  const [total, setTotal] = useState(0);
  const [requirementList, setRequirementList] = useState<Requirement[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
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
  // const [lastSearchParams, setLastSearchParams] =
  //   useState<OnChangePageAndPageSizeTypeParams>({
  //     page: currentPage,
  //     pageSize: currentPageSize,
  //   });
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: requirementList,
    subType: type,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useActionsForRow(
    TableTypes.ADMIN_SALES,
    (data: SocketDataPackType) =>
      getRequirementFromData(data, type, undefined, undefined, usersCache),
    requirementList,
    setRequirementList,
    total,
    setTotal,
    currentPageSize,
    undefined,
    () =>
      searchValueRef.current
        ? searchValueRef.current?.getSearchValue() != ""
        : null
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const { searchTable, responseData, error, errorMsg, apiParams } =
    useSearchTable(
      uid,
      TableTypes.ADMIN_SALES,
      EntityType.SUBUSER,
      type,
      resetChangesQueue
    );
  useSocket(
    TableTypes.ADMIN_SALES,
    type,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue,
    undefined,
    () =>
      searchValueRef.current
        ? searchValueRef.current?.getSearchValue() != ""
        : null
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
    setTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Mostrar datos de liquidación */

  useEffect(() => {
    if (
      modalDataOffersByRequirementId.type === ModalTypes.DETAILED_REQUIREMENT
    ) {
      setDataModal({
        ...modalDataOffersByRequirementId,
      });
      setIsOpenModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalDataOffersByRequirementId]);

  /**
   * Funciones
   */

  async function setTableData() {
    if (responseData) {
      await setData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setRequirementList([]);
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
  }

  async function setData() {
    let success: boolean = false;
    let totalPages: number = 0;
    try {
      const cache = new Map<string, any>();
      setUsersCache(cache);
      const data: (Requirement | null)[] = await Promise.all(
        responseData.data.map(async (e: any) => {
          return getRequirementFromData(e, type, undefined, undefined, cache);
        })
      );
      setUsersCache(cache);
      setRequirementList(data.filter((req) => req !== null));
      const pagResponse: PaginationDataResponse = responseData.res;
      setTotal(pagResponse.totalDocuments);
      totalPages = pagResponse.totalPages;
      success = responseData.res?.currentPage <= responseData.res?.totalPages;
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      setLoadingTable(false);
    }
    return { success, totalPages };
  }

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  function handleOnButtonClick(action: Action, requirement: Requirement) {
    switch (action) {
      case Action.VALIDATE:
        validateSale(requirement.key, true);
        break;
      case Action.INVALIDATE:
        validateSale(requirement.key, false);
        break;
      case Action.SHOW_OFFERS:
        getOffersByRequirementId(
          TableTypes.REQUIREMENT,
          requirement.key,
          requirement.type,
          RequirementDetailType.ADMIN,
          1,
          noPaginationPageSize,
          action,
          requirement
        );
        break;
    }
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />
      <TablePageContent
        title={t("administrator")}
        titleIcon={<i className={`${sectionIcons[type]} c-default`}></i>}
        subtitle={`${t("sales")}`}
        subtitleIcon={<i className={`${sectionIcons["admin"]} sub-icon`}></i>}
        table={tableContent}
        loading={loadingTable}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestRequirement,
            searchTable,
            setLoadingTable
            // setLastSearchParams
          )
        }
        ref={searchValueRef}
        onSearch={(e) => handleSearch(e, searchTable)}
        admin
      />
    </>
  );
}
