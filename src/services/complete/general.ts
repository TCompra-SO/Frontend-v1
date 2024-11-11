import { User } from "../../models/MainInterfaces";
import makeRequest from "../../utilities/globalFunctions";
import {
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

export async function getBaseUserForUserSubUser(
  uid: string,
  fromLogin: boolean = false
) {
  const { responseData }: any = await makeRequest({
    service: getBaseDataUserService(uid),
    method: "get",
  });
  if (responseData) return transformToBaseUser(responseData.data[0], fromLogin);
  else return { user: null, subUser: null };
}

export async function getFullUser(uid: string) {
  const { responseData }: any = await makeRequest({
    service: getUserService(uid),
    method: "get",
  });
  if (responseData) return transformToFullUser(responseData.data[0]);
  else return null;
}

export async function getOfferById(
  id: string,
  type: RequirementType,
  user: User
) {
  const { responseData }: any = await makeRequest({
    service: getOfferByIdService(id),
    method: "get",
  });
  if (responseData) return transformToOffer(responseData.data[0], type, user);
  else return null;
}
