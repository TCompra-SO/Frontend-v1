import { User } from "../../models/MainInterfaces";
import makeRequest from "../../utilities/globalFunctions";
import {
  transformFromGetRequirementByIdToRequirement,
  transformToBaseUser,
  transformToFullUser,
  transformToOffer,
} from "../../utilities/transform";
import { RequirementType } from "../../utilities/types";
import {
  getBaseDataUserService,
  getUserService,
} from "../requests/authService";
import { getOfferByIdService } from "../requests/offerService";
import { getRequirementByIdService } from "../requests/requirementService";

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
  user: User
) {
  const { responseData, error, errorMsg } = await makeRequest({
    service: getOfferByIdService(id),
    method: "get",
  });

  return {
    offer: responseData
      ? transformToOffer(responseData.data[0], type, user)
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
