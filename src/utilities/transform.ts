import {
  BaseUser,
  BasicRateData,
  FullUser,
  Offer,
  OfferItemSubUser,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  Requirement,
  RequirementItemSubUser,
} from "../models/MainInterfaces";
import { UserState } from "../models/Redux";
import { SubUserBase } from "../models/Responses";
import { getBaseDataUserService } from "../services/requests/authService";
import makeRequest from "./globalFunctions";
import {
  EntityType,
  PurchaseOrderTableTypes,
  RequirementType,
  Usage,
} from "./types";

export function transformDataToRequirement(
  data: any,
  type: RequirementType,
  user: UserState | BaseUser,
  mainUser: UserState | BaseUser,
  includeAlwaysSubUser?: boolean
) {
  const req: Requirement = data;
  // req.state = RequirementState.FINISHED;
  req.subUser = undefined;
  req.deliveryTime = data.submission_date;
  req.type = type;
  req.warrantyTime = data.duration;
  req.used = data.used ? Usage.USED : Usage.NEW;
  req.expirationDate = data.completion_date;
  req.paymentMethod = data.payment_methodID;
  req.allowedBidder = data.allowed_bidersID;
  req.image = data.images;
  req.document = data.files;
  if (data.winOffer) {
    req.offerId = data.winOffer.uid;
    req.offerUserId = data.winOffer.entityID;
    if (data.winOffer.entityID != data.winOffer.userID)
      req.offerSubUserId = data.winOffer.userID;
  }
  if (includeAlwaysSubUser) {
    req.user = mainUser;
    req.subUser = user;
  } else if (mainUser.uid != user.uid) {
    req.user = mainUser;
    req.subUser = user;
  } else req.user = user;
  return req;
}

export function transformDataToRequirementItemSubUser(
  data: any,
  type: RequirementType
) {
  const req: RequirementItemSubUser = {
    price: data.price,
    publishDate: data.publishDate,
    expirationDate: data.completion_date,
    numberOffers: data.numberOffers,
    state: data.state,
    coin: data.coin,
    title: data.title,
    key: data.key,
    type,
  };
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
      image: data.images,
      document: data.files,
      user,
      subUser,
      numberOffers: data.number_offers,
      type,
    };
    if (data.winOffer) {
      req.offerId = data.winOffer.uid;
      req.offerUserId = data.winOffer.entityID;
      if (data.winOffer.entityID != data.winOffer.userID)
        req.offerSubUserId = data.winOffer.userID;
    }
    return req;
  }
  return null;
}

export function transformToOffer(
  data: any,
  type: RequirementType,
  user: UserState | BaseUser,
  mainUser?: UserState | BaseUser
) {
  const offer: Offer = data;
  offer.key = data.uid;
  offer.title = data.name;
  offer.location = data.cityID;
  offer.deliveryTime = data.deliveryTimeID;
  offer.coin = data.currencyID;
  offer.warrantyTime = data.timeMeasurementID;
  offer.price = data.budget;
  offer.igv = data.includesIGV;
  offer.requirementId = data.requerimentID;
  offer.state = data.stateID; //OfferState.CANCELED
  offer.canceledByCreator = false;
  offer.type = type;
  offer.requirementTitle = data.requerimentTitle;
  if (mainUser) {
    offer.user = mainUser;
    offer.subUser = user;
  } else offer.user = user;
  // if (mainUser.uid != user.uid) {
  //   offer.user = mainUser;
  //   offer.subUser = user;
  // } else offer.user = user;
  return offer;
}

export function transformToOfferFromGetOffersByEntityOrSubUser(
  data: any,
  type: RequirementType,
  user: UserState | BaseUser,
  mainUser: UserState | BaseUser,
  includeAlwaysSubUser?: boolean
) {
  const offer: Offer = data;
  offer.subUser = undefined;
  offer.canceledByCreator = false;
  offer.type = type;

  if (includeAlwaysSubUser) {
    offer.user = mainUser;
    offer.subUser = user;
  } else if (mainUser.uid != user.uid) {
    offer.user = mainUser;
    offer.subUser = user;
  } else offer.user = user;

  return offer;
}

export function transformDataToOfferItemSubUser(
  data: any,
  type: RequirementType
) {
  const req: OfferItemSubUser = {
    requirementTitle: data.requirementTitle,
    price: data.price,
    publishDate: data.publishDate,
    state: data.state,
    coin: data.coin,
    title: data.title,
    key: data.key,
    type,
  };
  return req;
}

export function transformToBasicRateData(data: any) {
  const basicData: BasicRateData = data;
  if (basicData.userId !== basicData.subUserId) return basicData;
  else {
    basicData.subUserId = undefined;
    basicData.subUserName = undefined;
    return basicData;
  }
}

export function transformToPurchaseOrder(data: any) {
  const purcOrder: PurchaseOrder = {
    requirementTitle: data.requerimentTitle,
    requirementId: data.requerimentID,
    selectionDate: data.createDate,
    state: data.stateID,
    offerTitle: data.offerTitle,
    offerId: data.offerID,
    key: data.uid,
    type: data.type,
    filters: {
      price: data.price_Filter,
      deliveryTime: data.deliveryTime_Filter,
      location: data.location_Filter,
      warranty: data.warranty_Filter,
    },
    userClientId: data.userClientID,
    userNameClient: data.userNameClient,
    addressClient: data.addressClient,
    documentClient: data.documentClient,
    subUserClientId: data.subUserClientID,
    userProviderId: data.userProviderID,
    subUserProviderId: data.subUserProviderID,
    addressProvider: data.addressProvider,
    documentProvider: data.documentProvider,
    emailProvider: data.emailProvider,
    deliveryDate: data.deliveryDate,
    price: data.price,
    subTotal: data.subtotal,
    igv: data.igv,
    total: data.total,
    subUserNameClient: data.nameSubUserClient,
    userNameProvider: data.nameUserProvider,
    subUserNameProvider: data.nameSubUserProvider,
  };
  return purcOrder;
}

export function transformToPurchaseOrderItemSubUser(
  data: any,
  subType: PurchaseOrderTableTypes
) {
  const purcOrder: PurchaseOrderItemSubUser = {
    requirementTitle: data.requerimentTitle,
    offerTitle: data.offerTitle,
    selectionDate: data.createDate,
    state: data.stateID,
    subType,
    key: data.uid,
    type: data.type,
    requirementId: data.requerimentID,
    offerId: data.offerID,
    filters: {
      price: data.price_Filter,
      deliveryTime: data.deliveryTime_Filter,
      location: data.location_Filter,
      warranty: data.warranty_Filter,
    },
  };
  return purcOrder;
}

export function transformToSubUserBase(data: any) {
  const subUser: SubUserBase = {
    typeID: data.typeID,
    createdAt: data.createdAt,
    numGoods: 0,
    numServices: 0,
    numSales: 0,
    numOffers: 0,
    numPurchaseOrders: 0,
    uid: data.Uid,
    name: "aaaaaaaaaa",
    document: "434343",
    email: data.email,
    typeEntity: EntityType.SUBUSER,
  };
  return subUser;
}
