import { BaseUser, FullUser, Requirement } from "../models/MainInterfaces";
import { UserState } from "../models/Redux";
import { RequirementState, RequirementType, Usage } from "./types";

export async function transformDataToRequirement(
  data: any,
  type: RequirementType,
  user: UserState,
  mainUser: UserState
) {
  const req: Requirement = data;
  req.state = RequirementState.FINISHED;
  req.deliveryTime = data.submission_date;
  req.type = type;
  req.warrantyTime = data.duration;
  req.used = data.used ? Usage.USED : Usage.NEW;
  req.expirationDate = data.completion_date;
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
    subUser.uid = response.auth_users.Uid;
  }
  if (!subUser && fromLogin) subUser = user;
  return { user, subUser };
}
