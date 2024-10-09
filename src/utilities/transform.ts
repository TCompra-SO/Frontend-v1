import { FullUser, Requirement } from "../models/MainInterfaces";
import { EntityType, RequirementType, Usage } from "./types";

export function transformDataToRequirement(data: any, type: RequirementType) {
  const req: Requirement = {
    description: data.description,
    category: data.category,
    location: data.location,
    publishDate: data.publishDate,
    expirationDate: data.completion_date,
    coin: data.coin,
    price: data.price,
    numberOffers: data.numberOffers,
    state: data.state,
    user: {
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
    },
    deliveryTime: data.submission_date,
    key: data.key,
    title: data.title,
    type: type,
    image: data.image,
    document: data.document,
    warranty: data.warranty,
    warrantyTime: data.duration,
    used: data.used ? Usage.USED : Usage.NEW,
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
