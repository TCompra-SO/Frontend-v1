import { useContext, useEffect, useState } from "react";
import { ModalContent, OfferFilters, useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";
import {
  CancelOfferRequest,
  CancelRequirementRequest,
} from "../models/Requests";
import {
  cancelRequirementService,
  getBasicRateDataReqService,
} from "../services/requests/requirementService";
import { useTranslation } from "react-i18next";
import {
  cancelOfferService,
  getBasicRateDataOfferService,
  getOfferByIdService,
  getOffersByRequirementIdService,
} from "../services/requests/offerService";
import {
  Action,
  EntityType,
  ModalTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { BaseUser, Offer, Requirement } from "../models/MainInterfaces";
import {
  getBaseUserForUserSubUser,
  getOfferById,
  getPurchaseOrderById,
  getRequirementById,
} from "../services/complete/general";
import makeRequest from "../utilities/globalFunctions";
import {
  transformToBaseUser,
  transformToBasicRateData,
  transformToOffer,
} from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";

/** useCancelRequirement */

export function useCancelRequirement() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();

  const [apiParamsCancel, setApiParamsCancel] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingCancel,
    responseData: responseDataCancel,
    error: errorCancel,
    errorMsg: errorMsgCancel,
    fetchData: fetchDataCancel,
  } = useApi<CancelRequirementRequest>({
    service: apiParamsCancel.service,
    method: apiParamsCancel.method,
    dataToSend: apiParamsCancel.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingCancel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancel]);

  useEffect(() => {
    if (apiParamsCancel.service) fetchDataCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsCancel]);

  useEffect(() => {
    if (responseDataCancel) {
      showNotification(
        notification,
        "success",
        t("requirementCanceledSuccessfully")
      );
    } else if (errorCancel) {
      showNotification(notification, "error", errorMsgCancel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataCancel, errorCancel]);

  function cancelRequirement(reqId: string, motive?: string) {
    const data: CancelRequirementRequest = {
      requerimentID: reqId,
      reason: motive,
    };
    setApiParamsCancel({
      service: cancelRequirementService(),
      method: "post",
      dataToSend: data,
    });
  }

  return { cancelRequirement, loadingCancelRequirement: loadingCancel };
}

/** useCancelOffer */

export function useCancelOffer() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<CancelOfferRequest>({
      service: apiParams.service,
      method: apiParams.method,
      dataToSend: apiParams.dataToSend,
    });

  useEffect(() => {
    showLoadingMessage(message, loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      showNotification(notification, "success", t("offerCanceledSuccessfully"));
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function cancelOffer(
    offerId: string,
    canceledByCreator: boolean,
    motive?: string
  ) {
    const data: CancelOfferRequest = {
      offerID: offerId,
      reason: motive,
      canceledByCreator,
    };
    setApiParams({
      service: cancelOfferService(),
      method: "post",
      dataToSend: data,
    });
  }

  return {
    cancelOffer,
    loadingCancelOffer: loading,
    responseDataCancelOffer: responseData,
  };
}

/** useGetOffersByRequirementId */

export function useGetOffersByRequirementId() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const {
    updateMyRequirementsLoadingViewOffers,
    updateSubUserRequirementsViewOffers,
  } = useContext(LoadingDataContext);
  const [requirementData, setRequirementData] = useState<{
    requirement: Requirement | null | undefined;
    type: RequirementType;
    requirementId: string;
    filters: OfferFilters | undefined;
    forPurchaseOrder: boolean;
    purchaseOrderId: string | undefined;
    tableType: TableTypes;
  }>({
    requirement: null,
    type: RequirementType.GOOD,
    requirementId: "",
    filters: undefined,
    forPurchaseOrder: false,
    purchaseOrderId: undefined,
    tableType: TableTypes.REQUIREMENT,
  });
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
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
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    async function process() {
      try {
        if (responseData && requirementData.requirementId) {
          // Obtener filtros para órdenes en caso de que no existan
          let filters: OfferFilters | undefined = undefined;
          if (
            requirementData.forPurchaseOrder &&
            requirementData.purchaseOrderId &&
            !requirementData.filters
          ) {
            const { purchaseOrder } = await getPurchaseOrderById(
              requirementData.purchaseOrderId
            );
            if (purchaseOrder) filters = purchaseOrder.filters;
          }
          // Obtener requerimiento si no existe
          let fetchedRequirement: Requirement | null = null;
          if (!requirementData.requirement) {
            const { requirement: iniFetchedRequirement } =
              await getRequirementById(
                requirementData.requirementId,
                requirementData.type
              );
            fetchedRequirement = iniFetchedRequirement;
          }
          if (requirementData.requirement || fetchedRequirement) {
            const users: {
              [key: string]: {
                user: BaseUser;
                mainUser: BaseUser | undefined;
              };
            } = {};
            // Obtener lista de ofertas
            const pendingRequests: { [key: string]: Promise<any> } = {};
            const offerArray: Offer[] = await Promise.all(
              responseData.data.map(async (item: any) => {
                if (
                  item.userID &&
                  !Object.prototype.hasOwnProperty.call(users, item.userID)
                ) {
                  if (!pendingRequests[item.userID]) {
                    pendingRequests[item.userID] = makeRequest({
                      service: getBaseDataUserService(item.userID),
                      method: "get",
                    }).then(({ responseData: responseDataU }: any) => {
                      const { user, subUser } = transformToBaseUser(
                        responseDataU.data[0]
                      );

                      users[item.userID] = {
                        user: subUser ?? user,
                        mainUser: subUser ? user : undefined,
                      };
                      delete pendingRequests[item.userID];
                    });
                  }
                  await pendingRequests[item.userID];
                }
                return transformToOffer(
                  item,
                  requirementData.type,
                  users[item.userID].user,
                  users[item.userID].mainUser
                );
              })
            );
            if (fetchedRequirement)
              setDataModal({
                type: ModalTypes.DETAILED_REQUIREMENT,
                data: {
                  offerList: offerArray,
                  requirement: fetchedRequirement,
                  forPurchaseOrder: requirementData.forPurchaseOrder,
                  filters: requirementData.filters ?? filters,
                },
              });
            else if (requirementData.requirement)
              setDataModal({
                type: ModalTypes.DETAILED_REQUIREMENT,
                data: {
                  offerList: offerArray,
                  requirement: requirementData.requirement,
                  forPurchaseOrder: requirementData.forPurchaseOrder,
                  filters: requirementData.filters ?? filters,
                },
              });
          } else showNotification(notification, "error", t("errorOccurred"));
        } else if (error) {
          showNotification(notification, "error", errorMsg);
        }
      } catch (error) {
        showNotification(notification, "error", t("errorOccurred"));
      } finally {
        if (requirementData.requirementId && (error || responseData)) {
          showLoadingMessage(message, false);
          if (requirementData.tableType == TableTypes.REQUIREMENT)
            updateMyRequirementsLoadingViewOffers(false);
          else if (
            requirementData.tableType == TableTypes.PURCHASE_ORDER_SUBUSER
          )
            updateSubUserRequirementsViewOffers(false);
        }
      }
    }
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, responseData]);

  function getOffersByRequirementId(
    tableType: TableTypes,
    reqId: string,
    typeReq: RequirementType,
    forPurchaseOrder: boolean,
    req?: Requirement,
    filters?: OfferFilters,
    purchaseOrderId?: string
  ) {
    if (requirementData.tableType == TableTypes.REQUIREMENT)
      updateMyRequirementsLoadingViewOffers(true);
    else if (requirementData.tableType == TableTypes.PURCHASE_ORDER_SUBUSER)
      updateSubUserRequirementsViewOffers(true);
    showLoadingMessage(message, true);
    setDataModal({
      type: ModalTypes.NONE,
      data: {},
    });
    setRequirementData({
      requirementId: reqId,
      type: typeReq,
      requirement: req,
      filters,
      forPurchaseOrder,
      purchaseOrderId,
      tableType,
    });
    setApiParams({
      service: getOffersByRequirementIdService(reqId),
      method: "get",
    });
  }

  return {
    getOffersByRequirementId,
    loadingGetOffersByRequirementId: loading,
    responseDataGetOffersByRequirementId: responseData,
    modalDataOffersByRequirementId: dataModal,
  };
}

/** useShowDetailOffer */

export function useShowDetailOffer() {
  const { notification, message } = App.useApp();
  const { t } = useTranslation();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

  async function getOfferDetail(
    offerId: string,
    type: RequirementType,
    useUserData: boolean,
    offerData?: Offer
  ) {
    try {
      showLoadingMessage(message, true);
      setDataModal({
        type: ModalTypes.NONE,
        data: {},
      });
      if (!offerData) {
        const { offer } = await getOfferById(
          offerId,
          type,
          useUserData ? dataUser : undefined,
          useUserData
            ? dataUser.typeEntity == EntityType.SUBUSER
              ? mainDataUser
              : undefined
            : undefined
        );
        if (offer)
          setDataModal({
            type: ModalTypes.OFFER_DETAIL,
            data: {
              offer,
            },
          });
        else showNotification(notification, "error", t("errorOccurred"));
      } else
        setDataModal({
          type: ModalTypes.OFFER_DETAIL,
          data: {
            offer: offerData,
          },
        });
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    } finally {
      showLoadingMessage(message, false);
    }
  }

  return {
    getOfferDetail,
    modalDataOfferDetail: dataModal,
  };
}

/** useCulminate */

export function useCulminate() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const [culminateData, setCulminateData] = useState<{
    type: RequirementType;
    isOffer: boolean;
    idToFinish: string;
    idToGetData: string;
    action: Action;
  }>({
    type: RequirementType.GOOD,
    isOffer: false,
    action: Action.FINISH,
    idToFinish: "",
    idToGetData: "",
  });
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    try {
      if (responseData) {
        const data = transformToBasicRateData(responseData.data[0]);
        setDataModal({
          type: ModalTypes.RATE_USER,
          data: {
            basicRateData: data,
            type: culminateData.type,
            isOffer: culminateData.isOffer,
            requirementOrOfferId: culminateData.idToFinish,
          },
        });
      } else if (error) {
        showNotification(notification, "error", errorMsg);
      }
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    } finally {
      showLoadingMessage(message, false);
    }
  }, [responseData, error]);

  function getBasicRateData(
    idToFinish: string,
    idToGetData: string,
    useOfferService: boolean,
    isOffer: boolean,
    action: Action,
    type: RequirementType
  ) {
    showLoadingMessage(message, true);
    setDataModal({
      type: ModalTypes.NONE,
      data: {},
    });
    setCulminateData({
      type,
      isOffer,
      idToFinish,
      idToGetData,
      action,
    });
    setApiParams({
      service: useOfferService
        ? getBasicRateDataOfferService(idToGetData)
        : getBasicRateDataReqService(idToGetData),
      method: "get",
    });
  }
  return {
    getBasicRateData,
    modalDataRate: dataModal,
  };
}
