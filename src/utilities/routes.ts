export const ApiMainRoutes = {
  auth: "auth/",
  util: "util/",
  subUser: "subUser/",
  requirements: "requeriments/",
  requirement: "requeriment/",
  image: "image/",
  images: "images/",
  documents: "documents/",
  offers: "offers/",
  score: "score/",
  purchaseOrder: "purchaseOrder/",
};

export const ApiRoutes = {
  root: {
    getName: "getName/",
  },
  auth: {
    login: "login/",
    profileCompany: "profileCompany/",
    profileUser: "profileUser/",
    register: "register/",
    sendCode: "sendCode/",
    validateCode: "validate-code/",
    sendCodeRecovery: "sendCodeRecovery/",
    recoverPassword: "recoveryPassword/",
    newPassword: "NewPassword/",
    getBaseDataUser: "getBaseDataUser/",
    getUser: "getUser/",
  },
  util: {
    countries: "countries/",
    categories: "categories/",
    userRoles: "userRoles/",
    utilData: {
      name: "utilData/",
      items: {
        tenure: "tenure/",
        currency: "currency/",
        methodPayment: "method_payment/",
        deliveryTime: "delivery_time/",
        typeBidders: "type_bidders/",
        typesPlans: "types_plans/",
      },
    },
  },

  subUser: {
    root: "",
    register: "register/",
    update: "update/",
    changeRole: "changeRole/",
    changeStatus: "changeStatus/",
    getUser: "getUser/",
  },
  requirements: {
    getRequirement: "getRequeriment/",
    getRequirements: "getRequeriments/",
    create: "create/",
    selectOffer: "selectOffer/",
    getBasicRateData: "getBasicRateData/",
    delete: "delete/",
    republish: "republish/",
    getRequirementsBySubUser: "getRequerimentsBySubUser/",
    getRequirementsByEntity: "getRequerimentsByEntity/",
  },
  requirement: {
    create: "create/",
  },
  image: {
    uploadAvatar: "upload-avatar",
  },
  images: {
    uploadImages: "upload-images",
  },
  documents: {
    uploadDocuments: "upload-documents",
  },
  offers: {
    create: "create/",
    getOffers: "getOffers/",
    getDetailOffer: "getDetailOffer/",
    getOffersByRequirement: "getOffersByRequeriment/",
    getBasicRateData: "getBasicRateData/",
  },
  score: {
    registerScore: "registerScore/",
  },
  purchaseOrder: {
    getPurchaseOrders: "getPurchaseOrders",
    getPurchaseOrderByUser: "getPurchaseOrderByUser/",
    getPurchaseOrderById: "getPurchaseOrderID/",
    getPurchaseOrderPDF: "getpurchaseOrderPDF/",
    getPurchaseOrdersByProvider: "getPurchaseOrdersByProvider/",
    getPurchaseOrdersByClient: "getPurchaseOrdersByClient/",
  },
};

export const pageRoutes = {
  home: "/",
  profile: "/perfil",
  productDetail: "/detalle",
  myRequirements: "/mis-requerimientos",
  myOffers: "/mis-ofertas",
  myPurchaseOrders: "/mis-ordenes-de-compra",
  chat: "/chat",
  users: "/usuarios",
  allRequirements: "/all-requerimientos",
  allOffers: "/all-ofertas",
  certificates: "/certificados",
  allPurchaseOrders: "/all-ordenes-de-compra",
  statistics: "/statistics",
};

export const pageSubRoutes: Record<string, string> = {
  goods: "bienes",
  services: "servicios",
  sales: "liquidaciones",

  documents: "documentos",
  sent: "enviados",
  issued: "emitidos",
  issuedSales: "enviados-liquidaciones",
  received: "recibidos",
  receivedSales: "recibidos-liquidaciones",
};
