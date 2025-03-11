import {
  BaseUser,
  NotificationDataFromServer,
} from "../../models/MainInterfaces";
import { UserState } from "../../models/Redux";
import makeRequest, {
  getGetBasicRateDataRecordOfferService,
  getGetBasicRateDataRecordService,
  getGetRecordByIdService,
  getGetOfferByIdService,
  getGetOrderByIdService,
} from "../../utilities/globalFunctions";
import {
  transformDataToRequirement,
  transformFromGetRequirementByIdToRequirement,
  transformToBaseUser,
  transformToBasicRateData,
  transformToFullUser,
  transformToOffer,
  transformToPurchaseOrder,
  transformToRequiredDocsCert,
} from "../../utilities/transform";
import { CertificationState, RequirementType } from "../../utilities/types";
import {
  getBaseDataUserService,
  getUserService,
} from "../requests/authService";
import {
  deleteCertificateService,
  getRequiredDocumentsService,
  verifyCertificationService,
} from "../requests/certificateService";
import { getNotificationsService } from "../requests/notificationService";

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
    service: getGetOfferByIdService(type)?.(id),
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
    service: getGetRecordByIdService(type)?.(id),
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

export async function getPurchaseOrderById(id: string, type: RequirementType) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getGetOrderByIdService(type)?.(id),
    method: "get",
  });

  return {
    purchaseOrder: responseData
      ? transformToPurchaseOrder(responseData.data[0])
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
    service: useOfferService
      ? getGetBasicRateDataRecordOfferService(type)?.(idToGetData)
      : getGetBasicRateDataRecordService(type)?.(idToGetData),
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

export async function deleteCertificateById(id: string) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: deleteCertificateService(id),
    method: "get",
  });

  return {
    responseData,
    error,
    errorMsg,
  };
}

export async function getRequirementFromData(
  data: any,
  type: RequirementType,
  user?: BaseUser,
  subUser?: BaseUser,
  cache?: Map<string, Promise<any>> // Cache now stores Promises
) {
  if (user && subUser) {
    return transformDataToRequirement(
      data,
      type,
      data.user == data.subUser ? user : subUser,
      user
    );
  }

  // Generate a consistent cache key
  const cacheKey = data.subUser;

  // Create a new Promise for the cache to lock other requests
  const requestPromise =
    cache && cache.has(cacheKey)
      ? cache.get(cacheKey)
      : (async () => {
          const { responseData: respData }: any = await makeRequest({
            service: getBaseDataUserService(data.subUser),
            method: "get",
          });

          if (respData) {
            return respData;
          }
          throw new Error("Failed to fetch data");
        })();

  // Store the Promise in the cache
  if (cache && !cache.has(cacheKey) && requestPromise)
    cache.set(cacheKey, requestPromise);

  try {
    const respData = await requestPromise;
    const { user: newUser, subUser: newSubUser } = transformToBaseUser(
      respData.data[0]
    );
    return transformDataToRequirement(
      data,
      type,
      data.user == data.subUser ? newUser : newSubUser,
      newUser
    );
  } catch (err) {
    // Remove failed request from the cache to allow retrying
    cache?.delete(cacheKey);
    throw err;
  }
}

export async function verifyCertificationByUserIdAndCompanyId(
  userId: string,
  companyIdToVerify: string
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: verifyCertificationService(userId, companyIdToVerify),
    method: "get",
  });
  return {
    certState: error
      ? error.status == 404
        ? CertificationState.NONE
        : null
      : (responseData.state as CertificationState),
    error: error && error.status != 404 ? error : null,
    errorMsg,
  };
}

export async function getRequiredDocumentsForCertification(companyId: string) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getRequiredDocumentsService(companyId),
    method: "get",
  });

  return {
    certState: responseData ? transformToRequiredDocsCert(responseData) : null,
    error,
    errorMsg,
  };
}

export async function getNotifications(
  userId: string,
  page: number,
  pageSize: number
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getNotificationsService(userId, page, pageSize),
    method: "get",
  });

  return {
    notifications: responseData
      ? (responseData.data as NotificationDataFromServer[])
      : null,
    error,
    errorMsg,
  };
}
