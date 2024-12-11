import { useEffect, useState } from "react";
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
import { cancelRequirementService } from "../services/requests/requirementService";
import { useTranslation } from "react-i18next";
import {
  cancelOfferService,
  getOfferByIdService,
  getOffersByRequirementIdService,
} from "../services/requests/offerService";
import { ModalTypes, RequirementType } from "../utilities/types";
import { Offer, Requirement } from "../models/MainInterfaces";
import { getRequirementById } from "../services/complete/general";
import makeRequest from "../utilities/globalFunctions";
import { transformToBaseUser, transformToOffer } from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";

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

export function useGetOffersByRequirementId() {
  const { notification, message } = App.useApp();
  const [requirementData, setRequirementData] = useState<{
    requirement: Requirement | null | undefined;
    type: RequirementType;
    requirementId: string;
    filters: OfferFilters | undefined;
    forPurchaseOrder: boolean;
  }>({
    requirement: null,
    type: RequirementType.GOOD,
    requirementId: "",
    filters: undefined,
    forPurchaseOrder: false,
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
    showLoadingMessage(message, loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    async function process() {
      try {
        if (responseData && requirementData.requirementId) {
          showLoadingMessage(message, true);
          let fetchedRequirement: Requirement | null = null;
          if (!requirementData.requirement) {
            const { requirement: iniFetchedRequirement } =
              await getRequirementById(
                requirementData.requirementId,
                requirementData.type
              );
            fetchedRequirement = iniFetchedRequirement;
          } else {
            if (requirementData.requirement || fetchedRequirement) {
              const offerArray: Offer[] = await Promise.all(
                responseData.data.map(async (item: any) => {
                  const { responseData: responseDataU }: any =
                    await makeRequest({
                      service: getBaseDataUserService(item.userID),
                      method: "get",
                    });
                  const { user, subUser } = transformToBaseUser(
                    responseDataU.data[0]
                  );
                  return subUser
                    ? transformToOffer(
                        item,
                        requirementData.type,
                        subUser,
                        user
                      )
                    : transformToOffer(item, requirementData.type, user);
                })
              );
              setDataModal({
                type: ModalTypes.DETAILED_REQUIREMENT,
                data: {
                  offerList: offerArray,
                  requirement:
                    requirementData.requirement ?? fetchedRequirement,
                  forPurchaseOrder: requirementData.forPurchaseOrder,
                  filters: requirementData.filters,
                },
              });
            } else showNotification(notification, "error", errorMsg);
          }
        } else if (error) {
          showNotification(notification, "error", errorMsg);
        }
      } catch (error) {
        showNotification(notification, "error", errorMsg);
      } finally {
        showLoadingMessage(message, false);
      }
    }
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, responseData, requirementData]);

  function getOffersByRequirementId(
    reqId: string,
    typeReq: RequirementType,
    forPurchaseOrder: boolean,
    req?: Requirement,
    filters?: OfferFilters
  ) {
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

export function useShowDetailOffer() {
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  function getOfferDetail(offerId: string, offerData?: Offer) {
    setDataModal({
      type: ModalTypes.NONE,
      data: {},
    });
    if (!offerData)
      setApiParams({
        service: getOfferByIdService(offerId),
        method: "get",
      });
  }
}
