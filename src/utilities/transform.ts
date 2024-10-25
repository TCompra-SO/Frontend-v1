import { BaseUser, FullUser, Requirement } from "../models/MainInterfaces";
import { UserState } from "../models/Redux";
import { getBaseDataUserService } from "../services/requests/authService";
import makeRequest from "./globalFunctions";
import { RequirementState, RequirementType, Usage } from "./types";

export async function transformDataToRequirement(
  data: any,
  type: RequirementType,
  user: UserState | BaseUser,
  mainUser: UserState | BaseUser
) {
  const req: Requirement = data;
  req.state = RequirementState.FINISHED;
  req.deliveryTime = data.submission_date;
  req.type = type;
  req.warrantyTime = data.duration;
  req.used = data.used ? Usage.USED : Usage.NEW;
  req.expirationDate = data.completion_date;
  req.paymentMethod = data.payment_methodID;
  req.allowedBidder = data.allowed_bidersID;
  if (mainUser.uid != user.uid) {
    req.user = mainUser;
    // req.user = {
    //   document: "111111",
    //   address: "address example",
    //   phone: "9888888",
    //   ...mainUser,
    // };
    req.subUser = user;
    // req.subUser = {
    //   document: "111111",
    //   address: "address example",
    //   phone: "9888888",
    //   ...user,
    // };
  } else req.user = user;
  // req.user = {
  //   document: "111111",
  //   address: "address example",
  //   phone: "9888888",
  //   ...user,
  // };
  return req;
}

export function transformToFullUser(response: any) {
  const user: FullUser = response;
  user.typeEntity = response.typeEntity;
  user.activeAccount = response.active_account;
  user.specialty = response.specialtyID;
  user.aboutMe = response.about_me;
  return user;
}

export function transformToBaseUser(response: any, fromLogin: boolean = false) {
  const user: BaseUser = response;
  let subUser: BaseUser = response.auth_users;
  if (subUser) {
    // usuario es subusuario
    subUser.uid = response.auth_users.Uid;
  }
  if (!subUser && fromLogin) subUser = user; // para usuario logueado: usuario es principal, subuser y user son iguales
  return { user, subUser };
}

export async function transformFromGetRequirementByIdToRequirement(
  data: any,
  type: RequirementType
) {
  let user: BaseUser | undefined = undefined;
  let subUser: BaseUser | undefined = undefined;
  const { responseData }: any = await makeRequest({
    service: getBaseDataUserService(data.userID),
    method: "get",
  });
  if (responseData) {
    ({ user, subUser } = transformToBaseUser(responseData.data[0]));
  }

  if (user) {
    const req: Requirement = {
      description: data.description,
      title: data.name,
      key: data.uid,
      category: data.categoryID,
      location: data.cityID,
      price: data.budget,
      coin: data.currencyID,
      paymentMethod: data.payment_methodID,
      expirationDate: data.completion_date,
      deliveryTime: data.submission_dateID,
      warranty: data.warranty,
      warrantyTime: data.duration,
      allowedBidder: data.allowed_bidersID,
      publishDate: data.publish_date,
      state: data.stateID,

      user,
      subUser,

      numberOffers: data.number_offers,
      type,
    };
    return req;
  }
  return null;
}
