export const ApiMainRoutes = {
  auth: "auth/",
  util: "util/",
};

export const ApiRoutes = {
  auth: {
    login: "login/",
    profileCompany: "profileCompany/",
    profileUser: "profileUser/",
    register: "register/",
    sendCode: "sendCode/",
    validateCode: "validate-code/",
  },
  util: {
    countries: "countries/",
    categories: "categories/",
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
};

export const pageRoutes = {
  home: "",
  search: "busqueda",
  myRequirements: "mis-requerimientos",
  myOffers: "mis-ofertas",
};
