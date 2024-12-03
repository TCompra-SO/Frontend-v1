import { Offer, PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
  UserRoles,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  TableTypePurchaseOrder,
  TableTypeSalesOrder,
  useApiParams,
} from "../models/Interfaces";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import {
  getBaseDataUserService,
  getUserService,
} from "../services/requests/authService";
import { App } from "antd";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import makeRequest, {
  getLabelFromPurchaseOrderType,
  getLabelFromRequirementType,
  getPurchaseOrderType,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import {
  transformToBaseUser,
  transformToBasicRateData,
  transformToFullUser,
  transformToOffer,
  transformToPurchaseOrder,
} from "../utilities/transform";
import { mainModalScrollStyle } from "../utilities/globals";
import { useLocation } from "react-router-dom";
import {
  getPurchaseOrderPDFService,
  getPurchaseOrdersByClientEntityService,
  getPurchaseOrdersByProviderEntityService,
} from "../services/requests/purchaseOrderService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  getBasicRateDataOfferService,
  getOffersByRequirementIdService,
} from "../services/requests/offerService";
import { getBasicRateDataReqService } from "../services/requests/requirementService";
import { getRequirementById } from "../services/complete/general";
import { LoadingDataContext } from "../contexts/LoadingDataContext";

export default function SalesOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const role = useSelector((state: MainState) => state.user.typeID);
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { notification, message } = App.useApp();
  const [currentPurchaseOrder, setCurrentPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeSalesOrder>({
    type: TableTypes.SALES_ORDER,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  /** Para obtener datos iniciales y datos de proveedor/cliente */

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
          service: getPurchaseOrdersByClientEntityService(
            uid,
            role == UserRoles.ADMIN ? UserRoles.BUYER : role
          ),
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.RECEIVED:
        setApiParams({
          service: getPurchaseOrdersByProviderEntityService(
            uid,
            role == UserRoles.ADMIN ? UserRoles.BUYER : role
          ),
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
    showLoadingMessage(message, loadingUser);
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
      showNotification(notification, "error", errorMsgUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /* Obtener datos para culminar */

  const [apiParamsRate, setApiParamsRate] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingRate,
    responseData: responseDataRate,
    error: errorRate,
    errorMsg: errorMsgRate,
    fetchData: fetchDataRate,
  } = useApi({
    service: apiParamsRate.service,
    method: apiParamsRate.method,
    dataToSend: apiParamsRate.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingRate]);

  useEffect(() => {
    if (apiParamsRate.service) fetchDataRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsRate]);

  useEffect(() => {
    if (responseDataRate) {
      openRateModal();
    } else if (errorRate) {
      showNotification(notification, "error", errorMsgRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataRate, errorRate]);

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
    showLoadingMessage(message, loadingHist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHist]);

  useEffect(() => {
    if (apiParamsHist.service) fetchDataHist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsHist]);

  useEffect(() => {
    if (responseDataHist) {
      openDetailedRequirement();
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
    updateMyPurchaseOrdersLoadingPdf(loadingPdf);
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

      setTableContent((prev) => {
        return {
          ...prev,
          subType: type,
          data,
        };
      });
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function openRateModal() {
    const data = transformToBasicRateData(responseDataRate.data[0]);
    if (currentPurchaseOrder) {
      setDataModal({
        type: ModalTypes.RATE_USER,
        data: {
          basicRateData: data,
          type: currentPurchaseOrder.type,
          isOffer: type == PurchaseOrderTableTypes.ISSUED,
          requirementOrOfferId:
            type == PurchaseOrderTableTypes.ISSUED
              ? currentPurchaseOrder.requirementId // creador de la liquidación
              : currentPurchaseOrder.offerId,
        },
      });
      setIsOpenModal(true);
    }
  }

  function showUserInfo() {
    const user = transformToFullUser(responseDataUser.data);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
    });
    setIsOpenModal(true);
  }

  async function openDetailedRequirement() {
    showLoadingMessage(message, true);
    try {
      if (
        currentPurchaseOrder &&
        responseDataHist.data &&
        Array.isArray(responseDataHist.data)
      ) {
        const { requirement } = await getRequirementById(
          currentPurchaseOrder.requirementId,
          currentPurchaseOrder.type
        );
        if (requirement) {
          const offerArray: Offer[] = await Promise.all(
            responseDataHist.data.map(async (item: any) => {
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
    } catch (e) {
      showNotification(notification, "error", t("errorOccurred"));
      console.log(e);
    } finally {
      showLoadingMessage(message, false);
    }
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    setCurrentPurchaseOrder(purchaseOrder);

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
          if (purchaseOrder.type == RequirementType.GOOD)
            setApiParamsRate({
              service: getBasicRateDataOfferService(purchaseOrder.offerId),
              method: "get",
            });
          break;
        } else if (type == PurchaseOrderTableTypes.RECEIVED)
          if (purchaseOrder.type == RequirementType.GOOD)
            // Buscar en liquidación
            setApiParamsRate({
              service: getBasicRateDataReqService(purchaseOrder.requirementId),
              method: "get",
            });
        break;
      case Action.VIEW_HISTORY:
        setApiParamsHist({
          service: getOffersByRequirementIdService(purchaseOrder.requirementId),
          method: "get",
        });
        break;
      case Action.CANCEL: //r3v
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: purchaseOrder.offerId,
            requirementId: purchaseOrder.requirementId,
            fromRequirementTable: false,
          },
        });
        setIsOpenModal(true);
        break;
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
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
        onSearch={handleSearch}
        loading={loading}
      />
    </>
  );
}
