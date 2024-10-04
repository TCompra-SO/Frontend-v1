export const ApiMainRoutes = {
  auth: "auth/",
  util: "util/",
  subUser: "subUser/",
  requirements: "requeriments/",
};

export const ApiRoutes = {
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
  root: {
    getName: "getName/",
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
  },
};

export const pageRoutes = {
  home: "/",
  search: "/busqueda",
  myRequirements: "/mis-requerimientos",
  myOffers: "/mis-ofertas",
  users: "/usuarios",
};
