import { BaseUser } from "../../models/MainInterfaces";
import { UserState } from "../../models/Redux";
import makeRequest from "../../utilities/globalFunctions";
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
  user?: BaseUser,
  subUser?: BaseUser
) {
  if (user && subUser)
    return transformDataToRequirement(
      data,
      RequirementType.GOOD,
      data.user == data.subUser ? user : subUser,
      user
    );

  const { responseData: respData }: any = await makeRequest({
    service: getBaseDataUserService(data.subUser),
    method: "get",
  });
  if (respData) {
    const { user: newUser, subUser: newSubUser } = transformToBaseUser(
      respData.data[0]
    );
    return transformDataToRequirement(
      data,
      RequirementType.GOOD,
      data.user == data.subUser ? newUser : newSubUser,
      newUser
    );
  }
  return null;
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
