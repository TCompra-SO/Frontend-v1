import { BaseUser } from "../../models/MainInterfaces";
import { UserState } from "../../models/Redux";
import store from "../../redux/store";
import makeRequest from "../../utilities/globalFunctions";
import {
  transformFromGetRequirementByIdToRequirement,
  transformToBaseUser,
  transformToBasicRateData,
  transformToFullUser,
  transformToOffer,
  transformToPurchaseOrder,
} from "../../utilities/transform";
import { RequirementType } from "../../utilities/types";
import {
  getBaseDataUserService,
  getUserService,
} from "../requests/authService";
import { getCertificatesService } from "../requests/certificateService";
import {
  getBasicRateDataOfferService,
  getOfferByIdService,
} from "../requests/offerService";
import { getPurchaseOrderByIdService } from "../requests/purchaseOrderService";
import {
  getBasicRateDataReqService,
  getRequirementByIdService,
} from "../requests/requirementService";

export async function getBaseUserForUserSubUser(
  uid: string,
  fromLogin: boolean = false
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getBaseDataUserService(uid),
    method: "get",
  });
  if (responseData)
    return {
      ...transformToBaseUser(responseData.data[0], fromLogin),
      error,
      errorMsg,
    };
  else return { error, errorMsg, user: null, subUser: null };
}

export async function getFullUser(uid: string) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getUserService(uid),
    method: "get",
  });

  return {
    user: responseData ? transformToFullUser(responseData.data) : null,
    error,
    errorMsg,
  };
}

export async function getOfferById(
  id: string,
  type: RequirementType,
  user?: BaseUser | UserState,
  mainUser?: BaseUser | UserState
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getOfferByIdService(id),
    method: "get",
  });

  if (!user) {
    const {
      user: userN,
      subUser: subUserN,
      error: errorN,
      errorMsg: errorMsgN,
    } = await getBaseUserForUserSubUser(responseData.data[0].subUser);
    if (userN)
      return {
        offer: responseData
          ? transformToOffer(
              responseData.data[0],
              type,
              subUserN ?? userN,
              subUserN ? userN : undefined
            )
          : null,
        errorN,
        errorMsgN,
      };
    else
      return {
        offer: null,
        error,
        errorMsg,
      };
  } else
    return {
      offer: responseData
        ? transformToOffer(responseData.data[0], type, user, mainUser)
        : null,
      error,
      errorMsg,
    };
}

export async function getRequirementById(id: string, type: RequirementType) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getRequirementByIdService(id),
    method: "get",
  });

  return {
    requirement: responseData
      ? await transformFromGetRequirementByIdToRequirement(
          responseData.data[0],
          type
        )
      : null,
    error,
    errorMsg,
  };
}

export async function getPurchaseOrderById(id: string) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getPurchaseOrderByIdService(id),
    method: "get",
  });

  return {
    purchaseOrder: responseData
      ? transformToPurchaseOrder(responseData.data)
      : null,
    error,
    errorMsg,
  };
}

export async function getBasicRateData(
  idToGetData: string,
  useOfferService: boolean,
  type: RequirementType
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service:
      type == RequirementType.GOOD
        ? useOfferService
          ? getBasicRateDataOfferService(idToGetData)
          : getBasicRateDataReqService(idToGetData)
        : useOfferService
        ? getBasicRateDataOfferService(idToGetData)
        : getBasicRateDataReqService(idToGetData),
    method: "get",
  });

  return {
    basicRateData: responseData
      ? transformToBasicRateData(responseData.data[0])
      : null,
    error,
    errorMsg,
  };
}
