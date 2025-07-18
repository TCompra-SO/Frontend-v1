import { RequiredDocsForCert } from "../models/Interfaces";
import {
  BaseUser,
  BasicRateData,
  BasicRequirement,
  CertificateFile,
  CertificationItem,
  ChatListData,
  ChatMessage,
  DisplayUser,
  FullUser,
  NotificationDataFromServer,
  Offer,
  OfferItemSubUser,
  PlanData,
  PurchaseOrder,
  PurchaseOrderItemSubUser,
  Requirement,
  RequirementItemSubUser,
  StatisticsData,
  SubUserBase,
  SubUserProfile,
  UserCounters,
} from "../models/MainInterfaces";
import { UserState } from "../models/Redux";
import { getBaseDataUserService } from "../services/requests/authService";
import makeRequest from "./globalFunctions";
import {
  fieldNameSearchRequestSubUser,
  numGoodsColumnKey,
  numOffersGoodsColumnKey,
  numOffersSalesColumnKey,
  numOffersServicesColumnKey,
  numPurchaseOrdersClientColumnKey,
  numPurchaseOrdersProviderColumnKey,
  numSalesColumnKey,
  numSellingOrdersClientColumnKey,
  numSellingOrdersProviderColumnKey,
  numServicesColumnKey,
} from "./globals";
import {
  EntityType,
  OrderConfirmation,
  OrderTableType,
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
  req.warrantyTime = data.durationID;
  req.used = data.used ? Usage.USED : Usage.NEW;
  req.expirationDate = data.completion_date;
  req.paymentMethod = data.payment_methodID;
  req.allowedBidder = data.allowed_bidersID;
  req.image = data.images;
  req.document = data.files;
  req.used = data.state_article;
  req.valid = data.valid;
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

export function transformDataToBasicRequirement(
  data: any,
  type: RequirementType
) {
  const req: BasicRequirement = {
    subUserName: data.subUserName,
    userName: data.userName,
    publishDate: data.publishDate,
    category: data.category,
    location: data.location,
    coin: data.coin,
    price: data.price,
    numberOffers: data.numberOffers,
    state: data.state,
    title: data.title,
    key: data.key,
    type,
    expirationDate: data.completion_date,
    valid: data.valid,
  };
  if (data.winOffer) {
    req.offerId = data.winOffer.uid;
    req.offerUserId = data.winOffer.entityID;
    if (data.winOffer.entityID != data.winOffer.userID)
      req.offerSubUserId = data.winOffer.userID;
  }
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
  user.tenure = response.age;
  user.numGoods = response.numProducts;
  user.numSales = response.numLiquidations;
  user.image = response.avatar;
  return { ...user, ...transformToUserCounters(response) };
}

export function transformToBaseUser(response: any, fromLogin: boolean = false) {
  const user: BaseUser = response;
  user.isPremium = response.premium ? false : true;
  let subUser: BaseUser = response.auth_users;
  if (subUser) {
    // usuario es subusuario
    subUser.uid = response.auth_users.Uid;
    subUser.planID = user.planID;
    subUser.isPremium = user.isPremium;
  }
  if (!subUser && fromLogin) subUser = user; // para usuario logueado: usuario es principal, subuser y user son iguales
  return { user, subUser };
}

export async function transformFromGetRequirementByIdToRequirement(
  data: any,
  type: RequirementType
) {
  try {
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
        warrantyTime: data.durationID,
        allowedBidder: data.allowed_bidersID,
        publishDate: data.publish_date,
        state: data.stateID,
        image: data.images,
        document: data.files,
        user,
        subUser,
        numberOffers: data.number_offers,
        type,
        userName: data.userName,
        subUserName: data.subUserName,
        used: data.state_article,
        valid: data.valid,
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
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function transformToOffer(
  data: any,
  type: RequirementType,
  user: UserState | BaseUser,
  mainUser?: UserState | BaseUser
) {
  const offer: Offer = data;
  offer.subUser = undefined;
  offer.type = type;
  if (mainUser) {
    offer.user = mainUser;
    offer.subUser = user;
  } else offer.user = user;

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
    clientConfirmation: data.scoreState?.scoreClient
      ? data.scoreState?.deliveredClient
        ? OrderConfirmation.YES
        : OrderConfirmation.NO
      : OrderConfirmation.NONE,
    providerConfirmation: data.scoreState?.scoreProvider
      ? data.scoreState?.deliveredProvider
        ? OrderConfirmation.YES
        : OrderConfirmation.NO
      : OrderConfirmation.NONE,
  };
  return purcOrder;
}

export function transformToPurchaseOrderItemSubUser(
  data: any,
  subType: OrderTableType
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

export function transformToUserCounters(data: any) {
  const counters: UserCounters = {
    numGoods: data[fieldNameSearchRequestSubUser[numGoodsColumnKey]],
    numServices: data[fieldNameSearchRequestSubUser[numServicesColumnKey]],
    numSales: data[fieldNameSearchRequestSubUser[numSalesColumnKey]],
    numOffersGoods:
      data[fieldNameSearchRequestSubUser[numOffersGoodsColumnKey]],
    numOffersServices:
      data[fieldNameSearchRequestSubUser[numOffersServicesColumnKey]],
    numOffersSales:
      data[fieldNameSearchRequestSubUser[numOffersSalesColumnKey]],
    numPurchaseOrdersProvider:
      data[fieldNameSearchRequestSubUser[numPurchaseOrdersProviderColumnKey]],
    numPurchaseOrdersClient:
      data[fieldNameSearchRequestSubUser[numPurchaseOrdersClientColumnKey]],
    numSellingOrdersProvider:
      data[fieldNameSearchRequestSubUser[numSellingOrdersProviderColumnKey]],
    numSellingOrdersClient:
      data[fieldNameSearchRequestSubUser[numSellingOrdersClientColumnKey]],
  };
  return counters;
}

export function transformToSubUserBase(data: any) {
  const subUser: SubUserBase = {
    typeID: data.typeID,
    createdAt: data.createdAt,
    uid: data.uid,
    name: data.name,
    document: data.document,
    email: data.email,
    typeEntity: EntityType.SUBUSER,
    state: data.active_account,
    ...transformToUserCounters(data),
  };
  return subUser;
}

export function transformToSubUserProfile(data: any) {
  const subUser: SubUserProfile = {
    ...transformToSubUserBase(data),
    address: data.address,
    cityID: data.cityID,
    companyID: data.companyID,
    phone: data.phone,
  };
  return subUser;
}

export function transformToCertificateFile(data: any) {
  const doc: CertificateFile = {
    key: data.uid,
    name: data.name,
    documentName: data.documentName,
    url: data.url,
    creationDate: data.creationDate,
  };
  return doc;
}

export function transformToCertificationItem(data: any) {
  const cert: CertificationItem = {
    key: data.uid,
    companyId: data.companyId,
    companyName: data.companyName,
    companyDocument: data.companyDocument,
    creationDate: data.creationDate,
    state: data.state,
    certificates: [],
    note: data.note,
  };
  if (data.certificates)
    cert.certificates = data.certificates.map((it: any) =>
      transformToCertificateFile(it)
    );
  return cert;
}

export function transformToRequiredDocsCert(data: any) {
  const obj: RequiredDocsForCert = data;
  return obj;
}

export function transformToDisplayUser(data: any) {
  const obj: DisplayUser = data;
  return obj;
}

export function transformToStatistics(data: any) {
  const obj: StatisticsData = data;
  return obj;
}

export function transformToChatListData(data: any, uid: string) {
  const obj: ChatListData = data;
  obj.requirementId = data.requerimentId;
  // obj.userId es el usuario receptor, no el usuario actual
  if (uid == data.userId) {
    obj.userId = data.chatPartnerId;
    obj.numUnreadMessages = data.unReadUser;
  } else {
    obj.userId = data.userId;
    obj.numUnreadMessages = data.unReadPartner;
  }
  return obj;
}

export function transformToChatMessage(data: any) {
  const obj: ChatMessage = data;
  return obj;
}

export function transformToNotificationDataFromServer(data: any) {
  const obj: NotificationDataFromServer = data;
  return obj;
}

export function transformToPlanData(data: any) {
  const obj: PlanData = data;
  return obj;
}
