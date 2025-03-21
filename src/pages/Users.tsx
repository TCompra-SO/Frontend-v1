import { useEffect, useRef, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import {
  Action,
  EntityType,
  OrderTableType,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import {
  SocketDataPackType,
  TableTypeUsers,
  useApiParams,
} from "../models/Interfaces";
import {
  defaultErrorMsg,
  fieldNameSearchRequestOffer,
  fieldNameSearchRequestRequirement,
  fieldNameSearchRequestSubUser,
  mainModalScrollStyle,
} from "../utilities/globals";
import ButtonContainer from "../components/containers/ButtonContainer";
import useApi from "../hooks/useApi";
import { getSubUserService } from "../services/requests/subUserService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  equalServices,
  getFieldNameObjForOrders,
} from "../utilities/globalFunctions";
import SubUserTableModal from "../components/section/users/subUserTables/SubUserTableModal";
import {
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  SubUserBase,
  SubUserProfile,
} from "../models/MainInterfaces";
import {
  transformDataToOfferItemSubUser,
  transformDataToRequirementItemSubUser,
  transformToPurchaseOrderItemSubUser,
  transformToSubUserBase,
  transformToSubUserProfile,
} from "../utilities/transform";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import { useChangeSubUserStatus } from "../hooks/subUserHook";
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";

export default function Users() {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { changeSubUserStatus } = useChangeSubUserStatus();
  const token = useSelector((state: MainState) => state.user.token);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const mainEntityType = useSelector(
    (state: MainState) => state.mainUser.typeEntity
  );
  const [subUserList, setSubUserList] = useState<SubUserBase[]>([]);
  const [total, setTotal] = useState(0);
  const [action, setAction] = useState<Action>(Action.ADD_USER);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [subTypeOrder, setSubTypeOrder] = useState<OrderTableType>(
    OrderTableType.ISSUED
  );
  const [subType, setSubType] = useState<RequirementType>(RequirementType.GOOD);
  const [userData, setUserData] = useState<SubUserBase | null>(null);
  const [userDataEdit, setUserDataEdit] = useState<SubUserProfile | null>(null);
  const [totalReq, setTotalReq] = useState(0);
  const [totalOffer, setTotalOffer] = useState(0);
  const [totalPurc, setTotalPurc] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [reqList, setReqList] = useState<RequirementItemSubUser[]>([]);
  const [offerList, setOfferList] = useState<OfferItemSubUser[]>([]);
  const [orderList, setOrderList] = useState<PurchaseOrderItemSubUser[]>([]);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const [tableType, setTableType] = useState<TableTypes>(
    TableTypes.REQUIREMENT
  );
  const {
    currentPage: currentPageSubUser,
    currentPageSize: currentPageSizeSubUser,
    setCurrentPage: setCurrentPageSubUser,
    fieldSort: fieldSortSubUser,
    filteredInfo: filteredInfoSubUser,
    handleChangePageAndPageSize: handleChangePageAndPageSizeSubUser,
    handleSearch: handleSearchSubUser,
    reset: resetSubUser,
  } = useFilterSortPaginationForTable();
  const [tableContent, setTableContent] = useState<TableTypeUsers>({
    type: TableTypes.USERS,
    data: subUserList,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnActionClick,
    total,
    page: currentPageSubUser,
    pageSize: currentPageSizeSubUser,
    fieldSort: fieldSortSubUser,
    filteredInfo: filteredInfoSubUser,
  });
  const { addNewRow, updateRow, updateFieldInRow, deleteRow } =
    useActionsForRow(
      TableTypes.USERS,
      (data: SocketDataPackType) => transformToSubUserBase(data),
      subUserList,
      setSubUserList,
      total,
      setTotal,
      currentPageSizeSubUser
    );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow,
    deleteRow,
    updateFieldInRow
  );
  const {
    searchTable: searchSubUserTable,
    responseData,
    error,
    errorMsg,
    loading,
    apiParams,
  } = useSearchTable(
    mainUid,
    TableTypes.USERS,
    mainEntityType,
    undefined,
    resetChangesQueue
  );
  useSocket(
    TableTypes.USERS,
    undefined,
    currentPageSubUser,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Variables para obtener lista de requerimientos/ofertas/... */

  const {
    searchTable,
    responseData: responseDataTable,
    error: errorTable,
    errorMsg: errorMsgTable,
    loading: loadingTable,
  } = useSearchTable(
    userData?.uid ?? "",
    tableType,
    EntityType.SUBUSER,
    subType,
    undefined,
    subTypeOrder
  );
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    fieldSort,
    filteredInfo,
    handleChangePageAndPageSize,
    // handleSearch,
    reset,
  } = useFilterSortPaginationForTable();

  /** Actualiza el contenido de tabla de subsuarios */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: subUserList,
      total,
      page: currentPageSubUser,
      pageSize: currentPageSizeSubUser,
      fieldSort: fieldSortSubUser,
      filteredInfo: filteredInfoSubUser,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subUserList]);

  /* Obtener lista de subusuarios inicialmente */

  useEffect(() => {
    clearSearchValue();
    resetSubUser();
    searchSubUserTable({ page: 1, pageSize: currentPageSizeSubUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPageSubUser(1);
      setTotal(0);
      setSubUserList([]);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Obtener datos de subusuario */

  const [apiParamsUser, setApiParamsUser] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const {
    loading: loadingUser,
    responseData: responseDataUser,
    error: errorUser,
    errorMsg: errorMsgUser,
    fetchData: fetchDataUser,
  } = useApi(apiParamsUser);

  useEffect(() => {
    showLoadingMessage(loadingUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUser]);

  useEffect(() => {
    if (apiParamsUser.service) fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsUser]);

  useEffect(() => {
    if (responseDataUser) {
      if (equalServices(apiParamsUser.service, getSubUserService(""))) {
        setUserDataEdit(transformToSubUserProfile(responseDataUser[0], true));
        handleOpenModal();
      }
    } else if (errorUser) {
      showNotification("error", errorMsgUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /** Obtener lista de requerimientos/ofertas/... */

  useEffect(() => {
    if (!isOpenModal) showLoadingMessage(loadingTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTable]);

  useEffect(() => {
    if (responseDataTable) {
      switch (tableType) {
        case TableTypes.REQUIREMENT:
          setModalTableDataReq();
          break;
        case TableTypes.OFFER:
          setModalTableDataOffer();
          break;
        case TableTypes.PURCHASE_ORDER:
          setModalTableDataOrder();
          break;
        case TableTypes.SALES_ORDER:
          setModalTableDataSalesOrder();
          break;
      }
    } else if (errorTable) {
      switch (tableType) {
        case TableTypes.REQUIREMENT:
          setReqList([]);
          setTotalReq(0);
          break;
        case TableTypes.OFFER:
          setOfferList([]);
          setTotalOffer(0);
          break;
        case TableTypes.PURCHASE_ORDER:
          setOrderList([]);
          setTotalPurc(0);
          break;
        case TableTypes.SALES_ORDER:
          setOrderList([]);
          setTotalSales(0);
          break;
      }
      setCurrentPage(1);
      showNotification("error", errorMsgTable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataTable, errorTable]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  function setTableData() {
    try {
      const data = responseData.data.map((e: any) => transformToSubUserBase(e));
      setTotal(responseData.res?.totalDocuments);
      setSubUserList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    }
  }

  function setModalTableDataReq() {
    try {
      const data: RequirementItemSubUser[] = responseDataTable.data.map(
        (e: any) => transformDataToRequirementItemSubUser(e, subType)
      );
      setTotalReq(responseDataTable.res?.totalDocuments);
      setReqList(data);
      handleOpenModal();
    } catch (error) {
      console.log(error);
      setReqList([]);
      setTotalReq(0);
      setCurrentPage(1);
      showNotification("error", t(defaultErrorMsg));
    }
  }

  function setModalTableDataOffer() {
    try {
      const data: OfferItemSubUser[] = responseDataTable.data.map((e: any) =>
        transformDataToOfferItemSubUser(e, subType)
      );
      setTotalOffer(responseDataTable.res?.totalDocuments);
      setOfferList(data);
      handleOpenModal();
    } catch (error) {
      console.log(error);
      setOfferList([]);
      setTotalOffer(0);
      setCurrentPage(1);
      showNotification("error", t(defaultErrorMsg));
    }
  }

  function setModalTableDataOrder() {
    try {
      const data: PurchaseOrderItemSubUser[] = responseDataTable.data.map(
        (e: any) => transformToPurchaseOrderItemSubUser(e, subTypeOrder)
      );
      setTotalPurc(responseDataTable.res?.totalDocuments);
      setOrderList(data);
      handleOpenModal();
    } catch (error) {
      console.log(error);
      setOrderList([]);
      setTotalPurc(0);
      setCurrentPage(1);
      showNotification("error", t(defaultErrorMsg));
    }
  }

  function setModalTableDataSalesOrder() {
    try {
      const data: PurchaseOrderItemSubUser[] = responseDataTable.data.map(
        (e: any) => transformToPurchaseOrderItemSubUser(e, subTypeOrder)
      );
      setTotalSales(responseDataTable.res?.totalDocuments);
      setOrderList(data);
      handleOpenModal();
    } catch (error) {
      console.log(error);
      setOrderList([]);
      setTotalSales(0);
      setCurrentPage(1);
      showNotification("error", t(defaultErrorMsg));
    }
  }

  function openModalAddUser() {
    setAction(Action.ADD_USER);
    handleOpenModal();
  }

  function handleCloseModal() {
    setIsOpenModal(false);
    setSubTypeOrder(OrderTableType.ISSUED);
    setSubType(RequirementType.GOOD);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleOnActionClick(
    action: Action,
    user: SubUserBase,
    subAction?: Action
  ) {
    setAction(action);
    setUserData(user);
    switch (action) {
      case Action.EDIT_USER:
        setApiParamsUser({
          service: getSubUserService(user.uid),
          method: "get",
          token,
        });
        break;
      case Action.VIEW_REQUIREMENTS:
        setTableType(TableTypes.REQUIREMENT);
        setSubType(RequirementType.GOOD);
        reset();
        searchTable(
          { page: 1, pageSize: currentPageSize },
          undefined,
          TableTypes.REQUIREMENT,
          RequirementType.GOOD,
          user.uid
        );
        break;
      case Action.VIEW_OFFERS:
        setTableType(TableTypes.OFFER);
        setSubType(RequirementType.GOOD);
        reset();
        searchTable(
          { page: 1, pageSize: currentPageSize },
          undefined,
          TableTypes.OFFER,
          RequirementType.GOOD,
          user.uid
        );
        break;
      case Action.VIEW_PURCHASE_ORDERS:
        if (subAction == Action.GOODS || subAction == Action.SERVICES) {
          if (subAction == Action.GOODS) setSubType(RequirementType.GOOD);
          if (subAction == Action.SERVICES) setSubType(RequirementType.SERVICE);
          setTableType(TableTypes.PURCHASE_ORDER);
          setSubTypeOrder(OrderTableType.ISSUED);
          reset();
          searchTable(
            { page: 1, pageSize: currentPageSize },
            undefined,
            TableTypes.PURCHASE_ORDER,
            subAction == Action.GOODS
              ? RequirementType.GOOD
              : RequirementType.SERVICE,
            user.uid,
            OrderTableType.ISSUED
          );
        }
        break;
      case Action.VIEw_SALES_ORDERS:
        setSubType(RequirementType.SALE);
        setTableType(TableTypes.SALES_ORDER);
        setSubTypeOrder(OrderTableType.ISSUED);
        reset();
        searchTable(
          { page: 1, pageSize: currentPageSize },
          undefined,
          TableTypes.SALES_ORDER,
          RequirementType.SALE,
          user.uid,
          OrderTableType.ISSUED
        );
        break;
      case Action.SUSPEND:
        changeSubUserStatus(user.uid, false);
        break;
      case Action.REACTIVATE:
        changeSubUserStatus(user.uid, true);
        break;
    }
  }

  function getContent() {
    switch (action) {
      case Action.ADD_USER:
        return <AddUserModal onClose={handleCloseModal} edit={false} />;
      case Action.EDIT_USER:
        return (
          <AddUserModal
            onClose={handleCloseModal}
            edit={true}
            userData={userDataEdit}
          />
        );
      case Action.VIEW_REQUIREMENTS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.REQUIREMENT_SUBUSER,
              tableContent: reqList,
              total: totalReq,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingTable}
            tableType={TableTypes.REQUIREMENT_SUBUSER}
            onChangePageAndPageSize={(params) =>
              handleChangePageAndPageSize(
                params,
                fieldNameSearchRequestRequirement,
                searchTable
              )
            }
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            fieldSort={fieldSort}
            filteredInfo={filteredInfo}
          />
        );
      case Action.VIEW_OFFERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.OFFER_SUBUSER,
              tableContent: offerList,
              total: totalOffer,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingTable}
            tableType={TableTypes.OFFER_SUBUSER}
            onChangePageAndPageSize={(params) =>
              handleChangePageAndPageSize(
                params,
                fieldNameSearchRequestOffer,
                searchTable
              )
            }
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            fieldSort={fieldSort}
            filteredInfo={filteredInfo}
          />
        );
      case Action.VIEW_PURCHASE_ORDERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.PURCHASE_ORDER_SUBUSER,
              tableContent: orderList,
              subType: subTypeOrder,
              total: totalPurc,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingTable}
            tableType={TableTypes.PURCHASE_ORDER_SUBUSER}
            onChangePageAndPageSize={(params) =>
              handleChangePageAndPageSize(
                params,
                getFieldNameObjForOrders(
                  TableTypes.PURCHASE_ORDER,
                  subTypeOrder
                ),
                searchTable
              )
            }
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            fieldSort={fieldSort}
            filteredInfo={filteredInfo}
          />
        );
      case Action.VIEw_SALES_ORDERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.SALES_ORDER_SUBUSER,
              tableContent: orderList,
              subType: subTypeOrder,
              total: totalSales,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingTable}
            tableType={TableTypes.SALES_ORDER_SUBUSER}
            onChangePageAndPageSize={(params) =>
              handleChangePageAndPageSize(
                params,
                getFieldNameObjForOrders(TableTypes.SALES_ORDER, subTypeOrder),
                searchTable
              )
            }
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            fieldSort={fieldSort}
            filteredInfo={filteredInfo}
          />
        );
      default:
        return null;
    }
  }

  function handleTabChange(tabId: RequirementType | OrderTableType) {
    if (userData) {
      if (
        ((action == Action.VIEW_REQUIREMENTS || action == Action.VIEW_OFFERS) &&
          (tabId == RequirementType.GOOD ||
            tabId == RequirementType.SERVICE ||
            tabId == RequirementType.SALE)) ||
        ((action == Action.VIEW_PURCHASE_ORDERS ||
          action == Action.VIEw_SALES_ORDERS) &&
          (tabId == OrderTableType.ISSUED || tabId == OrderTableType.RECEIVED))
      ) {
        reset();
        if (
          action == Action.VIEW_REQUIREMENTS ||
          action == Action.VIEW_OFFERS
        ) {
          setSubType(tabId as RequirementType);
          searchTable(
            { page: 1, pageSize: currentPageSize },
            undefined,
            tableType,
            tabId as RequirementType,
            undefined
          );
        } else {
          setSubTypeOrder(tabId as OrderTableType);
          searchTable(
            { page: 1, pageSize: currentPageSize },
            undefined,
            tableType,
            subType,
            undefined,
            tabId as OrderTableType
          );
        }
      }
    }
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenModal}
        width={
          action == Action.ADD_USER || action == Action.EDIT_USER ? 800 : 1100
        }
        style={mainModalScrollStyle}
        onClose={handleCloseModal}
      >
        {getContent()}
      </NoContentModalContainer>
      <TablePageContent
        title={t("users")}
        titleIcon={<i className="fa-regular fa-users c-default"></i>}
        subtitle={`${t("listOf")} ${t("users")}`}
        subtitleIcon={<i className="fa-regular fa-user-group sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearchSubUser(e, searchSubUserTable)}
        additionalContentHeader={
          <div>
            <ButtonContainer
              common
              className="btn btn-default"
              onClick={openModalAddUser}
            >
              <i className="fa-regular fa-user-plus"></i> {t("addUser")}
            </ButtonContainer>
          </div>
        }
        loading={loading}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSizeSubUser(
            params,
            fieldNameSearchRequestSubUser,
            searchSubUserTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
