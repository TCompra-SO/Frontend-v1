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
  saleOrder: "saleOrder/",
  certificate: "certificate/",
  reports: "reports/",
  notification: "notification/",
  chat: "chat/",
  plan: "plan/",
  admin: "admin/",
};

export const ApiRoutes = {
  root: {
    getName: "getName/",
  },
  auth: {
    login: "login/",
    logout: "logout",
    profileCompany: "profileCompany/",
    profileUser: "profileUser/",
    updateCompany: "updateCompany/",
    updateUser: "updateUser/",
    register: "register/",
    sendCode: "sendCode/",
    validateCode: "validate-code/",
    sendCodeRecovery: "sendCodeRecovery/",
    recoverPassword: "recoveryPassword/",
    newPassword: "NewPassword/",
    getBaseDataUser: "getBaseDataUser/",
    getUser: "getUser/",
    searchCompanyByName: "searchCompany/",
    refreshAccessToken: "refreshAccessToken",
    refreshRefreshToken: "refreshToken",
    getCsrfToken: "getCsrfToken/",
  },
  util: {
    chatBot: "chatBot/",
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
    searchSubUser: "searchSubUser",
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
    culminate: "culminate/",
    cancel: "canceled/",
    searchMainFilters: "searchMainFilters",
    searchMainFiltersAdmin: "searchMainFiltersAdmin",
    searchRequirements: "searchProductsByUser",
    validate: "validate/",
  },
  requirement: {
    create: "create/",
  },
  image: {
    uploadAvatar: "upload-avatar",
  },
  images: {
    uploadImagesReq: "uploadImagesRequeriment",
    uploadImagesOffer: "uploadImagesOffer",
  },
  documents: {
    uploadDocumentsReq: "uploadDocumentsRequeriment",
    uploadDocumentsOffer: "uploadDocumentsOffer",
  },
  offers: {
    create: "create/",
    getOffers: "getOffers/",
    getDetailOffer: "getDetailOffer/",
    getOffersByRequirement: "getOffersByRequeriment/",
    getBasicRateData: "getBasicRateData/",
    getOffersByEntity: "getOffersByEntity/",
    getOffersBySubUser: "getOffersBySubUser/",
    delete: "delete/",
    culminate: "culminate/",
    getValidation: "getValidation/",
    cancel: "canceled/",
    searchOffers: "searchOffersByUser",
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
    searchPurchaseOrdersByProvider: "searchPurchaseOrdersByProvider",
    searchPurchaseOrdersByClient: "searchPurchaseOrdersByClient",
  },
  saleOrder: {
    getSaleOrders: "getSaleOrders",
    getSaleOrderByUser: "getSaleOrderByUser/",
    getSaleOrderById: "getSaleOrderID/",
    getSaleOrderPDF: "getsaleOrderPDF/",
    getSaleOrdersByProvider: "getSaleOrdersByProvider/",
    getSaleOrdersByClient: "getSaleOrdersByClient/",
    searchSaleOrdersByProvider: "searchSaleOrdersByProvider",
    searchSaleOrdersByClient: "searchSaleOrdersByClient",
  },
  certificate: {
    uploadCertificate: "uploadCertificate",
    getCertificates: "getCertificates/",
    searchCertificates: "searchCertificates",
    updateCertificationState: "updateCertifyState",
    sendCertificationRequest: "sendCertification",
    getReceivedRequestsByEntity: "getReceivedRequestsByEntity/",
    searchReceivedRequestByEntity: "searchReceivedRequestByEntity",
    getSentRequestsByEntity: "getSentRequestsByEntity/",
    searchSentRequestByEntity: "searchSentRequestByEntity",
    deleteCertificate: "deleteCertificate/",
    resendCertificates: "resendCertify",
    verifyCertification: "verifyCertification/",
    updateRequiredDocuments: "updateRequiredDocuments",
    getRequiredDocuments: "getRequiredDocuments/",
    getCertificateRequest: "getCertificateRequest/",
  },
  reports: {
    statistics: "getCountsByEntity/",
  },
  notification: {
    getNotifications: "getNotifications/",
    readNotification: "readNotification/",
    getUnreadNotificationsCounter: "getUnreadNotificationsCounter/",
  },
  chat: {
    createChat: "createChat/",
    getChat: "getChat/",
    createMessage: "createMessage/",
    readMessages: "readMessages/",
    getMessages: "getMessages/",
    getMessage: "getMessage/",
    getChatUsersData: "getChatUsersData/",
    changeStateConnection: "changeStateConnection/",
    searchChat: "searchChat/",
    getArchivedChats: "getArchivedChatsBefore/",
    archiveChat: "archiveChat/",
    getCountMessageUnRead: "getCountMessageUnRead/",
    getChatState: "getChatState/",
  },
  plan: {
    getAllPlans: "getAllPlans/",
  },
};

export const pageRoutes = {
  home: "/",
  companyProfile: "/p",
  profile: "/perfil",
  productDetail: "/detalle",
  myRequirements: "/mis-requerimientos",
  myOffers: "/mis-ofertas",
  myPurchaseOrders: "/mis-ordenes-de-compra",
  mySalesOrders: "/mis-ordenes-de-venta",
  chat: "/chat",
  users: "/usuarios",
  allRequirements: "/all-requerimientos",
  allOffers: "/all-ofertas",
  certificates: "/certificados",
  allPurchaseOrders: "/all-ordenes-de-compra",
  allSalesOrders: "/all-ordenes-de-venta",
  statistics: "/statistics",
  admin: "admin/",
};

export const pageSubRoutes = {
  goods: "bienes",
  services: "servicios",
  sales: "liquidaciones",

  documents: "documentos",
  sent: "enviados",
  issued: "emitidos",
  received: "recibidos",
};
