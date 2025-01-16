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
  TableTypeSalesOrder,
  useApiParams,
} from "../models/Interfaces";
import { useContext, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import { getUserService } from "../services/requests/authService";
import {
  getFieldNameObjForOrders,
  getLabelFromPurchaseOrderType,
  getLabelFromRequirementType,
  getPurchaseOrderType,
  openPurchaseOrderPdf,
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
import { getPurchaseOrderPDFService } from "../services/requests/purchaseOrderService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import {
  useCulminate,
  useGetOffersByRequirementId,
} from "../hooks/requirementHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";

export default function SalesOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { viewHistorySalesModalData } = useContext(ModalsContext);
  const { showNotification } = useShowNotification();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { searchTable, responseData, error, errorMsg, loading } =
    useSearchTable(uid, TableTypes.SALES_ORDER, EntityType.SUBUSER, type);
  const {
    currentPage,
    currentPageSize,
    fieldSort,
    setCurrentPage,
    handleChangePageAndPageSize,
    handleSearch,
    reset,
  } = useFilterSortPaginationForTable();
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
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: nameHeader,
    onButtonClick: handleOnButtonClick,
    total: 0,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
  });

  useEffect(() => {
    return () => {
      updateMyPurchaseOrdersLoadingPdf(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Obtener subsección */

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
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
      setTableContent((prev) => ({
        ...prev,
        data: [],
        subType: type,
        total: 0,
        page: currentPage,
        pageSize: currentPageSize,
        fieldSort,
        nameColumnHeader: nameHeader,
      }));
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

  /* Para descargar pdf de orden de compra */

  const [apiParamsPdf, setApiParamsPdf] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingPdf,
    responseData: responseDataPdf,
    error: errorPdf,
    errorMsg: errorMsgPdf,
    fetchData: fetchDataPdf,
  } = useApi({
    service: apiParamsPdf.service,
    method: apiParamsPdf.method,
    dataToSend: apiParamsPdf.dataToSend,
  });

  useEffect(() => {
    updateMyPurchaseOrdersLoadingPdf(loadingPdf);
    showLoadingMessage(loadingPdf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPdf]);

  useEffect(() => {
    if (apiParamsPdf.service) fetchDataPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsPdf]);

  useEffect(() => {
    if (responseDataPdf) {
      openPurchaseOrderPdf(responseDataPdf);
    } else if (errorPdf) {
      showNotification("error", errorMsgPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataPdf, errorPdf]);

  /** Funciones */

  async function setTableData() {
    try {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );
      setTableContent((prev) => ({
        ...prev,
        data,
        subType: type,
        total: responseData.res?.total,
        page: currentPage,
        pageSize: currentPageSize,
        fieldSort,
        nameColumnHeader: nameHeader,
      }));
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
        setApiParamsPdf({
          service: getPurchaseOrderPDFService(purchaseOrder.key),
          method: "get",
        });
        break;
      case Action.FINISH:
        if (type == PurchaseOrderTableTypes.ISSUED) {
          // Buscar en oferta de liquidación
          getBasicRateData(
            purchaseOrder.key,
            purchaseOrder.requirementId, // r3v para liquidación vendedor (creador de liquidación) emite
            purchaseOrder.offerId,
            true,
            true,
            action,
            purchaseOrder.type
          );
          break;
        } else if (type == PurchaseOrderTableTypes.RECEIVED)
          //
          // Buscar en liquidación
          getBasicRateData(
            purchaseOrder.key,
            purchaseOrder.offerId, // cliente (ofertante) recibe
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
      case Action.CANCEL: //r3v
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: purchaseOrder.offerId,
            requirementId: purchaseOrder.requirementId,
            fromRequirementTable: false,
            canceledByCreator: type == PurchaseOrderTableTypes.ISSUED,
            rowId: purchaseOrder.key,
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
      />
    </>
  );
}
