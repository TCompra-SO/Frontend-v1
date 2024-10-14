import makeRequest from "../utilities/globalFunctions";
import {
  transformToBaseUser,
  transformToFullUser,
} from "../utilities/transform";
import { getBaseDataUserService, getUserService } from "./authService";

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
