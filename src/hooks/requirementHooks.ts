import { useContext, useEffect, useState } from "react";
import {
  HttpService,
  ModalContent,
  OfferFilters,
  useApiParams,
} from "../models/Interfaces";
import useApi, { UseApiType } from "./useApi";
import {
  CancelOfferRequest,
  CancelRequirementRequest,
  HomeFilterRequest,
} from "../models/Requests";
import { useTranslation } from "react-i18next";
import {
  Action,
  EntityType,
  ModalTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import {
  BaseUser,
  NotificationData,
  Offer,
  Requirement,
} from "../models/MainInterfaces";
import {
  getBasicRateDataS,
  getOfferById,
  getPurchaseOrderById,
  getRequirementById,
  getRequirementFromData,
} from "../services/general/generalServices";
import makeRequest, {
  getCancelRecordService,
  getCancelOfferService,
  getGetBasicRateDataRecordOfferService,
  getGetBasicRateDataRecordService,
  getGetOffersByRecordIdService,
  getHomeFilterService,
  getHomeRecordsService,
  getInitialModalData,
} from "../utilities/globalFunctions";
import {
  transformToBaseUser,
  transformToBasicRateData,
  transformToOffer,
} from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import useShowNotification, { useShowLoadingMessage } from "./utilHooks";
import { defaultErrorMsg, pageSizeOptionsSt } from "../utilities/globals";

/** useCancelRequirement */

export function useCancelRequirement(additionalApiParams?: UseApiType) {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { updateIdAndActionQueue, deleteFromIdAndActionQueue } =
    useContext(LoadingDataContext);

  const [apiParamsCancel, setApiParamsCancel] = useState<
    useApiParams<CancelRequirementRequest>
  >({
    service: null,
    method: "get",
  });

  const {
    loading: loadingCancel,
    responseData: responseDataCancel,
    error: errorCancel,
    errorMsg: errorMsgCancel,
    fetchData: fetchDataCancel,
    reset: resetUseApi,
  } = useApi<CancelRequirementRequest>(apiParamsCancel, additionalApiParams);

  useEffect(() => {
    return () => {
      if (apiParamsCancel.dataToSend?.requerimentID)
        deleteFromIdAndActionQueue(apiParamsCancel.dataToSend.requerimentID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showLoadingMessage(loadingCancel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancel]);

  useEffect(() => {
    if (apiParamsCancel.service) fetchDataCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsCancel]);

  useEffect(() => {
    try {
      if (responseDataCancel) {
        showNotification("success", t("requirementCanceledSuccessfully"));
      } else if (errorCancel) {
        showNotification("error", errorMsgCancel);
      }
    } catch (err) {
      showNotification("error", t(defaultErrorMsg));
    } finally {
      if (apiParamsCancel.dataToSend?.requerimentID)
        deleteFromIdAndActionQueue(apiParamsCancel.dataToSend.requerimentID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataCancel, errorCancel]);

  function cancelRequirement(
    reqId: string,
    action: Action,
    type: RequirementType,
    motive?: string,
    notification?: NotificationData
  ) {
    updateIdAndActionQueue(reqId, action);
    const data: CancelRequirementRequest = {
      requerimentID: reqId,
      reason: motive,
      notification,
    };
    setApiParamsCancel({
      service: getCancelRecordService(type),
      method: "post",
      dataToSend: data,
    });
  }

  function reset() {
    setApiParamsCancel({
      service: null,
      method: "get",
    });
    resetUseApi();
  }

  return {
    cancelRequirement,
    resetCancelRequirement: reset,
    loadingCancelRequirement: loadingCancel,
    responseDataCancelReq: responseDataCancel,
    errorCancelReq: errorCancel,
  };
}

/** useCancelOffer */

export function useCancelOffer(additionalApiParams?: UseApiType) {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { updateIdAndActionQueue, deleteFromIdAndActionQueue } =
    useContext(LoadingDataContext);

  const [apiParams, setApiParams] = useState<useApiParams<CancelOfferRequest>>({
    service: null,
    method: "get",
  });

  const {
    loading,
    responseData,
    error,
    errorMsg,
    fetchData,
    reset: resetUseApi,
  } = useApi<CancelOfferRequest>(apiParams, additionalApiParams);

  useEffect(() => {
    return () => {
      if (apiParams.dataToSend?.offerID)
        deleteFromIdAndActionQueue(apiParams.dataToSend.offerID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showLoadingMessage(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    try {
      if (responseData) {
        showNotification("success", t("offerCanceledSuccessfully"));
      } else if (error) {
        showNotification("error", errorMsg);
      }
    } catch (err) {
      showNotification("error", t(defaultErrorMsg));
    } finally {
      if (apiParams.dataToSend?.offerID)
        deleteFromIdAndActionQueue(apiParams.dataToSend.offerID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function cancelOffer(
    offerId: string,
    type: RequirementType,
    canceledByCreator: boolean,
    action: Action,
    motive?: string,
    notification?: NotificationData
  ) {
    updateIdAndActionQueue(offerId, action);
    const data: CancelOfferRequest = {
      offerID: offerId,
      reason: motive,
      canceledByCreator,
      notification,
    };
    setApiParams({
      service: getCancelOfferService(type),
      method: "post",
      dataToSend: data,
    });
  }

  function reset() {
    setApiParams({
      service: null,
      method: "get",
    });
    resetUseApi();
  }

  return {
    cancelOffer,
    resetCancelOffer: reset,
    loadingCancelOffer: loading,
    responseDataCancelOffer: responseData,
    errorCancelOffer: error,
  };
}

/** useGetOffersByRequirementId */

export function useGetOffersByRequirementId() {
  const { t } = useTranslation();
  const [action, setAction] = useState<Action>(Action.NONE);
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const {
    updateMyRequirementsLoadingViewOffers,
    updateSubUserRequirementsViewOffers,
    updateAllPurchaseOrdersViewOffers,
    updateAllSalesOrdersViewOffers,
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
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
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
    return () => {
      updateMyRequirementsLoadingViewOffers(false);
      updateSubUserRequirementsViewOffers(false);
      updateAllPurchaseOrdersViewOffers(false);
      updateAllSalesOrdersViewOffers(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              requirementData.purchaseOrderId,
              requirementData.type
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
            const offerArray: (Offer | null)[] = await Promise.all(
              responseData.data.map(async (item: any) => {
                try {
                  const creator: string = item.subUser ?? item.user;
                  if (
                    (item.user &&
                      !item.subUser &&
                      !Object.prototype.hasOwnProperty.call(
                        users,
                        item.user
                      )) ||
                    (item.subUser &&
                      !Object.prototype.hasOwnProperty.call(
                        users,
                        item.subUser
                      ))
                  ) {
                    if (!pendingRequests[creator]) {
                      pendingRequests[creator] = makeRequest({
                        service: getBaseDataUserService(creator),
                        method: "get",
                      }).then(({ responseData: responseDataU }: any) => {
                        const { user, subUser } = transformToBaseUser(
                          responseDataU.data[0]
                        );
                        users[creator] = {
                          user: subUser ?? user,
                          mainUser: subUser ? user : undefined,
                        };
                        delete pendingRequests[creator];
                      });
                    }
                    await pendingRequests[creator];
                  }
                  return transformToOffer(
                    item,
                    requirementData.type,
                    users[creator].user,
                    users[creator].mainUser
                  );
                } catch (e) {
                  return null;
                }
              })
            );
            if (fetchedRequirement || requirementData.requirement) {
              const req: Requirement = (fetchedRequirement ??
                requirementData.requirement)!;
              setDataModal({
                type: ModalTypes.DETAILED_REQUIREMENT,
                data: {
                  offerList: offerArray.filter((offer) => offer !== null),
                  requirement: req,
                  forPurchaseOrder: requirementData.forPurchaseOrder,
                  filters: requirementData.filters ?? filters,
                  orderId: requirementData.purchaseOrderId,
                },
                action,
              });
            }
          } else showNotification("error", t(defaultErrorMsg));
        } else if (error) {
          showNotification("error", errorMsg);
        }
      } catch (error) {
        console.log(error);
        showNotification("error", t(defaultErrorMsg));
      } finally {
        if (requirementData.requirementId && (error || responseData)) {
          showLoadingMessage(false);
          if (requirementData.tableType == TableTypes.REQUIREMENT)
            updateMyRequirementsLoadingViewOffers(false);
          else if (
            requirementData.tableType == TableTypes.PURCHASE_ORDER_SUBUSER
          )
            updateSubUserRequirementsViewOffers(false);
          else if (requirementData.tableType == TableTypes.ALL_PURCHASE_ORDERS)
            updateAllPurchaseOrdersViewOffers(false);
          else if (requirementData.tableType == TableTypes.ALL_SALES_ORDERS)
            updateAllSalesOrdersViewOffers(false);
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
    page: number,
    pageSize: number,
    action: Action,
    req?: Requirement,
    filters?: OfferFilters,
    purchaseOrderId?: string
  ) {
    showLoadingMessage(true);
    setAction(action);
    if (tableType == TableTypes.REQUIREMENT)
      updateMyRequirementsLoadingViewOffers(true);
    else if (tableType == TableTypes.PURCHASE_ORDER_SUBUSER)
      updateSubUserRequirementsViewOffers(true);
    else if (tableType == TableTypes.ALL_PURCHASE_ORDERS)
      updateAllPurchaseOrdersViewOffers(true);
    else if (tableType == TableTypes.ALL_SALES_ORDERS)
      updateAllSalesOrdersViewOffers(true);
    setDataModal({
      type: ModalTypes.NONE,
      data: {},
      action: Action.NONE,
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
      service: getGetOffersByRecordIdService(typeReq)?.(reqId, page, pageSize),
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
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { t } = useTranslation();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );

  async function getOfferDetail(
    offerId: string,
    type: RequirementType,
    useUserData: boolean,
    action: Action,
    showActions: boolean,
    offerData?: Offer,
    orderId?: string
  ) {
    try {
      showLoadingMessage(true);
      setDataModal({
        type: ModalTypes.NONE,
        data: {},
        action: Action.NONE,
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
        if (offer) {
          const { basicRateData } = await getBasicRateDataS(
            offer.requirementId,
            false,
            type
          );
          if (basicRateData)
            setDataModal({
              type: ModalTypes.OFFER_DETAIL,
              data: {
                offer,
                basicRateData,
                showActions,
                orderData: orderId
                  ? {
                      id: orderId,
                      type,
                    }
                  : undefined,
              },
              action,
            });
          else showNotification("error", t(defaultErrorMsg));
        } else showNotification("error", t(defaultErrorMsg));
      } else {
        const { basicRateData } = await getBasicRateDataS(
          offerData.requirementId,
          false,
          type
        );
        if (basicRateData)
          setDataModal({
            type: ModalTypes.OFFER_DETAIL,
            data: {
              offer: offerData,
              basicRateData,
              showActions,
              orderData: orderId
                ? {
                    id: orderId,
                    type,
                  }
                : undefined,
            },
            action,
          });
        else showNotification("error", t(defaultErrorMsg));
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      showLoadingMessage(false);
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
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const [culminateData, setCulminateData] = useState<{
    type: RequirementType;
    isOffer: boolean;
    idToFinish: string;
    idToGetData: string;
    titleToFinish: string;
    action: Action;
    rowId: string;
  }>({
    type: RequirementType.GOOD,
    isOffer: false,
    action: Action.FINISH,
    idToFinish: "",
    titleToFinish: "",
    idToGetData: "",
    rowId: "",
  });
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { responseData, error, errorMsg, fetchData } = useApi(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    try {
      if (responseData) {
        const data = transformToBasicRateData(responseData.data[0]);
        setDataModal({
          type:
            culminateData.action == Action.FINISH
              ? ModalTypes.RATE_USER
              : ModalTypes.RATE_CANCELED,
          data: {
            basicRateData: data,
            type: culminateData.type,
            isOffer: culminateData.isOffer,
            requirementOrOfferId: culminateData.idToFinish,
            rowId: culminateData.rowId,
            requirementOrOfferTitle: culminateData.titleToFinish,
          },
          action: culminateData.action,
        });
      } else if (error) {
        showNotification("error", errorMsg);
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t(defaultErrorMsg));
    } finally {
      showLoadingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getBasicRateData(
    rowId: string,
    idToFinish: string,
    idToGetData: string,
    useOfferService: boolean,
    isOffer: boolean,
    action: Action,
    type: RequirementType,
    titleToFinish: string
  ) {
    showLoadingMessage(true);
    setDataModal({
      type: ModalTypes.NONE,
      data: {},
      action: Action.NONE,
    });
    setCulminateData({
      type,
      isOffer,
      idToFinish,
      idToGetData,
      action,
      rowId,
      titleToFinish,
    });
    setApiParams({
      service: useOfferService
        ? getGetBasicRateDataRecordOfferService(type)?.(idToGetData)
        : getGetBasicRateDataRecordService(type)?.(idToGetData),
      method: "get",
    });
  }
  return {
    getBasicRateData,
    modalDataRate: dataModal,
  };
}

export function useGetRequirementList() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [usersCache, setUsersCache] = useState<Map<string, any>>(new Map());

  async function getRequirementList(
    page: number,
    type: RequirementType,
    pageSize?: number,
    params?: HomeFilterRequest
  ) {
    let success: boolean = false;
    let totalPages: number = 0;
    try {
      setLoading(true);
      let httpService: HttpService | null = null;
      if (params) httpService = getHomeFilterService(type);
      else {
        const temp = getHomeRecordsService(type);
        if (temp) httpService = temp(page, pageSize ?? pageSizeOptionsSt[0]);
      }
      const { responseData, error } = await makeRequest({
        service: httpService,
        method: params ? "post" : "get",
        dataToSend: params ?? undefined,
      });
      if (responseData) {
        const cache = new Map<string, any>();
        setUsersCache(cache);
        const data: (Requirement | null)[] = await Promise.all(
          responseData.data.map(async (e: any) => {
            return getRequirementFromData(e, type, undefined, undefined, cache);
          })
        );
        setUsersCache(cache);
        setRequirements(data.filter((req) => req !== null));
        setTotal(responseData.res?.totalDocuments);
        totalPages = responseData.res?.totalPages;
        if (responseData.res?.currentPage > responseData.res?.totalPages)
          success = false;
        else success = true;
      } else if (error) {
        setTotal(0);
        setRequirements([]);
      }
    } catch (error) {
      console.log(error);
      setTotal(0);
      setRequirements([]);
    } finally {
      setLoading(false);
    }
    return { success, totalPages };
  }

  return {
    getRequirementList,
    requirements,
    total,
    loading,
    usersCache,
  };
}
