import { useContext, useEffect, useState } from "react";
import { ModalContent, OfferFilters, useApiParams } from "../models/Interfaces";
import useApi from "./useApi";
import {
  CancelOfferRequest,
  CancelRequirementRequest,
  HomeFilterRequest,
} from "../models/Requests";
import {
  cancelRequirementService,
  getBasicRateDataReqService,
  getRequirementsService,
  homeFilterService,
} from "../services/requests/requirementService";
import { useTranslation } from "react-i18next";
import {
  cancelOfferService,
  getBasicRateDataOfferService,
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
  getBasicRateData,
  getOfferById,
  getPurchaseOrderById,
  getRequirementById,
  getRequirementFromData,
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
import useShowNotification, { useShowLoadingMessage } from "./utilHook";
import { pageSizeOptionsSt } from "../utilities/globals";

/** useCancelRequirement */

export function useCancelRequirement() {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();

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
    reset: resetUseApi,
  } = useApi<CancelRequirementRequest>({
    service: apiParamsCancel.service,
    method: apiParamsCancel.method,
    dataToSend: apiParamsCancel.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(loadingCancel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCancel]);

  useEffect(() => {
    if (apiParamsCancel.service) fetchDataCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsCancel]);

  useEffect(() => {
    if (responseDataCancel) {
      showNotification("success", t("requirementCanceledSuccessfully"));
    } else if (errorCancel) {
      showNotification("error", errorMsgCancel);
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

export function useCancelOffer() {
  const { t } = useTranslation();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();

  const [apiParams, setApiParams] = useState<useApiParams>({
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
  } = useApi<CancelOfferRequest>({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      showNotification("success", t("offerCanceledSuccessfully"));
    } else if (error) {
      showNotification("error", errorMsg);
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
    return () => {
      updateMyRequirementsLoadingViewOffers(false);
      updateSubUserRequirementsViewOffers(false);
      updateAllPurchaseOrdersViewOffers(false);
      updateAllSalesOrdersViewOffers(false);
    };
  }, []);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    async function process() {
      try {
        if (responseData && requirementData.requirementId) {
          console.log(responseData);
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
                  item.user &&
                  !Object.prototype.hasOwnProperty.call(users, item.user)
                ) {
                  if (!pendingRequests[item.user]) {
                    pendingRequests[item.user] = makeRequest({
                      service: getBaseDataUserService(item.user),
                      method: "get",
                    }).then(({ responseData: responseDataU }: any) => {
                      const { user, subUser } = transformToBaseUser(
                        responseDataU.data[0]
                      );

                      users[item.user] = {
                        user: subUser ?? user,
                        mainUser: subUser ? user : undefined,
                      };
                      delete pendingRequests[item.user];
                    });
                  }
                  await pendingRequests[item.user];
                }
                return transformToOffer(
                  item,
                  requirementData.type,
                  users[item.user].user,
                  users[item.user].mainUser
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
          } else showNotification("error", t("errorOccurred"));
        } else if (error) {
          showNotification("error", errorMsg);
        }
      } catch (error) {
        console.log(error);
        showNotification("error", t("errorOccurred"));
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
    req?: Requirement,
    filters?: OfferFilters,
    purchaseOrderId?: string
  ) {
    if (tableType == TableTypes.REQUIREMENT)
      updateMyRequirementsLoadingViewOffers(true);
    else if (tableType == TableTypes.PURCHASE_ORDER_SUBUSER)
      updateSubUserRequirementsViewOffers(true);
    else if (tableType == TableTypes.ALL_PURCHASE_ORDERS)
      updateAllPurchaseOrdersViewOffers(true);
    else if (tableType == TableTypes.ALL_SALES_ORDERS)
      updateAllSalesOrdersViewOffers(true);
    showLoadingMessage(true);
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
      service: getOffersByRequirementIdService(reqId, page, pageSize),
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
      showLoadingMessage(true);
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
        if (offer) {
          const { basicRateData } = await getBasicRateData(
            offer.requirementId,
            false,
            RequirementType.GOOD //r3v
          );
          if (basicRateData)
            setDataModal({
              type: ModalTypes.OFFER_DETAIL,
              data: {
                offer,
                basicRateData,
              },
            });
          else showNotification("error", t("errorOccurred"));
        } else showNotification("error", t("errorOccurred"));
      } else {
        const { basicRateData } = await getBasicRateData(
          offerData.requirementId,
          false,
          RequirementType.GOOD
        ); // r3v
        if (basicRateData)
          setDataModal({
            type: ModalTypes.OFFER_DETAIL,
            data: {
              offer: offerData,
              basicRateData,
            },
          });
        else showNotification("error", t("errorOccurred"));
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
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
          type:
            culminateData.action == Action.FINISH
              ? ModalTypes.RATE_USER
              : ModalTypes.RATE_CANCELED,
          data: {
            basicRateData: data,
            type: culminateData.type,
            isOffer: culminateData.isOffer,
            requirementOrOfferId: culminateData.idToFinish,
          },
        });
      } else if (error) {
        showNotification("error", errorMsg);
      }
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      showLoadingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function getBasicRateData(
    idToFinish: string,
    idToGetData: string,
    useOfferService: boolean,
    isOffer: boolean,
    action: Action,
    type: RequirementType
  ) {
    showLoadingMessage(true);
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

export function useGetRequirementList() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getRequirementList(
    page: number,
    pageSize?: number,
    params?: HomeFilterRequest
  ) {
    try {
      setLoading(true);
      const { responseData }: any = await makeRequest({
        service: params
          ? homeFilterService()
          : getRequirementsService(page, pageSize ?? pageSizeOptionsSt[0]),
        method: params ? "post" : "get",
        dataToSend: params ?? undefined,
      });
      if (responseData) {
        const cache = new Map<string, any>(); // Scoped cache for this batch
        const data: (Requirement | null)[] = await Promise.all(
          responseData.data.map(async (e: any) =>
            getRequirementFromData(e, undefined, undefined, cache)
          )
        );
        setRequirements(data.filter((req) => req !== null));
        setTotal(responseData.res?.totalDocuments);
      }
    } catch (error) {
      console.log(error);
      setRequirements([]);
    } finally {
      setLoading(false);
    }
  }

  return {
    getRequirementList,
    requirements,
    total,
    loading,
  };
}
