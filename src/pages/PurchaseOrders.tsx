import { Offer, PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  TableTypePurchaseOrder,
  useApiParams,
} from "../models/Interfaces";
import { ChangeEvent, useEffect, useState } from "react";
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
  equalServices,
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
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
import { getReqIssuedPurchaseOrderByUserService } from "../services/requests/purchaseOrderService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  getBasicRateDataOfferService,
  getOffersByRequirementIdService,
} from "../services/requests/offerService";
import { getBasicRateDataReqService } from "../services/requests/requirementService";
import { getRequirementById } from "../services/complete/general";

export default function PurchaseOrders() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { notification, message } = App.useApp();
  const [currentPurchaseOrder, setCurrentPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener datos iniciales */
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getReqIssuedPurchaseOrderByUserService(uid),
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
      };
    });
  }, [type]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (equalServices(apiParams.service, getUserService("")))
      showLoadingMessage(message, loading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      if (
        equalServices(
          apiParams.service,
          getReqIssuedPurchaseOrderByUserService("")
        )
      )
        setTableData();
      else if (equalServices(apiParams.service, getUserService("")))
        showUserInfo(responseData);
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

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
      openRateModal(responseDataRate);
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
      openDetailedRequirement(responseDataHist);
    } else if (errorHist) {
      showNotification(notification, "error", errorMsgHist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataHist, errorHist]);

  /** Funciones */

  async function setTableData() {
    if (responseData) {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );

      setTableContent({
        type: TableTypes.PURCHASE_ORDER,
        data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function openRateModal(responseData: any) {
    const data = transformToBasicRateData(responseData.data[0]);
    console.log(currentPurchaseOrder);
    if (currentPurchaseOrder) {
      setDataModal({
        type: ModalTypes.RATE_USER,
        data: {
          basicRateData: data,
          type: currentPurchaseOrder.type,
          isOffer:
            type == PurchaseOrderTableTypes.ISSUED ||
            type == PurchaseOrderTableTypes.RECEIVED_SALES,
        },
      });
      setIsOpenModal(true);
    }
  }

  function showUserInfo(responseData: any) {
    const user = transformToFullUser(responseData.data[0]);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
    });
    setIsOpenModal(true);
  }

  async function openDetailedRequirement(responseData: any) {
    showLoadingMessage(message, true);
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
            const { user, subUser } = transformToBaseUser(responseData.data[0]);
            return subUser
              ? transformToOffer(item, currentPurchaseOrder.type, subUser, user)
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
    showLoadingMessage(message, false);
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    setCurrentPurchaseOrder(purchaseOrder);

    switch (action) {
      case Action.VIEW_CUSTOMER:
        setApiParams({
          service: getUserService(purchaseOrder.userClientId),
          method: "get",
        });
        break;
      case Action.VIEW_SUPPLIER:
        setApiParams({
          service: getUserService(purchaseOrder.userProviderId),
          method: "get",
        });
        break;
      case Action.DOWNLOAD_PURCHASE_ORDER: // r3v
        console.log("pdf", purchaseOrder.key);
        break;
      case Action.FINISH:
        // if (tableSubType == PurchaseOrderTableTypes.RECEIVED_SALES) // buscar en ofertas liquidaciones r3v
        // if (tableSubType == PurchaseOrderTableTypes.ISSUED_SALES) // buscar en liquidaciones
        if (type == PurchaseOrderTableTypes.ISSUED) {
          // Buscar en oferta de requerimiento
          if (purchaseOrder.type == RequirementType.GOOD)
            setApiParamsRate({
              service: getBasicRateDataOfferService(purchaseOrder.offerId),
              method: "get",
            });
          break;
        } else if (type == PurchaseOrderTableTypes.RECEIVED)
          if (purchaseOrder.type == RequirementType.GOOD)
            // Buscar en requerimiento
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
        title={t("myPurchaseOrders")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(
          getLabelFromPurchaseOrderType(type, true, false)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        // loading={
        //   equalServices(apiParams.service, getRequirementsService())
        //     ? loading
        //     : undefined
        // }
      />
    </>
  );
}
