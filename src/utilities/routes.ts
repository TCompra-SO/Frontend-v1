export const ApiMainRoutes = {
  auth: "auth/",
  util: "util/",
  subUser: "subUser/",
  requirements: "requeriments/",
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
    getRequeriments: "getRequeriments/",
    create: "create/",
  },
};

export const pageRoutes = {
  home: "/",
  search: "/busqueda",
  profile: "/perfil",
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
