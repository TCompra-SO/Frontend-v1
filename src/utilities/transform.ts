import { FullUser, Requirement } from "../models/MainInterfaces";
import { getBaseDataUserService } from "../services/authService";
import makeRequest from "./globalFunctions";
import { EntityType, RequirementType, Usage } from "./types";

export async function transformDataToRequirement(
  data: any,
  type: RequirementType
) {
  const user = await makeRequest({
    service: getBaseDataUserService("kMHAU9G3GFpDreBIZz67"),
    method: "get",
  });
  console.log(user);
  const req: Requirement = data;
  req.deliveryTime = data.submission_date;
  req.type = type;
  req.warrantyTime = data.duration;
  req.used = data.used ? Usage.USED : Usage.NEW;
  req.expirationDate = data.completion_date;
  req.user = {
    uid: "user1",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    typeEntity: EntityType.COMPANY,
    tenure: 2,
    customerScore: 3.5,
    sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",

    phone: "90909090",
    customerCount: 0,
    sellerCount: 0,
  };

  return req;
}

export function transformToFullUser(response: any) {
  const user: FullUser = response.data[0];
  user.typeEntity = response.typeEntity;
  user.activeAccount = response.active_account;
  user.specialty = response.specialtyID;
  user.aboutMe = response.about_me;
  return user;
}
