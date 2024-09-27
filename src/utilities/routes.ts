export const ApiMainRoutes = {
  auth: "auth/",
  util: "util/",
  subUser: "subUser/",
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
    register: "register/",
  },
};

export const pageRoutes = {
  home: "",
  search: "busqueda",
  myRequirements: "mis-requerimientos",
  myOffers: "mis-ofertas",
  users: "usuarios",
};
