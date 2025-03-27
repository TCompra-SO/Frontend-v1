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
import { defaultErrorMsg } from "../../utilities/globals";
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
import {
  CertificationState,
  ErrorMsgRequestType,
  RequirementType,
} from "../../utilities/types";
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
  try {
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
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, user: null, subUser: null };
  }
}

export async function getFullUser(uid: string) {
  try {
    const { responseData, error, errorMsg } = await makeRequest({
      service: getUserService(uid),
      method: "get",
    });

    return {
      user: responseData ? transformToFullUser(responseData.data) : null,
      error,
      errorMsg,
    };
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, user: null };
  }
}

export async function getOfferById(
  id: string,
  type: RequirementType,
  user?: BaseUser | UserState,
  mainUser?: BaseUser | UserState
) {
  try {
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
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, offer: null };
  }
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
  try {
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
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, purchaseOrder: null };
  }
}

export async function getBasicRateData(
  idToGetData: string,
  useOfferService: boolean,
  type: RequirementType
) {
  try {
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
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, basicRateData: null };
  }
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
  cache?: Map<string, Promise<any>>
) {
  try {
    if (user && subUser) {
      return transformDataToRequirement(
        data,
        type,
        data.user == data.subUser ? user : subUser,
        user
      );
    }
  } catch (err) {
    console.log(err);
    return null;
  }

  const cacheKey = data.subUser;

  try {
    const requestPromise = cache?.has(cacheKey)
      ? cache.get(cacheKey)
      : (async () => {
          try {
            const { responseData: respData }: any = await makeRequest({
              service: getBaseDataUserService(data.subUser),
              method: "get",
            });

            if (respData) {
              return respData;
            }
            throw new Error("Failed to fetch data");
          } catch (error) {
            console.error("Error fetching user data:", error);
            return null; // Retorna null en lugar de reject
          }
        })();

    if (cache && !cache.has(cacheKey) && requestPromise) {
      cache.set(cacheKey, requestPromise);
    }

    const respData = await requestPromise;

    if (!respData) {
      cache?.delete(cacheKey);
      return null;
    }

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
    console.error(err);
    cache?.delete(cacheKey); // Eliminar request fallida para reintentar
    return null;
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
  try {
    const { responseData, error, errorMsg } = await makeRequest({
      service: getRequiredDocumentsService(companyId),
      method: "get",
    });

    return {
      certState: responseData
        ? transformToRequiredDocsCert(responseData)
        : null,
      error,
      errorMsg,
    };
  } catch (e) {
    console.log(e);
    const errorMsg: ErrorMsgRequestType = defaultErrorMsg;
    return { error: e, errorMsg, certState: null };
  }
}

export async function getNotifications(
  mainUserId: string,
  userId: string,
  page: number,
  pageSize: number
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getNotificationsService(mainUserId, userId, page, pageSize),
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
