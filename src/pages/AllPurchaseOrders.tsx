import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { useContext, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeAllPurchaseOrders,
  useApiParams,
} from "../models/Interfaces";
import { Action, ModalTypes, TableTypes } from "../utilities/types";
import { PurchaseOrder } from "../models/MainInterfaces";
import {
  getFieldNameObjForOrders,
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { getPurchaseOrderPDFService } from "../services/requests/purchaseOrderService";
import { transformToPurchaseOrder } from "../utilities/transform";
import ModalContainer from "../components/containers/ModalContainer";
import {
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../utilities/globals";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { useGetOffersByRequirementId } from "../hooks/requirementHooks";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";

export default function AllPurchaseOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const { updateAllPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { searchTable, responseData, error, errorMsg, loading } =
    useSearchTable(uid, TableTypes.ALL_PURCHASE_ORDERS, entityType, type);
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    fieldSort,
    handleChangePageAndPageSize,
    handleSearch,
    reset,
  } = useFilterSortPaginationForTable();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeAllPurchaseOrders>({
    type: TableTypes.ALL_PURCHASE_ORDERS,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
    total: 0,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
  });

  useEffect(() => {
    return () => {
      updateAllPurchaseOrdersLoadingPdf(false);
    };
  }, []);

  /** Obtener tipo */

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  /** Para mostrar modales */

  useEffect(() => {
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  /** Obtener datos de tabla */

  useEffect(() => {
    console.log(type);
    reset();
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
      }));
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

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
    updateAllPurchaseOrdersLoadingPdf(loadingPdf);
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
      }));
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    switch (action) {
      case Action.DOWNLOAD_PURCHASE_ORDER:
        if (!loadingPdf)
          setApiParamsPdf({
            service: getPurchaseOrderPDFService(purchaseOrder.key),
            method: "get",
          });
        break;
      case Action.VIEW_PURCHASE_ORDER:
        getOffersByRequirementId(
          TableTypes.ALL_PURCHASE_ORDERS,
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
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
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
        title={t("purchaseOrders")}
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
            getFieldNameObjForOrders(TableTypes.ALL_PURCHASE_ORDERS, type),
            searchTable
          )
        }
      />
    </>
  );
}
