import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeAllPurchaseOrders,
  useApiParams,
} from "../models/Interfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderTableTypes,
  TableTypes,
} from "../utilities/types";
import { PurchaseOrder, Offer } from "../models/MainInterfaces";
import makeRequest, {
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { App } from "antd";
import useApi from "../hooks/useApi";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  getPurchaseOrderPDFService,
  getPurchaseOrdersByClientEntityService,
  getPurchaseOrdersByProviderEntityService,
} from "../services/requests/purchaseOrderService";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import {
  transformToBaseUser,
  transformToOffer,
  transformToPurchaseOrder,
} from "../utilities/transform";
import { getOffersByRequirementIdService } from "../services/requests/offerService";
import { getRequirementById } from "../services/complete/general";
import { getBaseDataUserService } from "../services/requests/authService";
import ModalContainer from "../components/containers/ModalContainer";
import { mainModalScrollStyle } from "../utilities/globals";
import { LoadingDataContext } from "../contexts/LoadingDataContext";

export default function AllPurchaseOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const role = useSelector((state: MainState) => state.user.typeID);
  const { updateAllPurchaseOrdersLoadingPdf, updateAllRequirementsViewOffers } =
    useContext(LoadingDataContext);

  const { notification, message } = App.useApp();
  const [currentPurchaseOrder, setCurrentPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeAllPurchaseOrders>({
    type: TableTypes.ALL_PURCHASE_ORDERS,
    data: [],
    subType: PurchaseOrderTableTypes.ISSUED,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  /** Obtener datos de tabla */

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    switch (type) {
      case PurchaseOrderTableTypes.ISSUED:
        setApiParams({
          service: getPurchaseOrdersByClientEntityService(uid, role),
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.RECEIVED:
        setApiParams({
          service: getPurchaseOrdersByProviderEntityService(uid, role),
          method: "get",
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Para ver historial */

  const [apiParamsHist, setApiParamsHist] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingHist,
    responseData: responseDataHist,
    error: errorHist,
    errorMsg: errorMsgHist,
    fetchData: fetchDataHist,
  } = useApi({
    service: apiParamsHist.service,
    method: apiParamsHist.method,
    dataToSend: apiParamsHist.dataToSend,
  });

  useEffect(() => {
    updateAllRequirementsViewOffers(loadingHist);
    showLoadingMessage(message, loadingHist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHist]);

  useEffect(() => {
    if (apiParamsHist.service) fetchDataHist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsHist]);

  useEffect(() => {
    if (responseDataHist) {
      openDetailedRequirement(responseDataHist);
    } else if (errorHist) {
      showNotification(notification, "error", errorMsgHist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataHist, errorHist]);

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
    showLoadingMessage(message, loadingPdf);
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
      showNotification(notification, "error", errorMsgPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataPdf, errorPdf]);

  /** Funciones */

  async function setTableData() {
    try {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );
      setTableContent({
        type: TableTypes.ALL_PURCHASE_ORDERS,
        data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnButtonClick,
      });
    } catch (error) {
      console.log(error);
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  async function openDetailedRequirement(responseData: any) {
    updateAllRequirementsViewOffers(true);
    showLoadingMessage(message, true);
    try {
      if (
        currentPurchaseOrder &&
        responseData.data &&
        Array.isArray(responseData.data)
      ) {
        const { requirement } = await getRequirementById(
          currentPurchaseOrder.requirementId,
          currentPurchaseOrder.type
        );
        if (requirement) {
          const offerArray: Offer[] = await Promise.all(
            responseData.data.map(async (item: any) => {
              const { responseData }: any = await makeRequest({
                service: getBaseDataUserService(item.userID),
                method: "get",
              });
              const { user, subUser } = transformToBaseUser(
                responseData.data[0]
              );
              return subUser
                ? transformToOffer(
                    item,
                    currentPurchaseOrder.type,
                    subUser,
                    user
                  )
                : transformToOffer(item, currentPurchaseOrder.type, user);
            })
          );
          setDataModal({
            type: ModalTypes.DETAILED_REQUIREMENT,
            data: {
              offerList: offerArray,
              requirement: requirement,
              forPurchaseOrder: true,
              filters: currentPurchaseOrder.filters,
            },
          });
          setIsOpenModal(true);
        } else showNotification(notification, "error", t("errorOccurred"));
      } else showNotification(notification, "error", t("errorOccurred"));
    } catch (error) {
      console.log(error);
      showNotification(notification, "error", t("errorOccurred"));
    } finally {
      showLoadingMessage(message, false);
      updateAllRequirementsViewOffers(false);
    }
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    setCurrentPurchaseOrder(purchaseOrder);

    switch (action) {
      case Action.DOWNLOAD_PURCHASE_ORDER:
        if (!loadingPdf)
          setApiParamsPdf({
            service: getPurchaseOrderPDFService(purchaseOrder.key),
            method: "get",
          });
        break;
      case Action.VIEW_PURCHASE_ORDER:
        setApiParamsHist({
          service: getOffersByRequirementIdService(purchaseOrder.requirementId),
          method: "get",
        });
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
        onSearch={handleSearch}
        loading={loading}
      />
    </>
  );
}
