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
  TableTypePurchaseOrder,
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
  getReqTypeAndOrderType,
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
import { ModalsContext } from "../contexts/ModalsContext";
import {
  useCulminate,
  useGetOffersByRequirementId,
} from "../hooks/requirementHooks";
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

export default function PurchaseOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { viewHistoryModalData } = useContext(ModalsContext);
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const downloadPdfOrder = useDownloadPdfOrder();
  const [type, setType] = useState<PurchaseOrderTableTypes>(
    getReqTypeAndOrderType(location.pathname).orderType
  );
  const typeRef = useRef(type);
  const [requirementType, setRequirementType] = useState<RequirementType>(
    getReqTypeAndOrderType(location.pathname).requirementType
  );
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [action, setAction] = useState<Action>(Action.NONE);
  const [purchaseOrderList, setPurchaseOrderList] = useState<PurchaseOrder[]>(
    []
  );
  const [total, setTotal] = useState(0);
  const [nameHeader, setNameHeader] = useState(
    type == PurchaseOrderTableTypes.ISSUED ? t("seller") : t("customer")
  );
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: purchaseOrderList,
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
    TableTypes.PURCHASE_ORDER,
    (data: SocketDataPackType) => transformToPurchaseOrder(data),
    purchaseOrderList,
    setPurchaseOrderList,
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
      TableTypes.PURCHASE_ORDER,
      EntityType.SUBUSER,
      requirementType,
      resetChangesQueue,
      type
    );
  useSocket(
    TableTypes.PURCHASE_ORDER,
    requirementType,
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
      data: purchaseOrderList,
      subType: type,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
      nameColumnHeader: nameHeader,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseOrderList]);

  /** Reset flag */

  useEffect(() => {
    return () => {
      updateMyPurchaseOrdersLoadingPdf(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Obtener subsección */

  useEffect(() => {
    const { requirementType, orderType } = getReqTypeAndOrderType(
      location.pathname
    );
    setType(orderType);
    setRequirementType(requirementType);
  }, [location]);

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (viewHistoryModalData.requirementId) {
      getOffersByRequirementId(
        TableTypes.PURCHASE_ORDER,
        viewHistoryModalData.requirementId,
        viewHistoryModalData.requirementType,
        true,
        1,
        noPaginationPageSize,
        Action.VIEW_HISTORY,
        viewHistoryModalData.requirement,
        viewHistoryModalData.filters
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
      type == PurchaseOrderTableTypes.ISSUED ? t("seller") : t("customer")
    );
    searchTable({
      page: 1,
      pageSize: currentPageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, requirementType]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setPurchaseOrderList([]);
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
      setPurchaseOrderList(data);
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
          // Buscar en oferta de requerimiento
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
          // Buscar en requerimiento
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
            canceledByCreator: type == PurchaseOrderTableTypes.RECEIVED,
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
        title={t("myPurchaseOrders")}
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
            getFieldNameObjForOrders(TableTypes.PURCHASE_ORDER, type),
            searchTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
