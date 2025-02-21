import { PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  EntityType,
  ModalTypes,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeSalesOrder,
  useApiParams,
} from "../models/Interfaces";
import { useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import { getUserService } from "../services/requests/authService";
import {
  getFieldNameObjForOrders,
  getLabelFromPurchaseOrderType,
  getLabelFromRequirementType,
  getPurchaseOrderType,
} from "../utilities/globalFunctions";
import {
  transformToFullUser,
  transformToPurchaseOrder,
} from "../utilities/transform";
import {
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../utilities/globals";
import { useLocation } from "react-router-dom";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import {
  useCulminate,
  useGetOffersByRequirementId,
} from "../hooks/requirementHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import useShowNotification, {
  useDownloadPdfOrder,
  useShowLoadingMessage,
} from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, {
  useAddOrUpdateRow,
} from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";

export default function SalesOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { viewHistorySalesModalData } = useContext(ModalsContext);
  const { showNotification } = useShowNotification();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const downloadPdfOrder = useDownloadPdfOrder();
  const [type, setType] = useState(
    getPurchaseOrderType(location.pathname, true)
  );
  const typeRef = useRef(type);
  const {
    currentPage,
    currentPageSize,
    fieldSort,
    filteredInfo,
    setCurrentPage,
    handleChangePageAndPageSize,
    handleSearch,
    reset,
  } = useFilterSortPaginationForTable();
  const [salesOrderList, setSalesOrderList] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [action, setAction] = useState<Action>(Action.NONE);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameHeader, setNameHeader] = useState(
    type == PurchaseOrderTableTypes.ISSUED ? t("customer") : t("seller")
  );
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeSalesOrder>({
    type: TableTypes.SALES_ORDER,
    data: salesOrderList,
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: nameHeader,
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useAddOrUpdateRow(
    TableTypes.SALES_ORDER,
    (data: SocketDataPackType) => transformToPurchaseOrder(data),
    salesOrderList,
    setSalesOrderList,
    total,
    setTotal,
    currentPageSize
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const { searchTable, responseData, error, errorMsg, loading, apiParams } =
    useSearchTable(
      uid,
      TableTypes.SALES_ORDER,
      EntityType.SUBUSER,
      RequirementType.SALE,
      resetChangesQueue,
      type
    );
  useSocket(
    TableTypes.SALES_ORDER,
    RequirementType.SALE,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue,
    type
  );

  useEffect(() => {
    typeRef.current = type;
  }, [type]);

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: salesOrderList,
      subType: type,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
      nameColumnHeader: nameHeader,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesOrderList]);

  /** Reset flag */

  useEffect(() => {
    return () => {
      updateMyPurchaseOrdersLoadingPdf(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Obtener subsección */

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname, true));
  }, [location]);

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (viewHistorySalesModalData.requirementId) {
      getOffersByRequirementId(
        TableTypes.PURCHASE_ORDER,
        viewHistorySalesModalData.requirementId,
        viewHistorySalesModalData.requirementType,
        true,
        1,
        noPaginationPageSize,
        Action.VIEW_HISTORY,
        viewHistorySalesModalData.requirement,
        viewHistorySalesModalData.filters
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Para mostrar modales */

  useEffect(() => {
    if (modalDataRate.type !== ModalTypes.NONE) {
      setDataModal(modalDataRate);
      setIsOpenModal(true);
    }
  }, [modalDataRate]);

  useEffect(() => {
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  /** Para obtener datos iniciales y datos de proveedor/cliente */

  useEffect(() => {
    clearSearchValue();
    reset();
    setNameHeader(
      type == PurchaseOrderTableTypes.ISSUED ? t("customer") : t("seller")
    );
    searchTable({
      page: 1,
      pageSize: currentPageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setSalesOrderList([]);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Obtener datos para user */

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
  } = useApi({
    service: apiParamsUser.service,
    method: apiParamsUser.method,
    dataToSend: apiParamsUser.dataToSend,
  });

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
      showUserInfo();
    } else if (errorUser) {
      showNotification("error", errorMsgUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  async function setTableData() {
    try {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );
      setTotal(responseData.res?.totalDocuments);
      setSalesOrderList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function showUserInfo() {
    const user = transformToFullUser(responseDataUser.data);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
      action: action,
    });
    setIsOpenModal(true);
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    setAction(action);
    switch (action) {
      case Action.VIEW_CUSTOMER:
        setApiParamsUser({
          service: getUserService(purchaseOrder.userClientId),
          method: "get",
        });
        break;
      case Action.VIEW_SUPPLIER:
        setApiParamsUser({
          service: getUserService(purchaseOrder.userProviderId),
          method: "get",
        });
        break;
      case Action.DOWNLOAD_PURCHASE_ORDER:
        downloadPdfOrder(purchaseOrder.key, purchaseOrder.type);
        break;
      case Action.FINISH:
        if (typeRef.current == PurchaseOrderTableTypes.ISSUED) {
          // Buscar en oferta de liquidación
          getBasicRateData(
            purchaseOrder.key,
            purchaseOrder.requirementId,
            purchaseOrder.offerId,
            true,
            true,
            action,
            purchaseOrder.type
          );
        } else if (typeRef.current == PurchaseOrderTableTypes.RECEIVED)
          // Buscar en liquidación
          getBasicRateData(
            purchaseOrder.key,
            purchaseOrder.offerId,
            purchaseOrder.requirementId,
            false,
            false,
            action,
            purchaseOrder.type
          );
        break;
      case Action.VIEW_HISTORY:
        getOffersByRequirementId(
          TableTypes.PURCHASE_ORDER,
          purchaseOrder.requirementId,
          purchaseOrder.type,
          true,
          1,
          noPaginationPageSize,
          action,
          undefined,
          purchaseOrder.filters
        );
        break;
      case Action.CANCEL:
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: purchaseOrder.offerId,
            requirementId: purchaseOrder.requirementId,
            fromRequirementTable: false,
            canceledByCreator: type == PurchaseOrderTableTypes.ISSUED,
            rowId: purchaseOrder.key,
            type: purchaseOrder.type,
          },
          action,
        });
        setIsOpenModal(true);
        break;
    }
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />
      <TablePageContent
        title={`${t("mySalesOrders")} - ${t(
          getLabelFromRequirementType(RequirementType.SALE, true)
        )}`}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(
          getLabelFromPurchaseOrderType(type, true)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearch(e, searchTable)}
        loading={loading}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            getFieldNameObjForOrders(TableTypes.SALES_ORDER, type),
            searchTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
